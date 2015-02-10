// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //bug origin - upper left stone square (0, 60)
    //randomize position max 500 -> x coord
    //randomize lane 0, 1, 2 -> y-coord

    var lane = Math.floor(Math.random() * 2);
    var position = Math.floor(Math.random() * 500);
    this.x = 0 + position; //incremental crawling to the right
    this.y = 60 + lane * 80; // one of the three lanes 0, 1, 2

    console.log("randomize enemy location");
    console.log("x =", this.x);
    console.log("y =", this.y);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-horn-girl.png';

    //initial location
   // this.x = 200;// +/- 100;
    //this.y = 380; //- 80;
    this.reset();
}

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(allowedKeys){
    if (allowedKeys === 'left'){
        if (this.x < 50){
            this.x=this.x;
        } else {
            this.x = this.x - 101;
        }
    }
    if (allowedKeys === 'right'){
        if (this.x > 400){
            this.x=this.x;
        } else {
        this.x = this.x + 101;
        }
    }
    if (allowedKeys === 'up'){
        if (this.y < 80){
            this.reset();
        } else {
        this.y = this.y - 83;
        }
    }
    if (allowedKeys === 'down'){
        if (this.y > 300){
            this.y =this.y;
        } else {
            this.y = this.y + 83;
        }
    }

}

Player.prototype.reset = function(){
     //initial location
    this.x = 200;
    this.y = 380; 
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy;
var enemy2 = new Enemy;
var enemy3 = new Enemy;

var allEnemies=[enemy1, enemy2, enemy3];


// Place the player object in a variable called player
var player = new Player;


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
