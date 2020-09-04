var distanceLabel = document.getElementById("distance-label");
var pivotButton = document.getElementById("pivot-button");
var reverse = document.getElementById("toggle-reverse");
var forward = document.getElementById("toggle-forward");

var ip = localStorage.getItem("ip-address");
document.getElementById("ip-address").value = ip;
checkIP(ip);

function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}

function checkIP(value) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)) {
    pivotButton.disabled = false;
    localStorage.setItem("ip-address", value);
  } else {
    pivotButton.disabled = true;
  }
}

function toggleReverse() {
  if (forward.classList.contains("selected")) {
    forward.classList.remove("selected");
    reverse.classList.add("selected");
  }
}

function toggleForward() {
  if (reverse.classList.contains("selected")) {
    reverse.classList.remove("selected");
    forward.classList.add("selected");
  }
}

function updateSliderLabel(value) {
  var time = (value-1)*15;
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;
  distanceLabel.innerHTML = "Distance: " + str_pad_left(minutes,'0',1) + ':' + str_pad_left(seconds,'0',2) + " (approximately)";
}

function play() {
  var audio = document.getElementById("audio");
  audio.play();
}

//https://www.npmjs.com/package/node-roku
function skipAhead(){
	var ip = document.getElementById('ip-address').value
	var xhr = new XMLHttpRequest();
	play()
	for(var i = 0; i < Number(document.getElementById('skip-distance').value); i++){
		try{
			url = "http://" + ip + ":8060/keypress/"
      direction = (forward.classList.contains("selected") ? "Right" : "Left");
			xhr.open("POST", url + direction, false);
			xhr.send("localhost");
		} catch {}
	}
	try{
		xhr.open("POST", url + "Enter", false);
		xhr.send("localhost");
	} catch {}
}
