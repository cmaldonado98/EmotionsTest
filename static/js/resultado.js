Notiflix.Loading.hourglass({
    backgroundColor: 'rgb(255, 255, 255)',
});

const states = {
    'CALMADO': {
        'Muy malo': '#dc3545',
        'Malo': '#dc3545',
        'Regular': '#4ade80',
        'Bueno': '#fbbd58',
        'Excelente': '#fbbd58',
        'NO SELECCIONADO': '#fbbd58'
    },
    'SORPRENDIDO': {
        'Muy malo': '#4ade80',
        'Malo': '#4ade80',
        'Regular': '#fbbd58',
        'Bueno': '#4ade80',
        'Excelente': '#4ade80',
        'NO SELECCIONADO': '#fbbd58'
    },
    'MIEDO': {
        'Muy malo': '#4ade80',
        'Malo': '#4ade80',
        'Regular': '#4ade80',
        'Bueno': '#dc3545',
        'Excelente': '#dc3545',
        'NO SELECCIONADO': '#fbbd58'
    },
    'ENOJADO': {
        'Muy malo': '#4ade80',
        'Malo': '#4ade80',
        'Regular': '#4ade80',
        'Bueno': '#dc3545',
        'Excelente': '#dc3545',
        'NO SELECCIONADO': '#fbbd58'
    },
    'CONFUNDIDO': {
        'Muy malo': '#fbbd58',
        'Malo': '#dc3545',
        'Regular': '#4ade80',
        'Bueno': '#fbbd58',
        'Excelente': '#fbbd58',
        'NO SELECCIONADO': '#fbbd58'
    },
    'TRISTE': {
        'Muy malo': '#4ade80',
        'Malo': '#4ade80',
        'Regular': '#4ade80',
        'Bueno': '#dc3545',
        'Excelente': '#dc3545',
        'NO SELECCIONADO': '#fbbd58'
    },
    'FELIZ': {
        'Muy malo': '#dc3545',
        'Malo': '#dc3545',
        'Regular': '#dc3545',
        'Bueno': '#4ade80',
        'Excelente': '#4ade80',
        'NO SELECCIONADO': '#fbbd58'
    },
    'DISGUSTADO': {
        'Muy malo': '#4ade80',
        'Malo': '#4ade80',
        'Regular': '#4ade80',
        'Bueno': '#dc3545',
        'Excelente': '#dc3545',
        'NO SELECCIONADO': '#fbbd58'
    }
};

const urlApi = "https://api.superfoodproteins.com";
const numTest = window.personaId;
let data = [];
delete window.personaId;

function render(obj) {
    data = obj;
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

    obj.forEach((x) => {
        const emotion = x.resultado.split(' ')[0].trim();
        const color = states[emotion][x.calificacion];

        content.innerHTML += `
            <tr style="--bs-table-striped-bg: rgba(var(--bs-primary-rgb), .25);">
                <td>${x.testId}</td>
                <td>${x.idImg}</td>
                <td>${x.producto}</td>
                <td>${x.resultado}</td>
                <td>${x.tiempo}</td>
                <td>${x.calificacion}</td>
                <td>${x.pregunta}</td>
                <td><div class="p-3" style="background: ${color};"></div></td>
            </tr>
        `;
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

function prepareTableToExport(revert = false) {
    const colorHeader = document.querySelector('#tblData th:last-child');
    const colorRow = document.querySelectorAll('#tblData td:last-child');

    if (!revert) {
        colorHeader.innerHTML = '';
        colorRow.forEach(td => {
            td.innerHTML = '';
        });
        return;
    }

    colorHeader.innerHTML = 'Validar';
    render(data);
}

function downloadDocument(ev, type) {
    let doc;
    prepareTableToExport();

    if (type === 'excel') {
        doc = ExcellentExport.excel(ev.target, 'tblData');
    } else if (type === 'xls') {
        doc = ExcellentExport.convert({
            anchor: ev.target,
            filename: 'datos',
            format: 'xlsx'
        }, [{
            name: 'datos',
            from: { table: 'tblData' }
        }
        ]);
    } else if (type === 'csv') {
        doc = ExcellentExport.csv(ev.target, 'tblData');
    }

    prepareTableToExport(true);
    return doc;
}

window.onload = () => setTimeout(() => Notiflix.Loading.remove(), 800);