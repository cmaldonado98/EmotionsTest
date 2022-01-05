
// Initial loader
Notiflix.Loading.hourglass({
    backgroundColor: 'rgb(255, 255, 255)',
});

const urlApi = "https://api.superfoodproteins.com";

function setupChart(name, type, labels, data, percent = false) {
    const config = {
        type,
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: [
                    'rgb(251, 189, 88)',
                    'rgb(116, 128, 132)',
                    'rgb(13, 202, 240)',
                    'rgb(32, 201, 151)',
                    'rgb(253, 126, 20)',
                    'rgb(102, 16, 242)',
                    'rgb(214, 51, 132)',
                    'rgb(162, 163, 164)'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        filter: (legendItem, data) => {
                            const label = legendItem.text;
                            const labelIndex = data.labels.findIndex(labelName => labelName === label);
                            const qtd = data.datasets[0].data[labelIndex];
                            
                            legendItem.text = `${qtd} ${legendItem.text}`;
                            
                            return true;
                          }
                    }
                }
            }
        }
    };

    const container = document.getElementById(name + 'Container');
    container.innerHTML = name === 'emotionChart'
        ? '<h3 class="text-center my-4">Emociones</h3>'
        : '<h3 class="text-center my-4">Calificaciones</h3>';
    const canvas = document.createElement('canvas');
    canvas.id = name;
    container.appendChild(canvas);

    new Chart(document.getElementById(name), config);
}


function render(data) {
    const emotions = {};
    const califications = {};

    data.forEach(x => {
        const emotionKey = x.resultado.split(' ')[0];

        if (!emotions[emotionKey]) {
            emotions[emotionKey] = 1;
        } else {
            emotions[emotionKey]++;
        }

        if (!califications[x.calificacion]) {
            califications[x.calificacion] = 1;
        } else {
            califications[x.calificacion]++;
        }
    });

    const calificationsLabel = Object.entries(califications).map(x => x[0]);
    const calificationsData = Object.entries(califications).map(x => x[1]);

    setupChart('calificationChart', 'doughnut', calificationsLabel, calificationsData);

    const emotionsLabel = Object.entries(emotions).map(x => x[0]);
    const emotionsData = Object.entries(emotions).map(x => x[1]);

    setupChart('emotionChart', 'pie', emotionsLabel, emotionsData, true);
}

const productoSelect = document.querySelector('#producto');
const preguntaSelect = document.querySelector('#pregunta');

productoSelect.addEventListener('change', onSelect);
preguntaSelect.addEventListener('change', onSelect);

function onSelect() {
    const params = {
        product: productoSelect.value
    };

    if (preguntaSelect.value !== 'null') {
        params.question = preguntaSelect.value;
    }

    Notiflix.Loading.hourglass({
        backgroundColor: 'rgb(255, 255, 255)',
    });

    sendData(params)
        .then(data => {
            render(data);

            setTimeout(() => {
                Notiflix.Loading.remove();
            }, 1000);
        });
}

async function sendData(params) {
    let endpoint = urlApi + '/dashboardProducto/' + params.product;

    if (params.question) {
        endpoint = urlApi + '/dashboardProducto2/' + params.product + '/' + params.question;
    }

    const response = await fetch(endpoint);
    return await response.json();
}

function exportPdf() {
    Notiflix.Loading.hourglass({
        backgroundColor: 'rgb(255, 255, 255)',
    });

    setTimeout(() => {
        const pdf = new jsPDF('p', 'pt', 'a4');
        const chartContainer = document.querySelector('#exportChart');
        const charts = chartContainer.querySelectorAll('.col-lg-4');
        const title = document.createElement('h1');
        title.innerText = 'Dashboard';
        title.className = 'text-center my-5';
        chartContainer.insertBefore(title, charts.item(0));

        charts.forEach(x => {
            x.className = 'col-md-6 col-10 text-center d-flex flex-column align-items-center';
        });

        const offset = window.innerWidth > 575 ? 0 : 150;

        pdf.addHTML(chartContainer, offset, 0, function () {
            title.remove();
            charts.forEach(x => {
                x.className = 'col-lg-4 col-md-6 col-10';
            });
    
            setTimeout(() => Notiflix.Loading.remove(), 1000);
            pdf.save('Dashboard.pdf');
        });
    }, 1000);
}

window.onload = () => {
    onSelect();
}
