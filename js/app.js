// Enemies our player must avoid
var Enemy = function(dist_x, dist_y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.dist_x = dist_x;
    this.dist_y = dist_y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.dist_x += this.speed * dt;

    // when enemy goes out of canvas, bring the enemies to initial position.
    if (this.dist_x > 510) {
        this.dist_x = -60;
        this.speed = 100 + Math.floor(Math.random() * 225);
    }

    // Collision detection of enemies and players.
    if (player.dist_x < this.dist_x + 76 &&
        player.dist_x + 76 > this.dist_x &&
        player.dist_y < this.dist_y + 60 &&
        60 + player.dist_y > this.dist_y) {
            alert('stop');
        player.dist_x = 200;//202;
        player.dist_y = 380;//405;

        //If the player loses ,flash a yellow background.
        document.querySelector('body').style.backgroundColor = 'yellow';
        setTimeout(function () {
            document.querySelector('body').style.backgroundColor = 'white';
        }, 200);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.dist_x, this.dist_y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(dist_x, dist_y, speed) {
    this.dist_x = dist_x;
    this.dist_y = dist_y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // this code doesn't allow player movement beyond canvas.
    if (this.dist_y > 380) {
        this.dist_y = 380;
    }
    if (this.dist_x > 400) {
        this.dist_x = 400;
    }
    if (this.dist_x < 0) {
        this.dist_x = 0;
    }

    // If the player crossses sucessfully then bring him
    //back to initial position
    if (this.dist_y < 0) {
        this.dist_x = 200;
        this.dist_y = 380;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.dist_x, this.dist_y);
};

Player.prototype.handleInput = function(keyDown) {
    //code for player movement
    switch (keyDown) {
        case 'up':
            this.dist_y -= this.speed + 30;
            break;
        case 'down':
            this.dist_y += this.speed + 30;
            break;
        case 'left':
            this.dist_x -= this.speed + 50;
            break;
        case 'right':
            this.dist_x += this.speed + 50;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// initial y axis position for enemy creation
var enemyDefaultPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

enemyDefaultPosition.forEach(function(y) {
    enemy = new Enemy(0, y, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});