class Crosshair {
    constructor(x, y, moveSpeed) {
        this.position = createVector(x, y);
        this.xOff = 0.0;
        this.moveSpeed = moveSpeed;
    }
    Update() {
        this.xOff += this.moveSpeed;
        this.position.x = noise(this.xOff) * width;
        this.position.y = noise(this.xOff + 10) * height;
        return this.position;
    }
    Draw(c) {
        push();
        stroke(c);
        fill(255);
        const x = this.position.x;
        const y = this.position.y;
        let ret = [line(x, 0, x, height), line(0, y, width, y)];
        pop();
        return ret;
    }
}