let gravity;
let explosion = [];

class Firework {
    constructor() {
        this.Init()
        gravity = createVector(0, .25);
    }
    Init() {
        this.fuse = randomRange(0, 100);
        this.size = randomRange(5, 10);
        this.position = createVector(randomRange(0, width), height + this.size);
        this.velocity = createVector(randomRange(-4, 4), randomRange(-20, -13));
        this.initialVelocity = this.velocity.y;
        this.pastPosition = this.position;
        this.colorWheelAngle = randomRange(0, TWO_PI);
    }
    Update() {
        this.fuse--;
        if (this.fuse < 0) {
            this.pastPosition = this.position.copy();
            this.velocity.add(gravity);
            if (this.fuse < -60) {
                this.Explode()
                this.Init();
                return true;
            }
            else
                if (this.position.y > height + this.size) {
                    console.log("dud", this.fuse, this.position, this.initialVelocity);
                    this.Init();
                }
                else {
                    this.position.add(this.velocity);
                }
        }
    }
    Explode() {
        push()
        fill(this.GetColor(255, 255));
        noStroke();
        ellipse(this.position.x, this.position.y, this.size * 10, this.size * 10)
        pop();
    }
    Draw() {
        push();
        stroke(this.GetColor(200, 100));
        strokeWeight(1);
        fill(this.GetColor(50, 100));
        line(this.pastPosition.x, this.pastPosition.y, this.position.x, this.position.y);
        ellipse(this.position.x, this.position.y, this.size);
        pop();
    }
    GetColor(brightness, saturation) {
        const r = brightness - map(Math.sin(this.colorWheelAngle + 1 / 3 * TWO_PI), -1, 1, 0, 1) * saturation;
        const g = brightness - map(Math.sin(this.colorWheelAngle + 2 / 3 * TWO_PI), -1, 1, 0, 1) * saturation;
        const b = brightness - map(Math.sin(this.colorWheelAngle + 3 / 3 * TWO_PI), -1, 1, 0, 1) * saturation; //this is cheeky
        return color(r, g, b)
    }
}