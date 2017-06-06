const medias = {audio : false, video : true},
      video  = document.getElementById("video"),
      canvas = document.getElementById("canvas"),
      ctx    = canvas.getContext("2d");

let imgData, data, ave;

navigator.getUserMedia(medias, successCallback, errorCallback);

requestAnimationFrame(draw);

function successCallback(stream) {
  video.srcObject = stream;
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