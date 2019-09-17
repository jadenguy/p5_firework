let i = 0;
let h;
let p;
let c;
let x;

let deltaHeading = 0;
let acceleration = 0;

const slowDown = 30; // in frames
const maxSpeed = 30;

function setup() {
  createCanvas(500, 500);
  // noCursor();
  h = new Hunter(width / 2, height / 2, 5, 5, 2);
  p = new prey();
  c = new coin();
  x = new Crosshair(0,0,.005);
  fill(0);
  stroke(0);
}




// function keyPressed() {
//   if (keyCode === UP_ARROW) {
//     acceleration = .1;
//   } else if (keyCode === DOWN_ARROW) {
//     acceleration = -.1;
//   }

// } else if (keyCode === DOWN_ARROW) {
//   acceleration = -.1;
// } else if (keyCode === DOWN_ARROW) {
//   acceleration = -.1;
// }
//   // return false; // prevent default
// }


function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function draw() {

  const distX = x.x - mouseX;
  const distY = x.y - mouseY;
  const distance = Math.sqrt(distX * distX + distY * distY);
  const redness = clamp(map(distance, 0, Math.sqrt(width * width * 2) / 10, 255, 0), 0, 255);
  const green = 255;

  background(204);
  x.Update();

  readKey();
  h.Update(deltaHeading, acceleration);

  x.Draw(color(redness, 0, 0));
  h.Draw(color(0, green, 0));

  // const deltaMouseX = winMouseX - pwinMouseX;
  // const deltaMouseY = winMouseY - pwinMouseY;
  // const speed = Math.sqrt(deltaMouseX * deltaMouseX + deltaMouseY * deltaMouseY);

  // mouseSpeed = clamp((mouseSpeed * slowDown + speed) / (slowDown + 1), 0, maxSpeed);


  // if (isNaN(mouseSpeed)) {
  //   mouseSpeed = 0;
  //   console.log(deltaMouseX, deltaMouseY, speed, "NAN");
  // }
  // else {
  //   console.log(mouseSpeed);
  // }

  // const blueness = map(mouseSpeed, 0, maxSpeed, 255, 0);

  // stroke(0);
  // fill(blueness, blueness, 255);

  // ellipse(mouseX, mouseY, 10, 10);
  // moveSpeed = moveSpeed + .000001;
  // if (i == 100) { noLoop(); }
  i++;
}

function readKey() {
  deltaHeading = 0;
  acceleration = 0;
  if (keyIsDown(LEFT_ARROW)) {
    deltaHeading = -1;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    deltaHeading = 1;
  }

  if (keyIsDown(DOWN_ARROW)) {
    acceleration = -.15;
  }
  if (keyIsDown(UP_ARROW)) {
    acceleration = .15;
  }

}