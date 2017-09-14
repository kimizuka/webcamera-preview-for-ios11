const medias = {audio : false, video : {
        facingMode : {
          exact : "environment"
        }
      }},
      video  = document.getElementById("video"),
      canvas = document.getElementById("canvas"),
      ctx    = canvas.getContext("2d");

navigator.getUserMedia(medias, successCallback, errorCallback);

canvas.addEventListener("click", () => {
  // let blob = toBlob(canvas);
  console.log(canvas.toDataURL("image/png"));
  window.open(canvas.toDataURL("image/png"));
}, false);

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

function toBlob(canvas) {
  let base64 = canvas.toDataURL("image/png"),
      bin    = atob(base64.replace(/^.*,/, "")),
      buffer = new Uint8Array(bin.length);

  for (let i = 0, length = bin.length; i < length; ++i) {
    buffer[i] = bin.charCodeAt(i);
  }

  return new Blob([buffer.buffer], {
    type: "image/png"
  });
}