class Hero {
    constructor() {
            //Initialise hero position
            this.x = 200; //Note (0,0) is top left of canvas
            this.y = 400;
            //Current hero character selection
            this.sprite = 'images/char-pink-girl.png'

        }
        //Renders (think flipbook) based on coordinates
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //Hero keyboard movement + Check wall collision here
    handleInput(input) {
            switch (input) {
                case 'up':
                    if (this.y > 70) {
                        this.y -= 80
                    };
                    break;
                case 'down':
                    if (this.y < 400) {
                        this.y += 80
                    };
                    break;
                case 'left':
                    if (this.x > 0) {
                        this.x -= 100
                    };
                    break;
                case 'right':
                    if (this.x < 400) {
                        this.x += 100
                    };
                    break;
            }

        }
        //Check enemy collision
    update() {
        for (let enemy of allEnemies) {
            //Losing condiiton: If hero coordinates collides with enemy
            if (this.y === enemy.y && (enemy.x + 50 > this.x && enemy.x < this.x + 50)) {
                alert('Try again!');
                this.x = 200;
                this.y = 400;
            }
        }
        //Winning condition: If hero reaches water zone
        if (this.y < 70) {
            alert('Well Done!');
            this.x = 200;
            this.y = 400;
        }
    }
}

var Enemy = function(x, y) {

    this.x = x;
    this.y = y;

    this.sprite = 'images/enemy-bug.png';
};

// Update bug's position
Enemy.prototype.update = function(dt) {

    //If bug hasn't reached the end of screen, move forward
    if (this.x < 500) {
        //Each bug moves at different speeds
        this.x += (Math.random() * 600) * dt;
    }
    //Bug has reached the end of screen
    //Reset bug position to left of screen
    else {
        this.x = -(Math.random() * 300);
    }

};

// Draws bugs on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Initialise character objects
const player = new Hero();
//Bugs appear in random order based on x coordinate
const bug1 = new Enemy(-(Math.random() * 200), 80);
const bug2 = new Enemy(-(Math.random() * 600), 160);
const bug3 = new Enemy(-(Math.random() * 500), 240);
//Enemy container
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3);

//Keyboard input to enable hero movement
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Load characters and background images
Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/char-boy.png',
    'images/char-pink-girl.png'
]);
