let gravity;
let explosion = [];


class FireWorks {
    constructor(count) {
        this.count = count;
        this.fireworks = [];
        for (let index = 0; index < count; index++) {
            this.fireworks.push(new Firework())
        }
    }
    Update() {
        this.fireworks.forEach(fw => {
            const explosions = fw.Update();
            if (explosions) { this.fireworks.Push(explosions); }
        });
    }
    Draw() {
        this.fireworks.forEach(fw => {
            fw.Draw();
        });
    }
}

class Firework {
    constructor(fuse = random(0, 1000)
        , size = random(5, 10)
        , position = createVector(random(0, width), height + size)
        , velocity = createVector(random(-.25, .25), random(-1.75, -1.35))
        , colorWheelAngle = random(0, TWO_PI)
        , explosive = true
        , explosionTime = -1000) {
        this.Init(fuse, size, position, velocity, colorWheelAngle, explosive, explosionTime)
        gravity = createVector(0, .002);
    }
    Init(fuse = random(0, 1000)
        , size = random(5, 10)
        , position = createVector(random(0, width), height + size)
        , velocity = createVector(random(-.25, .25), random(-1.75, -1.35))
        , colorWheelAngle = random(0, TWO_PI)
        , explosive = true
        , explosionTime = -1000) {
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

            this.velocity.add(gravity);
            if (this.fuse < this.explosionTime) {
                const ret = this.Explode();
                this.Init();
                return ret;
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
            fill(this.GetColor(255, 255, 255));
            noStroke();
            ellipse(this.position.x, this.position.y, this.size * 10, this.size * 10)
            pop();
        }
    }
    Draw() {
        if (this.fuse < 0) {
            push();
            stroke(this.GetColor(200, 100));
            strokeWeight(1);
            fill(this.GetColor(50, 100));
            line(this.pastPosition.x, this.pastPosition.y, this.position.x, this.position.y);
            ellipse(this.position.x, this.position.y, this.size);
            this.pastPosition = this.position.copy();
            pop();
        }
    }
    GetColor(brightness, saturation, alphaMin = 0, alphaMax = 255) {
        const r = brightness - map(Math.sin(this.colorWheelAngle + 1 / 3 * TWO_PI), -1, 1, 0, 1) * saturation;
        const g = brightness - map(Math.sin(this.colorWheelAngle + 2 / 3 * TWO_PI), -1, 1, 0, 1) * saturation;
        const b = brightness - map(Math.sin(this.colorWheelAngle + 3 / 3 * TWO_PI), -1, 1, 0, 1) * saturation; //this is cheeky
        const c = color(r, g, b);
        const a = map(this.fuse - this.explosionTime, 0, -this.explosionTime, alphaMin, alphaMax);
        c.setAlpha(a);
        return c;
    }
}