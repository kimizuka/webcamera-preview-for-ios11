const medias = {audio : false, video : {
        facingMode: "user"
      }},
      video  = document.getElementById("video");

navigator.getUserMedia(medias, successCallback, errorCallback);

function successCallback(stream) {
  video.srcObject = stream;
};

function errorCallback(err) {
  alert(err);
};