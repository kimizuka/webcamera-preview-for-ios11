const medias = {
  audio: false,
  video: {
    facingMode: {
      exact: "environment"
    }
  }
};
const video  = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const promise = navigator.mediaDevices.getUserMedia(medias);

let imgData;
let data
let ave;

promise.then(successCallback)
       .catch(errorCallback);

function successCallback(stream) {
  video.srcObject = stream;
  requestAnimationFrame(draw);
};

function errorCallback(err) {
  alert(err);
};

function draw() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.drawImage(video, 0, 0);

  imgData = ctx.getImageData(0, 0, canvas.width,  canvas.height);
    data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      ave = (data[i + 0] + data[i + 1] + data[i + 2]) / 3;

      data[i + 0] = 
      data[i + 1] = 
      data[i + 2] = (ave > 255 / 2) ? 255 : (ave > 255 / 4) ? 127 : 0;
      data[i + 3] = 255;
    }

  ctx.putImageData(imgData, 0, 0);
  requestAnimationFrame(draw);
}