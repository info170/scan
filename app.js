// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false }; // facingMode:"user" for selphie camera
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    var scan = cameraSensor.toDataURL("image/webp");
    console.log(scan);
    send(scan);
    cameraOutput.src = scan;
    cameraOutput.classList.add("taken");
};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

function send(url) {
    var http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!http_request) {
        alert('No XMLHTTP');
        return false;
    }
    http_request.onreadystatechange = function() { Contents(http_request); };
    http_request.open('POST', 'https://hit.rf.gd/whatis.php', true);
    http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    http_request.send(url);

    function Contents(http_request) {
        if (http_request.readyState == 1) {
          //
        } else if (http_request.readyState == 4) {
            if (http_request.status == 200) {
              alert(http_request.responseText);
            } else {
              alert(http_request.responseText);
              //alert('Cant send data');
            }
        }
    }
}