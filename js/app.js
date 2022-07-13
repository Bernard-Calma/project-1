// canvas references
// tutorial https://www.youtube.com/c/ChrisCourses
// viewport https://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas


const canvas = document.querySelector("canvas")

//set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



playerIcon = canvas.getContext("2d");

// add player on page
const addPlayerIcon = () => {
    shoeIcon = new Image();
    shoeIcon.src = "images/shoe_icon.png";
    shoeIcon.onload = () => {
        playerIcon.drawImage(shoeIcon,canvas.width/10,canvas.height/2)
    }
}


addPlayerIcon();







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
// //add obstacle to the game
// // background can move 

// // obstacle class
// // has x and y axis
// // can move
// // player will die if touched

// player = new Player();
// // console.log(Game.createPlayer)
// Game.addPlayer(player)
