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

function setTimer(count) {
  const seconds = pad(++count % 60);
  const minutes = pad(parseInt(count / 60, 10));

  progressValue.innerHTML = minutes + ':' + seconds;

  const offset = area - ((area / 60) * seconds);
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

async function sendData(img) {
  const response = await fetch(urlApi + "/emotionsaws", {
    method: "POST",
    // mode: 'no-cors',
    body: JSON.stringify({
      base64: img,
      testId: numTest.toString()
    }),
    headers: {
      "Content-type": "application/json",
    }
  });

  return await response.json();
}

function onStart() {
  let counter = 0;
  startBtn.disabled = true;

  const clock = setInterval(() => {
    if (counter < 50) {

      if (counter % 10 === 0) {
        if (counter > 1) {
          // Send request
          const img = getImage();
          sendData(img);
          //
        }

        // Select question based on time
        this.renderQuestion(counter / 10);
        //
      }

      // Update timer
      setTimer(counter);
      //
      counter++;
      return;
    }

    counter = 0;
    document.querySelector('#processBtn').style.display = 'block';
    clearInterval(clock);
  }, 1000);
}

function renderQuestion(index) {
  const questionsContainer = document.querySelector('#questions-container');
  const currentQuestion = questions[index];

  questionsContainer.innerHTML = `<strong>${currentQuestion}</strong>`;
  questionsContainer.innerHTML += '<br />' + questionsOpts.join('<br />');
}

window.onload = () => setTimeout(() => Notiflix.Loading.remove(), 800);
