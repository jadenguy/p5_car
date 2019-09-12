class Hunter {
    constructor(x, y, size) {
        this.turnMax = .05;
        this.initial = createVector(x, y);
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.carDirection = createVector(1, 0);
        this.acceleration = createVector(0, 0);
        this.size = size;
    }
    Update(turnDirection, accel) {
        let delta = clamp(turnDirection, -this.turnMax, this.turnMax);
        this.carDirection= this.velocity.normalize();

        this.acceleration = createVector(accel, 0);
        this.acceleration.rotate(this.velocity.heading());
        // if (accel < 0) { this.acceleration.rotate(HALF_PI); }
        drawArrow(this.initial, this.acceleration.copy().mult(1000), color(255, 0, 0));

        const turn = createVector(delta, 0).rotate(this.carDirection.heading()).rotate(QUARTER_PI);
        turn.rotate(HALF_PI);
        drawArrow(this.velocity.copy().mult(100).add(this.initial), turn.copy().mult(10), color(255, 255, 100));


        const friction = this.velocity.copy().mult(-.01);
        console.log(friction);
        
        drawArrow(this.initial, friction.copy().mult(1000), color(100, 100, 100));

        this.velocity.add(this.acceleration);
        this.velocity.add(friction);
        this.velocity.add(turn);
        drawArrow(this.initial, this.velocity.copy().mult(100), color(0, 255, 0));

        this.position.add(this.velocity);
        drawArrow(this.initial, this.carDirection.copy().mult(50), color(0, 0, 255));

        drawArrow(this.initial, this.position.copy().sub(this.initial), color(0));

    }
    Draw(c) {
        push();
        stroke(0);
        fill(c);
        // console.log(this.position);
        const x = this.position.x;
        const y = this.position.y;
        // console.log(x, y);
        translate(this.position.x, this.position.y);
        const angle = this.carDirection.heading();
        console.log(angle);
        rotate(angle);
        // const ret = rect(0, 0, this.size, this.size);
        rectMode(RADIUS);
        rect(this.size, 0, this.size / 2, this.size / 2);
        rect(0, 0, this.size, this.size);
        pop();
        // return ret;
    }
}