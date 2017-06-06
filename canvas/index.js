const medias = {audio : false, video : {
        facingMode : {
          exact : "environment"
        }
      }},
      video  = document.getElementById("video"),
      canvas = document.getElementById("canvas"),
      ctx    = canvas.getContext("2d");

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

  requestAnimationFrame(draw);
}