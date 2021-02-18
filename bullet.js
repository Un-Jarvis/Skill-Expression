class Bullet {
  constructor(x, y, targetX, targetY) {
    this.x = x;
    this.y = y;
    this.pos = createVector(this.x, this.y);
    this.angle = atan2(targetY - this.y, targetX - this.x);
    
    this.target = createVector(targetX, targetY);
    this.velocity = this.target.sub(this.pos);
    this.velocity.normalize();
    this.velocity.mult(50);
    
    this.size = 20 * canvasSize;
  }

  display() {
    push();

    translate(this.x, this.y);
    rotate(this.angle);

    noStroke();
    fill(color(255, 100, 255));
    ellipse(0, 0, this.size, this.size / 2);

    pop();
  }

  move() {   
    this.pos.add(this.velocity);
    this.x = this.pos.x;
    this.y = this.pos.y;
  }
}