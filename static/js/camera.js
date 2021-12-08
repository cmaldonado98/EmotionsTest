//VARIABLES
let camera_button = document.querySelector("#start-camera");
let send_button = document.querySelector("#click-send");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");
let dataurl = document.querySelector("#dataurl");
let dataurl_container = document.querySelector("#dataurl-container  ");
let urlapi = "https://api.superfoodproteins.com";
var numTest = "{{valor}}";
// CAMARA
camera_button.addEventListener("click", async function () {
  let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
  } catch (error) {
    alert(error.message);
    return;
  }

  video.srcObject = stream;

  video.style.display = "block";
  camera_button.style.display = "none";
  click_button.style.display = "block";
  send_button.style.display = "block";
});
//BOTON TOMAR FOTO
click_button.addEventListener("click", function () {
  canvas
    .getContext("2d")
    .drawImage(video, 0, 0, canvas.width, canvas.height);
  let image_data_url = canvas.toDataURL("image/jpeg");
  canvas.drawImage;

  dataurl.value = image_data_url;
  dataurl_container.style.display = "block";

  //CONSUMO API
  fetch(urlapi + "/imagenes", {
    method: "POST",
    // mode: 'no-cors',
    body: JSON.stringify({
      base64: image_data_url,
      testId: "testIdXDjaja",
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
});

//BOTON ANALIZAR ENVIO AWS
send_button.addEventListener("click", function () {
  canvas
    .getContext("2d")
    .drawImage(video, 0, 0, canvas.width, canvas.height);
  let image_data_url = canvas.toDataURL("image/jpeg");
  canvas.drawImage;

  //CONSUMO API ANALIZAR IMG
  fetch(urlapi + "/emotionsaws", {
    method: "POST",
    //mode: 'no-cors',
    body: JSON.stringify({
      base64: image_data_url,
      testId: numTest.toString(),
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => (dataurl.value = json))
    .then((json) => (dataurl_container.style.display = "block"));

  // dataurl.value = json;
  // dataurl_container.style.display = "block";
});

//TEMPLATE

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});