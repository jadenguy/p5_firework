let gravity;
const splinters = 2;
const g = .002;
const trail = 10;
const maxInit = 1.75;


class FireWorks {
    constructor(count) {
        this.count = count;
        this.fireworks = [];
        for (let index = 0; index < count; index++) {
            this.fireworks.push(new Firework())
            gravity = createVector(0, g);
        }
    }
    Update() {
        for (let index = 0; index < this.fireworks.length; index++) {
            const fw = this.fireworks[index];
            const explosions = fw.Update();
            if ((typeof explosions) == 'object') {
                explosions.forEach(x => { this.fireworks.push(x) });
            }
            if (explosions == false) {
                this.fireworks.splice(index, 1);
            }
        }
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
        , velocity = createVector(random(-.25, .25), -random(.75 * maxInit, maxInit))
        , colorWheelAngle = random(0, TWO_PI)
        , explosive = true
        , explosionTime = -1000
        , trailSize = trail) {
        this.Init(fuse, size, position, velocity, colorWheelAngle, explosive, explosionTime, trailSize);
    }
    Init(fuse = random(0, 1000)
        , size = random(5, 10)
        , position = createVector(random(0, width), height + size)
        , velocity = createVector(random(-.25, .25), -random(.75 * maxInit, maxInit))
        , colorWheelAngle = random(0, TWO_PI)
        , explosive = true
        , explosionTime = -1000
        , trailSize = trail) {
        this.fuse = fuse;
        this.size = size;
        this.position = position;
        this.velocity = velocity;
        this.colorWheelAngle = colorWheelAngle;
        this.explosive = explosive;
        this.explosionTime = explosionTime;
        this.initialVelocity = this.velocity.y;
        this.pastPositions = [];
        for (let index = 0; index < trailSize; index++) {
            this.pastPositions.push(position.copy());
        }
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
                if (this.position.y > height + this.size && this.velocity.y > 0) {
                    console.log("dud", this.fuse, this.position.y, this.velocity.y, this.size, this.initialVelocity);
                    this.Init();
                    return true;
                }
                else {
                    this.position.add(this.velocity);
                    return true;
                }
        }
        return true;
    }
    Explode() {
        if (this.explosive) {
            const ret = [];
            for (let i = 0; i < this.size * splinters; i++) {
                const angle = i * (TWO_PI / (this.size * splinters));
                const direction = createVector(0, this.size * .05);
                direction.rotate(angle);
                ret.push(new Firework(0, 1, this.position.copy(), direction, this.colorWheelAngle, false, this.explosionTime / 3))
            }
            return ret;
        }
        return false;
    }
    Draw() {
        if (this.fuse <= 0) {
            push();
            stroke(this.GetColor(200, 100));
            strokeWeight(1);
            fill(color(0,0,0,0));
            this.pastPositions.push(this.position.copy());
            beginShape();
            this.pastPositions.forEach(p => {
                vertex(p.x, p.y)
            });
            endShape();
            fill(this.GetColor(50, 100));
            ellipse(this.position.x, this.position.y, this.size);
            this.pastPositions.shift();
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