class Coin {
  constructor() {
    this.x = random(50, canvasWidth - 50);
    this.y = random(50, canvasHeight - 50);

    this.width = 5;
    this.size = 30 * canvasSize;
    this.spinFlag = false;
    this.destroyed = false;
    this.consumed = false;

    this.velocity = 0;
  }

  display() {
    if (!this.destroyed) {
      noStroke();
      fill(color(250, 220, 0));
      ellipse(this.x, this.y, this.width, this.size);
    }
  }

  move() {
    if (this.width <= 2.5) {
      this.spinFlag = false;
    }
    if (this.width >= this.size) {
      this.spinFlag = true;
    }

    if (!this.spinFlag) {
      this.width += 1;
    }
    if (this.spinFlag) {
      this.width -= 1;
    }

    // consumed animation
    if (this.consumed) {
      this.velocity += 0.9;
      this.y += this.velocity;
    }
  }
}