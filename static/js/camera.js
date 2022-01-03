// Initial loader
Notiflix.Loading.hourglass({
  backgroundColor: 'rgb(255, 255, 255)',
});

//
// Timer
//
const progressBar = document.querySelector('#timer > circle');
const progressValue = document.querySelector('#timer > text');
const area = progressBar.r.baseVal.value * 2 * Math.PI;

progressBar.style.strokeDasharray = `${area} ${area}`;
progressBar.style.strokeDashoffset = area;

function pad(val) { return val > 9 ? val : '0' + val; }

function setTimer(count, progress) {
  const seconds = pad(count % 60);
  const minutes = pad(parseInt(count / 60, 10));

  progressValue.innerHTML = minutes + ':' + seconds;

  const offset = area - ((area / 60) * progress);
  progressBar.style.strokeDashoffset = offset;
}
//

//
// Camera logic
//
const numTest = window.valor;
delete window.valor;

const urlApi = "https://api.superfoodproteins.com";
const questions = [
  "Califique el color del producto",
  "Califique el olor del producto",
  "Califique el sabor del producto",
  "Califique la textura del producto",
  "Califique el aspecto del producto"
];
const questionsOpts = [
  "Muy malo",
  "Malo",
  "Regular",
  "Bueno",
  "Excelente"
];

const startBtn = document.querySelector('#startBtn');

function startCam() {
  const cameraContainer = document.querySelector('#camera-container');
  const cameraStream = document.querySelector('#camera-video');

  navigator.mediaDevices?.getUserMedia({
    video: {
      facingMode: "user",
      width: { min: 1280 },
      height: { min: 720 }
    },
    audio: false
  })
    .then(stream => {
      cameraStream.srcObject = stream;
      // Remove active camera button
      cameraContainer.firstElementChild.remove();
      //
      // Show 'Empezar'
      startBtn.style.display = 'block';
      //
    })
    .catch(() => Notiflix.Notify.failure('No es posible activa la cámara'))
}

// Return an image from an video tag
function getImage() {
  const canvas = document.createElement('canvas');
  const video = document.querySelector('video');

  canvas.width = 1280;
  canvas.height = 720;

  canvas.getContext("2d")
    .drawImage(video, 0, 0, 1280, 720);

  const img = canvas.toDataURL("image/jpeg");
  return img;
}

async function sendData(img, tiempo, pregunta, calificacion) {
  const response = await fetch(urlApi + "/emotionsaws", {
    method: "POST",
    // mode: 'no-cors',
    body: JSON.stringify({
      base64: img,
      testId: numTest.toString(),
      tiempo,
      pregunta: 'Pregunta ' + pregunta,
      calificacion
    }),
    headers: {
      "Content-type": "application/json",
    }
  });

  return await response.json();
}

function pad(val) { return val > 9 ? val : '0' + val; }

function getTime(timerInit, currentTime) {
  let differTime = Math.abs(new Date(timerInit).getTime() - new Date(currentTime).getTime());
  differTime = Math.floor(differTime / 1000);

  const seconds = pad(differTime % 60);
  const minutes = pad(parseInt(differTime / 60, 10));

  return `${minutes}:${seconds}`;
}

function onStart() {
  let counter = 0;
  const timerInit = new Date();
  let activeQuestion = 0;
  startBtn.remove();
  const questionNumber = document.querySelector('#questionNumber');

  const clock = setInterval(() => {
    if (activeQuestion < 5) {
      if (counter % 12 === 0) {
        // Select question based on time
        activeQuestion = (counter / 12) + activeQuestion;
        renderQuestion(activeQuestion);
        counter = 0;
      }

      // Update timer
      setTimer(counter, (counter / 12) * 60);

      if (activeQuestion === 5) {
        return;
      }

      questionNumber.parentElement.style.display = 'block';
      questionNumber.innerHTML = activeQuestion + 1;

      //
      counter++;

      // Send request
      const img = getImage();
      const tiempo = getTime(timerInit, Date.now());
      const check = [...document.querySelectorAll('input')]
       .find(x => x.checked)?.value || 'NO SELECCIONADO';
      sendData(img, tiempo, activeQuestion + 1, check);
      //
      return;
    }

    counter = 0;
    new bootstrap.Modal(document.getElementById('processModal'), {
      keyboard: false,
      backdrop: 'static'
    }).show();
    clearInterval(clock);
  }, 1000);
}

function renderQuestion(index) {
  const questionsContainer = document.querySelector('#questions-container');
  const currentQuestion = questions[index];

  if (!currentQuestion) {
    return questionsContainer.innerHTML = 'Sin preguntas';
  }

  questionsContainer.innerHTML = `<strong>${index + 1}. ${currentQuestion}</strong>`;
  questionsContainer.innerHTML += questionsOpts.map((question, index) => (`
    <div class="form-check mb-2">
      <input class="form-check-input" type="radio" name="questions" id="rd${index}" value="${question}">
      <label class="form-check-label" for="rd${index}">
        ${question}
      </label>
    </div>
  `)).join(' ');
}

window.onload = () => setTimeout(() => Notiflix.Loading.remove(), 800);
