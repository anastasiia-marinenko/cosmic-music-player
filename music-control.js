const playlist = [
    "music/01-Moon.ogg",
    "music/02-Staring-At-The-Sun.ogg",
    "music/03-New-Moon-Rising.ogg",
    "music/04-Starlight.ogg",
    "music/05-Yellow-Moon.ogg"
];

let currentTrack = 0;
const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const volumeControl = document.getElementById('volume');
const volumeIcon = document.getElementById('volume-icon');
let isShuffling = false;

// Set default volume
audio.volume = 0.25;

function playTrack() {
    audio.src = playlist[currentTrack];
    audio.play();
}

var pause = 0;

playButton.addEventListener('mousedown', () => {
    if (pause == 0) {
        document.getElementById('play-icon').src = 'images/music-icons/play-active.png';
    }
    else {
        document.getElementById('play-icon').src = 'images/music-icons/pause-active.png';
    }
});

playButton.addEventListener('mouseup', () => {
    document.getElementById('play-icon').src = 'images/music-icons/pause.png';
    pause = 1;
});

playButton.addEventListener('click', () => {
    if (audio.paused) {
        playTrack();
        document.getElementById('play-icon').src = 'images/music-icons/pause.png';
    } else {
        audio.pause();
        document.getElementById('play-icon').src = 'images/music-icons/play.png';
        pause = 0;
    }
});

nextButton.addEventListener('mousedown', () => {
    document.getElementById('next-icon').src = 'images/music-icons/next-active.png';
});

nextButton.addEventListener('mouseup', () => {
    document.getElementById('next-icon').src = 'images/music-icons/next.png';
});

prevButton.addEventListener('mousedown', () => {
    document.getElementById('prev-icon').src = 'images/music-icons/prev-active.png';
});

prevButton.addEventListener('mouseup', () => {
    document.getElementById('prev-icon').src = 'images/music-icons/prev.png';
});

shuffleButton.addEventListener('mousedown', () => {
    document.getElementById('shuffle-icon').src = 'images/music-icons/shuffle-active.png';
});

shuffleButton.addEventListener('mouseup', () => {
    document.getElementById('shuffle-icon').src = 'images/music-icons/shuffle.png';
});

shuffleButton.addEventListener('click', () => {

    isShuffling = !isShuffling;
    if (isShuffling) {
        currentTrack = Math.floor(Math.random() * playlist.length); // Random track
    } else {
        currentTrack = (currentTrack + 1) % playlist.length; // Next track
    }
    if (pause === 1) { // Check if the audio is not pause
        playTrack();
    }
});

repeatButton.addEventListener('mousedown', () => {
    document.getElementById('repeat-icon').src = 'images/music-icons/repeat-active.png';
});

repeatButton.addEventListener('mouseup', () => {
    document.getElementById('repeat-icon').src = 'images/music-icons/repeat.png';
});

repeatButton.addEventListener('click', () => {
    audio.currentTime = 0; // Restart the current track
    audio.play(); // Play from the start
});

prevButton.addEventListener('click', () => {
    // Play previous track
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    if (pause === 1) { // Check if the audio is not pause
        playTrack();
    }
});

nextButton.addEventListener('click', () => {
    // Play next track
    currentTrack = (currentTrack + 1) % playlist.length;
    if (pause === 1) { // Check if the audio is not pause
        playTrack();
    }
});

volumeControl.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    updateVolumeIcon(audio.volume);
});

function updateVolumeIcon(volume) {
    if (volume === 0) {
        volumeIcon.src = 'images/music-icons/volume-no.png';
    } else if (volume < 0.5) {
        volumeIcon.src = 'images/music-icons/volume-low.png';
    } else {
        volumeIcon.src = 'images/music-icons/volume.png';
    }
}

audio.addEventListener('ended', () => {
    if (isShuffling) {
        let nextTrack = currentTrack;
        do {
            nextTrack = Math.floor(Math.random() * playlist.length);
        } while (nextTrack === currentTrack); // Avoid repeating the same track after shuffle
        currentTrack = nextTrack;
    } else {
        currentTrack = (currentTrack + 1) % playlist.length;
    }
    playTrack();
});