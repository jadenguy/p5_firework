const fwCount = 15;
const speed = 10;
const frameSkip = 1;
let i = 0;
let f;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  fill(0);
  stroke(0);
  f = (new FireWorks(fwCount));
  $fwCount = 0;
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function draw() {
  i++;
  for (let index = 0; index < speed; index++) {
    f.Update();
  }
  if (frameSkip == i) {
    background(50);
    f.Draw();
    i = 0;
    //   if (f.fireworks.length != $fwCount) {
    //     $fwCount = f.fireworks.length;
    //     console.log($fwCount, frameRate());
    //   }
  }
}