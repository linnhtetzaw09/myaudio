const audioPlayer = document.getElementById("audioscreen");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const stopButton = document.getElementById("stop");
const progressBar = document.getElementById("progress-bar");
const volumeProgress = document.getElementById("volumeprogress");
const displayTime = document.getElementById("displaytime");

const audios = ["sample1", "sample2", "sample3"];
let currentIdx = 0;

function loadAudio(audio) {
    audioPlayer.src = `./source/${audio}.mp3`;
}

function playAudio() {
    playButton.querySelector("i.fas").classList.remove("fa-play");
    playButton.querySelector("i.fas").classList.add("fa-pause");
    audioPlayer.play();
}

function pauseAudio() {
    playButton.querySelector("i.fas").classList.add("fa-play");
    playButton.querySelector("i.fas").classList.remove("fa-pause");
    audioPlayer.pause();
}

function playAndPauseAudio() {
    if (audioPlayer.paused) {
        playAudio();
    } else {
        pauseAudio();
    }
}

function nextAudio() {
    currentIdx = (currentIdx + 1) % audios.length;
    loadAudio(audios[currentIdx]);
    playAudio();
}

function prevAudio() {
    currentIdx = (currentIdx - 1 + audios.length) % audios.length;
    loadAudio(audios[currentIdx]);
    playAudio();
}

function updateProgress() {
    const { duration, currentTime } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    const mins = Math.floor((duration - currentTime) / 60);
    const secs = Math.floor((duration - currentTime) % 60);
    const minuteValue = mins.toString().padStart(2, '0');
    const secondValue = secs.toString().padStart(2, '0');
    displayTime.innerHTML = `${minuteValue}:${secondValue}`;
}

function stopAudio() {
    audioPlayer.currentTime = 0;
    progressBar.style.width = '0%';
    pauseAudio();
}

function volumeControl() {
    audioPlayer.volume = volumeProgress.value / 100;
}

function progressAudioClick(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
}

audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('play', playAudio);
audioPlayer.addEventListener('pause', pauseAudio);

playButton.addEventListener('click', playAndPauseAudio);
nextButton.addEventListener('click', nextAudio);
prevButton.addEventListener('click', prevAudio);
stopButton.addEventListener('click', stopAudio);
volumeProgress.addEventListener('change', volumeControl);
progress.addEventListener('click', progressAudioClick);
