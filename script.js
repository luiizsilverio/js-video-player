const player = document.querySelector('.player');
const videoJs = player.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTimeEl = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speedEl = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //

function showPlayIcon() {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Iniciar');
}

function togglePlay() {
  if (videoJs.paused) {
    videoJs.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pausar');
  } else {
    videoJs.pause();
    showPlayIcon();
  }
}

// On Video End, show play button icon

videoJs.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

// Update progress bar as video plays
function updateProgress() {
  progressBar.style.width = `${videoJs.currentTime / videoJs.duration * 100}%`;
  currentTimeEl.textContent = `${displayTime(videoJs.currentTime)} /`;
  duration.textContent = `${displayTime(videoJs.duration)}`;
}

// Click to seek within the video
function setProgress(e) {
  const newTime = (e.offsetX / progressRange.offsetWidth);
  progressBar.style.width = `${newTime * 100}%`;
  const curTime = newTime * videoJs.duration;
  videoJs.currentTime = curTime;
}

// Volume Controls --------------------------- //

let lastVolume = 1; // 100%

// Volume Bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }

  volumeBar.style.width = `${volume * 100}%`;
  videoJs.volume = volume;

  setVolumeIcon(volume);

  lastVolume = volume;
}

// Change icon depending on volume
function setVolumeIcon(volume) {
  volumeIcon.className = '';
  volumeIcon.setAttribute('title', 'Mudo');
    if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else 
  if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else
  if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Volume');
  }
}

// Mute/Unmute
function toggleMute() {
  if (videoJs.volume) {
    lastVolume = videoJs.volume;
    videoJs.volume = 0;
    volumeBar.style.width = 0;
    setVolumeIcon(0);
  } else {
    videoJs.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    setVolumeIcon(lastVolume);
  }
}

// Change Playback Speed -------------------- //

function changeSpeed() {
  videoJs.playbackRate = speedEl.value;
}

// Fullscreen ------------------------------- //

let fullscreen = false;

function toggleFullscreen() {
  fullscreen ? closeFullscreen() : openFullscreen(player);
  fullscreen = !fullscreen;
}

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  // videoJs.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  // videoJs.classList.remove('video-fullscreen');
}

// Event Listeners -------------------------- //

playBtn.addEventListener('click', togglePlay);
videoJs.addEventListener('click', togglePlay);
videoJs.addEventListener('timeupdate',updateProgress);
videoJs.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speedEl.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
