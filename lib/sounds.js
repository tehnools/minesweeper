// Sound
const BOOM_URL = "https://freesound.org/data/previews/85/85896_14771-lq.mp3";
const BOOM = new Audio(BOOM_URL);
const CLICK_URL = "https://freesound.org/data/previews/448/448080_9159316-lq.mp3";
const CLICK = new Audio(CLICK_URL);


// Event Sounds
function playBoom(e) {
    BOOM.play();
}

function playClick(e) {
    if (e.type === "mouseover") {
        CLICK.play();
    }
}
