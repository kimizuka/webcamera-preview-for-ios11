const medias = {audio : false, video : {
        facingMode : {
          exact : "environment"
        }
      }},
      video  = document.getElementById("video");

navigator.mediaDevices.enumerateDevices().then((devices) => {
  devices.forEach((device) => {
    alert(`[${device.kind}] [${device.label}] [${device.deviceId}]`);
  });
}).catch((err) => {
  alert(err);
});

navigator.getUserMedia(medias, successCallback, errorCallback);

function successCallback(stream) {
  video.srcObject = stream;
};

function errorCallback(err) {
  alert(err);
};