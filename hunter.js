class Hunter {
    constructor(x, y, size, maxSpeed, handling) {
        this.turnMax = 1;
        this.initial = createVector(x, y);
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.carDirection = createVector(1, 0);
        this.acceleration = createVector(0, 0);
        this.turn = createVector(0, 0);
        this.size = size;
        this.maxSpeed = maxSpeed;
        this.handling = handling;
    }
    Update(turnDirection, accel) {

        this.acceleration = createVector(accel, 0);
        this.acceleration.rotate(this.carDirection.heading());
        this.velocity.add(this.acceleration);

        const lastVelocity = this.velocity.copy();

        const delta = clamp(turnDirection, -1, 1);
        this.turn = this.velocity.copy().mult(delta * this.handling / 100).mult(this.velocity.mag());
        this.turn.rotate(HALF_PI);
        if (this.velocity.angleBetween(this.carDirection) > QUARTER_PI) {
            this.turn.rotate(PI);
        }
        this.velocity.add(this.turn);

        this.carDirection.rotate(this.velocity.heading() - lastVelocity.heading());

        this.velocity.setMag(lastVelocity.mag()); //now turns don't increase velocity
        this.velocity.mult(.98); //friction
        this.velocity.limit(this.maxSpeed)


        this.position.add(this.velocity);


        const xInside = clamp(this.position.x, this.size, width - this.size);
        const yInside = clamp(this.position.y, this.size, height - this.size);
        if (this.position.x != xInside || this.position.y != yInside) {
            console.log(this.velocity.mag());

            this.velocity.mult(-.1);
            this.position.x = xInside;
            this.position.y = yInside;
        }
    }
    Draw(c, arrows = false) {
        push();
        stroke(0);
        fill(c);
        // console.log(this.position);
        // const x = this.position.x;
        // const y = this.position.y;
        // console.log(x, y);
        translate(this.position.x, this.position.y);
        const angle = this.carDirection.heading();
        // console.log(angle);
        rotate(angle);
        // const ret = rect(0, 0, this.size, this.size);
        rectMode(RADIUS);
        if (arrows) { this.DrawMovementVectors(); }
        const ret = [rect(this.size, 0, this.size / 2, this.size / 2), rect(0, 0, this.size, this.size)];
        pop();
        return ret;
    }
    DrawMovementVectors(mag = 10) {
        drawArrow(this.initial, this.acceleration.copy().mult(20 * mag), color(255, 0, 0));
        drawArrow(this.velocity.copy().mult(2 * mag).add(this.initial), this.turn.copy().mult(10 * mag), color(255, 255, 100));
        drawArrow(this.initial, this.velocity.copy().mult(2 * mag), color(0, 255, 0));
        drawArrow(this.initial, this.carDirection.copy().mult(mag), color(0, 0, 255));
        drawArrow(this.initial, this.position.copy().sub(this.initial), color(0));
    }
}
