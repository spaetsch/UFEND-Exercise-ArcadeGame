// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //Sets initial position, speed
    this.reset();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed *dt;

    //if the enemy goes off the screen, re-initialize with new speed and y-coord
    // set x-coord to offscreen left
    if (this.x > 500){
        this.reset();
        this.x = -50;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.reset = function(){

    var column = Math.floor(Math.random() * 4); //0-4, any column
    this.x = (column*171); 

    var row = Math.floor(Math.random() * 2); //0-2, three rows, offset by 1
    this.y = (83-25) + (row*83); 

    this.speed = 10 + Math.random()*200;


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
 
    // set to initial location 
    this.reset();
}

Player.prototype.update = function(dt) {
   //collision detection
   for (beetle in allEnemies){
     if(collisionDetect(this, allEnemies[beetle])){
        console.log("player x ", this.x);
        console.log("player y ", this.y);
        console.log("enemy x", allEnemies[beetle].x);
        console.log("enemy y", allEnemies[beetle].y);

        this.reset();

     }
    }
}

var collisionDetect = function(player, enemy){
    return !(enemy.x > player.x + 170 ||
            enemy.x +170 < player.x ||
            enemy.y > player.y+80 ||
            enemy.y+80 <player.y
        );
}


// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(allowedKeys){
    if (allowedKeys === 'left'){
        //if not in leftmost square, move left by one tile
        if (this.x > 50){
            this.x = this.x - 101;
        }
    }
    if (allowedKeys === 'right'){
        //if not in the rightmost square, move right by one tile
        if (this.x < 400){
            this.x = this.x + 101;
        } 
    }
    if (allowedKeys === 'up'){
        //if in the top row, move to initial position
        if (this.y < 80){
            this.reset();
        } else {
            //if not in the top row, move up one row
            this.y = this.y - 83;
        }
    }
    if (allowedKeys === 'down'){
        //if not in the bottom row, move down one row
        if (this.y < 300){
            this.y = this.y + 83;
        } 
    }
}

Player.prototype.reset = function(){
    //initial Player location
    this.x = 2 * 101;         //column 3
    this.y = (5 * 83) - 25 ;  //row 6
    this.speed = 1;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy;
var enemy2 = new Enemy;
var enemy3 = new Enemy;

var allEnemies=[enemy1];

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
