Notiflix.Loading.hourglass({
    backgroundColor: 'rgb(255, 255, 255)',
});

const urlApi = "https://api.superfoodproteins.com";
const numTest = window.personaId;
delete window.personaId;

function pad(val) { return val > 9 ? val : '0' + val; }

function render(obj) {
    const content = document.querySelector("tbody");
    content.innerHTML = ''; // Clear table

    if (!obj.length) {
        content.innerHTML = `
        <tr style="--bs-table-striped-bg: rgba(var(--bs-primary-rgb), .25);">
            <td colspan="99">
                <h6 class="text-warning text-center">
                    No se encontraron registros
                </h6>
            </td>
        </tr>
        `;
        return;
    }

    let timerInit;

    obj.forEach((x, index) => {
        const deserialize = JSON.parse(x.resultado.replaceAll('\'', '"'));

        if (index === 0) {
            timerInit = x.tiempo;
        }

        [...deserialize].forEach(y => {
            const [name, value] = y;
            let differTime = Math.abs(new Date(timerInit).getTime() - new Date(x.tiempo).getTime());
            differTime = Math.floor(differTime / 1000);

            const seconds = pad(differTime % 60);
            const minutes = pad(parseInt(differTime / 60, 10));

            content.innerHTML += `
          <tr style="--bs-table-striped-bg: rgba(var(--bs-primary-rgb), .25);">
              <td>${x.testId}</td>
              <td>${x.idImg}</td>
              <td>${name}: ${parseInt(value)}%</td>
              <td>${minutes}:${seconds}</td>
              <td>Pregunta ${index + 1}</td>
          </tr>
        `;
        });

    });
}

function getData() {
    Notiflix.Loading.hourglass({
        backgroundColor: 'rgb(255, 255, 255)',
    });

    fetch(urlApi + "/resultadosID/" + numTest.toString(), {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    }).then((response) => response.json())
        .then((datos) => {
            render(datos);
        })
        .finally(() => Notiflix.Loading.remove());
}

function downloadDocument(ev, type) {
    if (type === 'excel') {
        return ExcellentExport.excel(ev.target, 'tblData');
    }

    if (type === 'xls') {
        return ExcellentExport.convert({
            anchor: ev.target,
            filename: '{{ persona.nombre }}',
            format: 'xlsx'
        }, [{
            name: '{{ persona.nombre }}',
            from: { table: 'tblData' }
        }
        ]);
    }

    if (type === 'csv') {
        ExcellentExport.csv(ev.target, 'tblData');
    }
}

window.onload = () => setTimeout(() => Notiflix.Loading.remove(), 800);