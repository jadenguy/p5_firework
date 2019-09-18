const fireWorks = [];

function randomRange(min,max) {
  return map(Math.random(), 0, 1, min, max) 
}

function setup() {
  createCanvas(800, 800);

  fill(0);
  stroke(0);
  for (let index = 0; index < 10; index++) {
    fireWorks.push(new Firework())
  }
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function draw() {
  background(50);
  fireWorks.forEach(fw => {
    fw.Update();
    fw.Draw();
  });
}