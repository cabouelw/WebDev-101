const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const prograss = document.getElementById('prograss');
const timestamp = document.getElementById('timestamp');

// play && pause Video
function toggleVideoStatus(){
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

// update Play/Pause icon
function updatePlayIcon(){
	if (video.paused) {
		play.innerHTML = '<i class="fa fa-play fa-2x" ></i>';
	} else {
		play.innerHTML = '<i class="fa fa-pause fa-2x" ></i>';
	}
}

// Set video time to progress
function setVideoProgress(){
	video.currentTime = (+prograss.value * video.duration) / 100;
}

// Set video time to prograss
function updatePrograss(){
	prograss.value = +((video.currentTime / video.duration) * 100);

	// Get minutes
	let mins = Math.floor(video.currentTime / 60);
	if (mins < 10)
		mins = '0' + String(mins);
	// Get seconds
	let secs =  Math.floor(video.currentTime % 60);
	if (secs < 10)
		secs = '0' + String(secs);
	timestamp.innerText = `${mins}:${secs}`;
}

// Set video time to prograss
function stopVideo(){
	video.currentTime = 0;
	video.pause();
}

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updatePrograss);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

prograss.addEventListener('click', setVideoProgress);





