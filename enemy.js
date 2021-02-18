class Enemy {
  constructor() {
    this.size = canvasSize * 40;

    let pos = random(1);
    if (pos < 0.25) {
      this.x = -1 * this.size / 2;
      this.y = random(0, canvasHeight);
    } else if (pos >= 0.25 && pos < 0.5) {
      this.x = random(0, canvasWidth);
      this.y = canvasHeight + this.size / 2;
    } else if (pos >= 0.5 && pos < 0.75) {
      this.x = canvasWidth + this.size / 2;
      this.y = random(0, canvasHeight);
    } else {
      this.x = random(0, canvasWidth);
      this.y = -1 * this.size / 2;
    }

    this.pos = createVector(this.x, this.y);
  }

  display() {
    push();
    
    translate(this.x, this.y);
    let angle = atan2(player.y - this.y, player.x - this.x);
    rotate(angle);
    
    noStroke();
    fill(color(255, 0, 0));
    triangle(0, 0, -50, -20, -50, 20);
    
    pop();
  }

  move() {
    let target = createVector(player.x, player.y);

    target.sub(this.pos);
    target.normalize();

    target.mult(3);
    this.pos.add(target);
    this.x = this.pos.x;
    this.y = this.pos.y;
  }
}