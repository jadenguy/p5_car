class Crosshair {
    constructor(x, y, moveSpeed) {
        this.position = createVector(x, y);
        this.xOff = 0.0;
        this.yOff = 1.0;
        this.moveSpeed = 0.005;
    }
    Update() {
        this.x = noise(this.xOff) * width;
        this.y = noise(this.yOff) * height;
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