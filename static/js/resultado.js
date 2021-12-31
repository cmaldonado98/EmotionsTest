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
                    <td>
                        <select class="bg-transparent w-100 border-primary">
                            <option value="Si" selected>Si</option>
                            <option value="No">No</option>
                        </select>
                    </td>
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

function prepareTableToExport(revert = false) {
    const comboboxSection = document.querySelectorAll('#tblData td:last-child');

    if (!revert) {
        comboboxSection.forEach(tr => {
            const combobox = tr.querySelector('select');
            tr.innerHTML = combobox.value;
        });
        return;
    }

    comboboxSection.forEach(tr => {
        const value = tr.innerText;
        tr.innerHTML = `
            <select class="bg-transparent w-100 border-primary">
                <option value="Si" ${value === 'Si' ? 'selected' : ''}>
                    Si
                </option>
                <option value="No" ${value === 'No' ? 'selected' : ''}>
                    No
                </option>
            </select>
        `;
    });
}

function downloadDocument(ev, type) {
    let doc;
    prepareTableToExport();

    if (type === 'excel') {
        doc = ExcellentExport.excel(ev.target, 'tblData');
    } else if (type === 'xls') {
        doc = ExcellentExport.convert({
            anchor: ev.target,
            filename: 'data',
            format: 'xlsx'
        }, [{
            name: 'data',
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