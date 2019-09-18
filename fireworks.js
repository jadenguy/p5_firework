let gravity;
let explosion = [];

class Firework {
    constructor() {
        this.Init()
        gravity = createVector(0, .25);
    }
    Init(fuse = randomRange(0, 100)
        , size = randomRange(5, 10)
        , position = createVector(randomRange(0, width), height + size)
        , velocity = createVector(randomRange(-4, 4), randomRange(-20, -13))
        , colorWheelAngle = randomRange(0, TWO_PI)
        , explosive = true
        , explosionTime = -65) {
        this.fuse = fuse;
        this.size = size;
        this.position = position;
        this.velocity = velocity;
        this.colorWheelAngle = colorWheelAngle;
        this.explosive = explosive;
        this.explosionTime = explosionTime;
        this.initialVelocity = this.velocity.y;
        this.pastPosition = this.position;
    }
    Update() {
        this.fuse--;
        if (this.fuse < 0) {
            this.pastPosition = this.position.copy();
            this.velocity.add(gravity);
            if (this.fuse < this.explosionTime) {
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
        if (this.explosive) {
            push()
            fill(this.GetColor(255, 255));
            noStroke();
            ellipse(this.position.x, this.position.y, this.size * 10, this.size * 10)
            pop();
        }
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