// player settings
let velocity = 5;

class Player {
  constructor() {
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;

    this.size = canvasSize * 50;
  }

  display() {
    noStroke();
    fill(color(80, 130, 250));
    ellipse(this.x, this.y, this.size, this.size);
  }

  move() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.x -= velocity;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.x += velocity;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      this.y -= velocity;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      this.y += velocity;
    }

    if (this.x < 0) {
      this.x = canvasWidth;
    } else if (this.x > canvasWidth) {
      this.x = 0;
    } else if (this.y < 0) {
      this.y = canvasHeight;
    } else if (this.y > canvasHeight) {
      this.y = 0;
    }
  }

  recoil(direction) {
    push();

    direction.normalize();
    direction.mult(5);
    let pos = createVector(this.x, this.y);
    pos.add(direction);
    this.x = pos.x;
    this.y = pos.y;

    pop();
  }

  collect() {
    score++;
  }
}
