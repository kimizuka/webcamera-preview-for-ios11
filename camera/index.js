const medias = {audio : false, video : {
        facingMode : {
          exact : "environment"
        }
      }},
      video   = document.getElementById("video"),
      canvas  = document.getElementById("canvas"),
      loading = document.getElementById("loading"),
      ctx     = canvas.getContext("2d");

let txt = "";

navigator.getUserMedia(medias, successCallback, errorCallback);

canvas.addEventListener("click", () => {
  // let blob = toBlob(canvas);
  let base64 = canvas.toDataURL("image/png").replace("data:image/png;base64,", "");

  if (!txt) {
    loading.classList.add("show");
    getTitle(base64).then((evt) => {
      let result = JSON.parse(evt.target.response);

      return getKnowledge(result.responses[0].labelAnnotations[0].description);
    }).then((evt) => {
      let result = JSON.parse(evt.target.response);

      txt = result.itemListElement[0].result.detailedDescription.articleBody;
      loading.classList.remove("show");
    });
  } else {
    let msg = new SpeechSynthesisUtterance(txt);

    txt = "";
    msg.lang = "en-US";
    speechSynthesis.speak(msg);
  }
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

function getTitle(base64) {
  return new Promise((resolve, reject) => {
    const URL = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCcdCQ-nMukTK6Kl2xPkrCK6akiG2_o0w4";

    let xhr  = new XMLHttpRequest(),
        json = {
          "requests" : [{
            "image" : {
              "content" : base64
            },
            "features" : [{
              "type" : "LABEL_DETECTION",
              "maxResults" : 1
            }]
          }]
        };

    xhr.open("POST", URL);
    xhr.addEventListener("load", (evt) => {
      resolve(evt);
    });
    xhr.addEventListener("error", () => {
      reject(evt);
    });
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(json));
  });
}

function getKnowledge(ttl) {
  return new Promise((resolve, reject) => {
    const URL = "https://kgsearch.googleapis.com/v1/entities:search?key=AIzaSyCcdCQ-nMukTK6Kl2xPkrCK6akiG2_o0w4";

    let xhr  = new XMLHttpRequest();

    xhr.open("GET", URL + "&query=" + ttl + "&limit=1&indent=true");
    xhr.addEventListener("load", (evt) => {
      resolve(evt);
    });
    xhr.addEventListener("error", () => {
      reject(evt);
    });
    xhr.send();
  });
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