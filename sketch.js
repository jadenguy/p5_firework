const fwCount = 15;
const speed = 10;
const frameSkip = 1;
let i = 0;
let fireworks;

function setup() {
  createCanvas(800, 800);
  fill(0);
  stroke(0);
  fireworks = (new FireWorks(fwCount));
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function draw() {
  i++;
  for (let index = 0; index < speed; index++) {
    fireworks.Update();
  }
  if (frameSkip == i) {
    background(50);
    fireworks.Draw();
    i = 0;
  }
}