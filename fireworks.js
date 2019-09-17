let g;
class Firework {
    constructor(x, y, color, size = Math.random() * 5) {
        this.Init(x, y, color, size)
        g = createVector(0,.5);
    }
    Init(x, y, color, size) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, -10 + -10 * Math.random());
        this.pastPosition = this.position;
        this.fuse = Math.random() * 100;
        this.size = size;
        this.color = color;

    }
    Update() {
        if (this.fuse > 0) {
            this.fuse--;
        }
        else {
            this.pastPosition = this.position.copy();
            this.velocity.add(g);
            if (this.velocity.y > 0) {
                // this.Init(Math.random() * width, height, color(0))
            }
            else {
                this.position.add(this.velocity);
            }
        }
    }
    Draw() {
        push();
        noStroke();
        ellipse(this.position.x, this.position.y, this.size);
        line(this.pastPosition.x, this.pastPosition.y, this.position.x, this.position.y);
        pop();
    }
}