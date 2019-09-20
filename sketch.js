const fwCount = 20;
const speed = 10;
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
  background(50);
  for (let index = 0; index < speed; index++) {
    fireworks.Update();
    
  }
  fireworks.Draw();

}