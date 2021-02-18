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
let coins = [];
let coinsNumber = 10;
let bullets = [];
let bulletIntervalId = 0;

// checkboxes
let coinAnimated;
let coinAnimatedBool = true;
let screenShake;
let screenShakeBool = true;
let recoil;
let recoilBool = true;
let warning;
let warningBool = true;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  scoreColor = color(50, 220, 50);
  warnColor = color(255, 0, 0);
  warnColor.setAlpha(0);

  // set up objects
  player = new Player();

  // game settings
  coinAnimated = createCheckbox("Coin Animated", true);
  coinAnimated.changed(coinAnimatedEvent);
  screenShake = createCheckbox("Screenshake", true);
  screenShake.changed(screenShakeEvent);
  recoil = createCheckbox("Recoil", true);
  recoil.changed(recoilEvent);
  warning = createCheckbox("Warning", true);
  warning.changed(warningEvent);

  noStroke();
  rectMode(CENTER);
}

function draw() {
  // set up environment
  background(245);

  // screen shake
  if (screenShakeBool && attacked) {
    translate(random(-10, 10), random(-10, 10));
  }

  // warn
  if (warningBool && attacked) {
    warningDisplay();
  }

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
  if (coins.length < coinsNumber) {
    coins.push(new Coin());
  }

  // move objects
  player.move();
  for (let enemy of enemies) {
    enemy.move();
    enemy.display();
  }
  for (let coin of coins) {
    if (coinAnimatedBool) {
      coin.move();
    }
    coin.display();
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

  // reset coins when all coins are collected
  resetCoins();

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

    if (recoilBool) {
      let target = createVector(mouseX, mouseY);
      let playerPos = createVector(player.x, player.y);
      let direction = playerPos.sub(target);
      player.recoil(direction);
    }
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

  for (let coin of coins) {
    if (
      !coin.destroyed &&
      !coin.consumed &&
      dist(coin.x, coin.y, player.x, player.y) <=
        player.size / 2 + coin.size / 2
    ) {
      player.collect();

      coin.consumed = true;

      if (coinAnimatedBool) {
        coin.velocity = -15;
        // generate a new coin
        setTimeout(function () {
          coin.destroyed = true;
          coin.consumed = false;
          coin.x = random(50, canvasWidth - 50);
          coin.y = random(50, canvasHeight - 50);
        }, 1000);
      } else {
        coin.destroyed = true;
        coin.consumed = false;
        coin.x = random(50, canvasWidth - 50);
        coin.y = random(50, canvasHeight - 50);
      }
    }
  }
}

function resetCoins() {
  let allConsumed = true;
  for (let coin of coins) {
    if (!coin.destroyed) {
      allConsumed = false;
    }
  }
  if (allConsumed) {
    for (let coin of coins) {
      coin.destroyed = false;
    }
  }
}

function warningDisplay() {
  warnColor.setAlpha(25 + 25 * sin(millis() / 300));
  fill(warnColor);
  rect(canvasWidth / 2, canvasHeight / 2, canvasWidth, canvasHeight);
}

function coinAnimatedEvent() {
  coinAnimatedBool = this.checked();
}

function screenShakeEvent() {
  screenShakeBool = this.checked();
}

function recoilEvent() {
  recoilBool = this.checked();
}

function warningEvent() {
  warningBool = this.checked();
}
