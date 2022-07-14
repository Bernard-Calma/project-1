// canvas references
// tutorial https://www.youtube.com/c/ChrisCourses
// viewport https://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas
// scrolling image https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations


const canvas = document.querySelector("canvas")

//set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//grab canvas context
const context = canvas.getContext("2d");


// canvas backround
const background = {
    name: "Background",
    imgSrc : "./images/background.jpeg",
    posX : 0,
    posY : 0,
}

//variables
const startPlayerPosX = canvas.width/10
const startPlayerPosY = canvas.height/2

//player info
class Player {
    constructor() {
        this.name = "Floatshoe";
        this.imgSrc = "images/shoe_icon.png";
        this.posX = 0;
        this.posY = 0;
    }
}

class Game {
    constructor(player) {
        this.player = "";
    }
    //create player function
    createPlayer = () => {
        this.player = new Player();
        console.log("Player is created.")
    }
    
    // add image to screen
    addImage = (object,posX,posY) => {
        // console.log("inside addImage",object)
        object.posX = posX;
        object.posY = posY;
        const image = new Image();
        image.src = object.imgSrc;
        image.onload = () => {
            context.drawImage(image,object.posX,object.posY)
        }
        console.log(object.name,"is added to the screen")
    }
}

//starting x 
const startingX = canvas.width/10;
const startingY = canvas.height/2;
const shoeIconPath = "images/shoe_icon.png";
let positionPlayerX = 0;
let positionPlayerY = 0;

// add player on page
// const addPlayerIcon = (posX,posY) => {
//     shoeIcon = new Image();
//     shoeIcon.src = shoeIconPath;
//     shoeIcon.onload = () => {
//         playerIcon.drawImage(shoeIcon,posX,posY)
//     }
//     positionPlayerX = posX
//     positionPlayerY = posY
// }

// addPlayerIcon(startingX,startingY);

//move player function
// player move up
const movePlayerUp = (player) => {
    let positionY = player.posY
    positionPlayerY = oldY - 10;
    imgNew = new Image();
    imgNew.src = shoeIconPath;
    imgNew.onload = () => {
        playerIcon.clearRect(0, 0, canvas.width, canvas.height);
        playerIcon.drawImage(imgNew,oldX,positionPlayerY)
    }
}
// player move down
const movePlayerDown = (posX,posY) => {
    let oldX = posX;
    let oldY = posY;
    positionPlayerY = oldY + 10;
    imgNew = new Image();
    imgNew.src = shoeIconPath;
    imgNew.onload = () => {
        playerIcon.clearRect(0, 0, canvas.width, canvas.height);
        playerIcon.drawImage(imgNew,oldX,positionPlayerY)
    }
}



//move playerIcon with keyboard up and down
document.addEventListener("keyup",(e)=>{
    if (e.key === "ArrowUp") {
        // console.log(`Key ${e.key} \r\n Key code value: ${e.code}`)
        // console.log(playerIcon)
        console.log("Up")
        movePlayerUp(positionPlayerX,positionPlayerY);
    } else if (e.key === "ArrowDown") {
        // console.log(`Key ${e.key} \r\n Key code value: ${e.code}`)
        console.log("Down")
        movePlayerDown(positionPlayerX,positionPlayerY);
    }
})

// // player class
// class Player {
//     // has x and y axis
//     constructor (xPosition, yPosition, imgSource) {
//         this.xPosition = 0;
//         this.yPosition = 0;
//         this.imgSource = "images/shoe_icon.png"; 
//     }
//     // can go up

//     // can go down
// }

// // map class
//  const Game = {
//     createPlayer: (player) => {
//         player = new Player()
//     },
//     addPlayer: (player) => {
//         playerImage = new Image();
//         playerImage = player.imgSource;
//         playerImage.onload = () => {
//             context.drawImage(playerImage,0,0);
//         }
//     },
//  }
// //add player to game
// 
// // background can move 

// // obstacle class
// // has x and y axis
// // can move
// // player will die if touched

// player = new Player();
// // console.log(Game.createPlayer)
// Game.addPlayer(player)



//create player
const game = new Game()

game.createPlayer()
console.log(game.player)
const backgroundImage = game.addImage(background,0,0)
setTimeout( () => {
const playerImage = game.addImage(game.player,startPlayerPosX,startPlayerPosY)
})
