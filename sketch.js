let beat;
let analyzer;
let hueValue = 0;

function preload() {
    beat = loadSound('beat.mp3');
}

function setup() {
    createCanvas(600, 400);
    colorMode(HSB, 360, 100, 100);
    analyzer = new p5.Amplitude();
    analyzer.setInput(beat);
}

function draw() {
    background(230, 30, 12);

    let volume = analyzer.getLevel();
    let circleSize = 80 + volume * 700;

    noFill();
    strokeWeight(4);

    for (let i = 0; i < 3; i++) {
        stroke((hueValue + i * 40) % 360, 80, 100, 0.8);
        ellipse(
            width / 2,
            height / 2,
            circleSize + i * 35,
            circleSize + i * 35
        );
    }

    hueValue = (hueValue + 1 + volume * 80) % 360;

    noStroke();
    fill(0, 0, 100);
    textAlign(CENTER);
    textSize(16);
    text('Click anywhere to play or stop the beat', width / 2, height - 30);
}

function mousePressed() {
    if (beat.isPlaying()) {
        beat.stop();
    } else {
        beat.loop();
    }
}
