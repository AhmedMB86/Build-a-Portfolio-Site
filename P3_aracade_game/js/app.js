let PointCount = 0;

function youWin(){
    PointCount++;
    if (PointCount >=5){
        alert('Congratulations You Won The game') ;
        PointCount =0;
    } else{
        alert(`Well done! You Win your score (${PointCount}) Points
         note: you need more ${5-PointCount} Points to Win the Game`) ;
    }

}


function gameOver(){
    PointCount--
     if ( PointCount < (1-4)){
        alert('Game Over You Lose The game') ;
        PointCount =0;
    } else{
        alert (`You Lose One Piont Your score (${PointCount})  Points
        note: you need 5 Points to Win the Game`);
     }


}
  //Reset player to beginning position
  Object.prototype.reset = function() {
    player.x = 200;
    player.y = 400;
    gameOver();
  };

// Enemies our player must avoid

var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
  
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // The image/sprite for enemies
   
    //
    this.sprite = 'images/enemy-bug.png';
  
    //x and y coordinates and movement speed
    this.x = x;
    this.y = y;
  
    
    this.speed = Math.floor((Math.random() * 200) + (Math.random() * 150) + 100);
  };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x <= 550){
        this.x += this.speed * dt;
      }else{
        this.x = -2;
      }
      if (player.x >= this.x - 30  && player.x <= this.x + 30
        && player.y >= this.y - 30 && player.y <= this.y + 30) {
      this.reset();
    if (player.x >= this.x - 30
      && player.x <= this.x + 30
      && player.y >= this.y - 30
      && player.y <= this.y + 30) {
         
        
    }
  };
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function() {
    // What sprite to use
    this.sprite = 'images/char-boy.png';
    // Initial x location
    this.x = 200;
    // Initial y location
    this.y = 400;

    
};



Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update =  function(){
    if(this.y < 25){

        
        
      }
}
Player.prototype.handleInput = function(keys) {
    if (this.y < 50){
        this.x = 200;
        this.y = 400;
       youWin();
    } else {
        if (keys === 'up' && this.y>10) {
            this.y -= 90;
        } else if (keys === 'down' && this.y<400) {
            this.y += 90;
        } else if (keys === 'left' && this.x>100) {
            this.x -= 95;
        } else if (keys === 'right' && this.x<350) {
            this.x += 95;
        }
        
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



function checkCollisions(player,allEnemies){
    for (var i = 0; i < allEnemies.length; i++) {
    if (allEnemies[i].x < player.x + 50 
        && allEnemies[i].x + 50 > player.x 
        && allEnemies[i].y < player.y + 50 
        && allEnemies[i].y + 50 > player.y) {
      player.x = 200;
      player.y = 400;
     
    }
  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];

(function addEnemies () {
    allEnemies.push(new Enemy(-2, 60));
    allEnemies.push(new Enemy(-2, 100));
    allEnemies.push(new Enemy(-2,150));
    allEnemies.push(new Enemy(-2,220));
  }());
// Place the player object in a variable called player
let player = new Player();


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


 