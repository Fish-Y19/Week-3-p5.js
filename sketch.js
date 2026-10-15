// Snowflakes fall and sway; their size pulses with the music.
let snowflakes = [];
let beat;
let analyzer;
let volumeLevel = 0;

function preload() {
  // Keep beat.mp3 in the same folder as index.html and sketch.js.
  beat = loadSound('beat.mp3');
}

function setup() {
  createCanvas(400, 600);
  angleMode(DEGREES);

  analyzer = new p5.Amplitude();
  analyzer.setInput(beat);

  for (let i = 0; i < 300; i++) {
    snowflakes.push(new Snowflake());
  }

  describe('Snowflakes falling on a black background and pulsing with music. Click to play or stop the music.');
}

function draw() {
  background(0);

  // Read the music volume and use it to make the snowflakes pulse.
  volumeLevel = analyzer.getLevel();
  let currentTime = frameCount / 60;

  for (let flake of snowflakes) {
    flake.update(currentTime);
    flake.display(volumeLevel);
  }

  noStroke();
  fill(255);
  textAlign(CENTER);
  textSize(14);
  text(beat.isPlaying() ? 'Click to stop the music' : 'Click to play the music', width / 2, height - 18);
}

function mousePressed() {
  if (beat.isPlaying()) {
    beat.stop();
  } else {
    beat.loop();
  }
}

class Snowflake {
  constructor() {
    this.posX = 0;
    this.posY = random(-height, 0);
    this.initialAngle = random(0, 360);
    this.size = random(2, 5);
    this.radius = sqrt(random(pow(width / 2, 2)));
    this.color = color(random(200, 256), random(200, 256), random(200, 256));
  }

  update(time) {
    let angularSpeed = 35;
    let angle = this.initialAngle + angularSpeed * time;
    this.posX = width / 2 + this.radius * sin(angle);
    this.posY += 8 / this.size;

    if (this.posY > height) {
      this.posY = -50;
    }
  }

  display(volume) {
    fill(this.color);
    noStroke();
    let pulseSize = this.size + volume * 45;
    ellipse(this.posX, this.posY, pulseSize);
  }
}
