const sounds = ["Music1","Music2","Music3","Music4"];

sounds.forEach((sound) => {
    const btn = document.createElement("button");
    btn.innerText = sound;
    btn.classList.add('btn');
    document.body.appendChild(btn);
    btn.addEventListener("click", () => {
        stopSong();
        document.getElementById(sound).play();
    });
});

const stopSong = () => {
    sounds.forEach((sound) => {
        const currentSong = document.getElementById(sound);
        currentSong.pause();
        currentSong.currentTime = 0;
    });
}