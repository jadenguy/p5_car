class Hunter {
    constructor(x, y, size) {
        this.turnMax = 1;
        this.initial = createVector(x, y);
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.carDirection = createVector(1, 0);
        this.acceleration = createVector(0, 0);
        this.size = size;
    }
    Update(turnDirection, accel) {

        this.acceleration = createVector(accel, 0);
        this.acceleration.rotate(this.carDirection.heading());
        drawArrow(this.initial, this.acceleration.copy().mult(1000), color(255, 0, 0));
        this.velocity.add(this.acceleration);

        const lastVelocity = this.velocity.copy();

        const delta = clamp(turnDirection, -1, 1);
        const turn = this.velocity.copy().mult(delta * .02).mult(this.velocity.mag()).limit(10);
        console.log(turn);
        turn.rotate(HALF_PI);
        this.velocity.add(turn);
        console.log(turn);
        
        drawArrow(this.velocity.copy().mult(100).add(this.initial), turn.copy().mult(1000), color(255, 255, 100));

        this.carDirection.rotate(this.velocity.heading() - lastVelocity.heading());

        this.velocity.mult(.98);
        this.velocity.limit(10)
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
        // console.log(angle);
        rotate(angle);
        // const ret = rect(0, 0, this.size, this.size);
        rectMode(RADIUS);
        rect(this.size, 0, this.size / 2, this.size / 2);
        rect(0, 0, this.size, this.size);
        pop();
        // return ret;
    }
}