let fireWorks = [];

function setup() {
  createCanvas(500, 500);
  fill(0);
  stroke(0);
  for (let index = 0; index < 100; index++) {
    fireWorks.push(new Firework(Math.random() * width, height, color(0)))
  }
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function draw() {
  background(240);
  fireWorks.forEach(fw => {
    fw.Update();
    fw.Draw();    
  });
}