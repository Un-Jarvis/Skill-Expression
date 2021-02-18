// game settings
let canvasSize = 1;
let canvasWidth = 1000 * canvasSize;
let canvasHeight = 650 * canvasSize;
let score = 0;
let scoreColor;
let attacked = false;
let warnColor;

// game objects
let player;
let enemies = [];
let enemiesNumber = 3;
let bullets = [];
let bulletIntervalId = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  scoreColor = color(50, 220, 50);
  warnColor = color(255, 0, 0);
  warnColor.setAlpha(0);

  // set up objects
  player = new Player();

  noStroke();
  rectMode(CENTER);
}

function draw() {
  // set up environment
  background(245);

  if (attacked) {
    scoreColor = color(255, 0, 0);
  } else {
    scoreColor = color(50, 220, 50);
  }

  // draw objects
  player.display();
  if (enemies.length < enemiesNumber) {
    enemies.push(new Enemy());
  }

  // move objects
  player.move();
  for (let enemy of enemies) {
    enemy.move();
    enemy.display();
  }
  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    bullet.move();
    bullet.display();
    // remove bullets which runs out of the game screen
    if (
      bullet.x <= 0 ||
      bullet.x >= canvasWidth ||
      bullet.y <= 0 ||
      bullet.y >= canvasHeight
    ) {
      bullets.splice(i, 1);
    }
  }

  // detect collisions
  detectCollision();

  // display score
  push();
  drawingContext.shadowOffsetX = 1.5;
  drawingContext.shadowOffsetY = 1.5;
  drawingContext.shadowBlur = 3;
  drawingContext.shadowColor = "black";
  textAlign(CENTER);
  fill(scoreColor);
  textSize(30 * canvasSize);
  text("SCORE: " + score, canvasWidth / 2, 50);
  pop();
}

function mousePressed() {
  bulletIntervalId = setInterval(function () {
    bullets.push(new Bullet(player.x, player.y, mouseX, mouseY));
  }, 50);
}

function mouseReleased() {
  clearInterval(bulletIntervalId);
  bulletIntervalId = 0;
}

function detectCollision() {
  attacked = false;
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    if (dist(enemy.x, enemy.y, player.x, player.y) <= player.size / 2) {
      attacked = true;
      if (frameCount % 15 == 0) {
        score--;
      }
    }

    for (let j = 0; j < bullets.length; j++) {
      let bullet = bullets[j];
      if (dist(bullet.x, bullet.y, enemy.x, enemy.y) <= enemy.size / 2) {
        bullets.splice(j, 1);
        enemies.splice(i, 1);
        player.collect();
      }
    }
  }
}
