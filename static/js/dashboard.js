
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
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            // return context.raw + '%';
                            const label = context.label;
                            let value = context.raw;

                            if (percent) {
                                value += '%';
                            }

                            return `${label}: ${value}`;
                        }
                    }
                }
            }
        }
    };

    const container = document.getElementById(name + 'Container');
    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.id = name;
    container.appendChild(canvas);

    return new Chart(document.getElementById(name), config);
}


function render(data) {
    const emotions = {};
    const califications = {};

    data.forEach(x => {
        const emotionKey = x.resultado.split(' ')[0];
        const emotionValue = x.resultado.split(' ')[2].substring(0, 2);

        if (!emotions[emotionKey]) {
            emotions[emotionKey] = parseInt(emotionValue, 10);
        }

        if (!califications[x.calificacion]) {
            califications[x.calificacion] = 1;
            return;
        }

        califications[x.calificacion]++;
    });

    const calificationsLabel = Object.entries(califications).map(x => x[0]);
    const calificationsData = Object.entries(califications).map(x => x[1]);

    setupChart('calificationChart', 'doughnut', calificationsLabel, calificationsData);

    const emotionsLabel = Object.entries(emotions).map(x => x[0]);
    emotionsLabel.push('Otros');

    const emotionsData = Object.entries(emotions).map(x => parseInt(x[1], 10));
    emotionsData.push(100 - emotionsData[0]);

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

window.onload = () => {
    onSelect();
}
