const medias = {
  audio: false,
  video: {
    facingMode: "user"
  }
};
const video = document.getElementById("video");
const promise = navigator.mediaDevices.getUserMedia(medias);

promise.then(successCallback)
       .catch(errorCallback);


function successCallback(stream) {
  video.srcObject = stream;
};

function errorCallback(err) {
  alert(err);
};