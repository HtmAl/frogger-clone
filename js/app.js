// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set enemy's initial x/y coordinates on the screen and the speed at which the enemy will move.
    this.x = this.randomizeX();
    this.y = this.randomizeY();
    this.speed = this.randomizeSpeed();

    // Right edge of screen, before enemy moves off the screen.
    this.yMax = 500;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Enemy went off the screen... Reset its location and speed randomly along the left edge of the game area.
    if (this.x >= this.yMax) {
        this.x = 0;
        this.y = this.randomizeY();
        this.speed = this.randomizeSpeed();
    }

    this.render();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.randomizeX = function() {
    // For the x coordinate, we can randomize the initial location up to approximately half the gaming area.
    return Math.floor((Math.random() * 250) + 1);
};

Enemy.prototype.randomizeY = function() {
    // The 3 enemy lanes must have a proper y coordinate to render to.
    var randomY;
    var lane1y = 62;
    var lane2y = 145;
    var lane3y = 228;

    // For the y coordinate, start off by figuring out which lane we should render the enemy in. Valid lane values are between 1 and 3.
    var randomLane = Math.floor((Math.random() * 3) + 1);

    // Now that we know which lane the enemy is to appear in, map that random lane to a proper, preset y coordinate.
    switch(randomLane) {
        case 1:
            randomY = lane1y;
            break;
        case 2:
            randomY = lane2y;
            break;
        case 3:
            randomY = lane3y;
            break;
        default: // Just in case... :)
            randomY = lane1y;
            break;
    }

    return randomY;
};

Enemy.prototype.randomizeSpeed = function() {
    // Maximum speed arbitrarily set a minimum of 100 so not to be too slow and a maximum of 600 so not to be too fast.
    return Math.floor((Math.random() * 600) + 100);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';

    // Player moves "square by square" on the screen.
    // These increment values will keep our player centered in each square.
    this.xIncrement = 100;
    this.yIncrement = 82;

    // x/y boundaries within which our player can move.
    this.xMax = 400;
    this.yMax = 410;

    // Player is initially located in bottom-middle square.
    // This location corresponds to the below x/y coordinates in our game space.
    this.xOrigin = 200;
    this.yOrigin = 410;
    this.x = this.xOrigin;
    this.y = this.yOrigin;
};

// Update the player's position, required method for game
Player.prototype.update = function(key) {
    switch(key) {
        case 'left':
            if (this.x - this.xIncrement >= 0)
                this.x -= this.xIncrement;
            break;
        case 'right':
            if (this.x + this.xIncrement <= this.xMax)
                this.x += this.xIncrement;
            break;
        case 'up':
            if (this.y - this.yIncrement > 0)
                this.y -= this.yIncrement;

            // "WINNING!"... Player has reached top of the scren.
            // Return player to original coordinates to start another game automatically.
            else if (this.y - this.yIncrement === 0) {
                this.x = this.xOrigin;
                this.y = this.yOrigin;
            }
            break;
        case 'down':
            if (this.y + this.yIncrement <= this.yMax)
                this.y += this.yIncrement;
            break;
        default:
            break;
    }

    this.render();
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    this.update(key);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = randomizeEnemies();
var player = new Player();

function randomizeEnemies() {
    var enemies = [];

    for (var i=1;i<=3;i++) {
        enemies[i] = new Enemy();
    }

    return enemies;
}

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