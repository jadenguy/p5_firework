let gravity;
let explosion = [];

class Firework {
    constructor() {
        this.Init()
        gravity = createVector(0, 1);
    }
    Init() {
        this.fuse = Math.random() * 100;
        this.size = Math.random() * 10;
        this.position = createVector(randomRange(0, width), height + 10);
        this.velocity = createVector(randomRange(-3, 3), randomRange(-40, -30));
        this.pastPosition = this.position;
        this.fireColor = color(Math.random() * 100 + 100, Math.random() * 100 + 155, Math.random() * 100 + 100);
    }
    Update() {
        if (this.fuse > 0) {
            this.fuse--;
        }
        else {
            this.pastPosition = this.position.copy();
            this.velocity.add(gravity);
            if (this.velocity.y > 0) {
                push()
                fill(255);
                noStroke();
                ellipse(this.position.x, this.position.y, this.size*10, this.size*10)
                pop()
                this.Init()
                return true;
            }
            // else
            // if (this.position.y > height+this.size) {
            //     this.Init()
            // }
            else {
                this.position.add(this.velocity);
            }
        }
    }
    Draw() {
        push();
        stroke(this.fireColor);
        strokeWeight(1);
        fill(255);
        line(this.pastPosition.x, this.pastPosition.y, this.position.x, this.position.y);
        ellipse(this.position.x, this.position.y, this.size);
        pop();
    }
}