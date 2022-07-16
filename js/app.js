// canvas references
// tutorial https://www.youtube.com/c/ChrisCourses
// viewport https://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas
// scrolling image https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations


const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d");
canvas.width = 1000; // changed to fixed width
canvas.height = 800; // changed to fixed height

//player info
class Player {
    constructor() {
        this.speed = {
            x: 0,
            y: 0,
        }
        this.rotation = 6;
        const image = new Image();
        image.src = "./images/shoe_icon.png";
        image.onload = () => {
            const scale = 0.95
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 10,
                y: canvas.height / 2 - this.height / 2 // to move in middle
            }
        }
        
    }

    draw = () => {
        // context.fillStyle = "red";
        // context.fillRect(this.posX,this.posY,this.width,this.height)

        // context save and restore for rotating image
        context.save()

        context.translate(
            this.position.x + this.width / 2,
            this.position.y + this.height /  2
        )
        context.rotate(this.rotation)
        context.translate(
            -this.position.x - this.width / 2,
            -this.position.y - this.height/  2
        )
        context.drawImage(this.image, this.position.x,this.position.y,this.width,this.height)     
        context.restore()
    }
    update = () => {
        if (this.image) {
            this.draw()
            // changes every movement
            this.position.x += this.speed.x
            this.position.y += this.speed.y  
        }
    }
}

// feet class
class Feet extends Player{
    constructor() {
        super()
        this.speed = {
            x: 0, // -1 change after play button is pressed
            y: 0,
        }
        this.rotation = 0;
        const image = new Image();
        image.src = "./images/feet_icon.png";
        image.onload = () => {
            const scale = 1
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2, //Math.random() * canvas.width, - changed after play
                y: canvas.height - this.height // to move in middle
            }
        }
        
    }
}

const player = new Player();
const feets = [new Feet()]
// setup if keys are pressed
const keys = {
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
}

animate = () => {
    requestAnimationFrame(animate);
    context.fillStyle = "black"
    context.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    feets.forEach(feet => {
        feet.update()
        console.log(feet.position)
    })
    if (keys.ArrowUp.pressed && player.position.y >= 0) {
        player.speed.y = -7;
        player.rotation = 5
    } else if (keys.ArrowDown.pressed && player.position.y + player.height <= canvas.height) {
        player.speed.y = +7;
        player.rotation = -6
    } else {
        player.speed.y = 0;
        player.rotation = 6
    }
}

animate()

//press key listener
addEventListener("keydown", ({key}) => {
    // console.log(key)
    switch (key) {
        case "ArrowUp" :
            // console.log(key)
            keys.ArrowUp.pressed = true
            break
        case "ArrowDown" :
            // console.log(key)
            keys.ArrowDown.pressed = true
            break
    }
})

// release key listener
addEventListener("keyup", ({key}) => {
    // console.log(key)
    switch (key) {
        case "ArrowUp" :
            console.log(key)
            keys.ArrowUp.pressed = false
            break
        case "ArrowDown" :
            console.log(key)
            keys.ArrowDown.pressed = false
            break
    }
})





//feet
// const feet = new Feet();



// //grab canvas context



// // canvas backround
// const background = {
//     name: "Background",
//     imgSrc : "./images/background.jpeg",
//     posX : 0,
//     posY : 0,
// }

// //variables
// const startPlayerPosX = canvas.width/10
// const startPlayerPosY = canvas.height/2



// class Game {
//     constructor(player) {
//         this.player = "";
//     }
//     //create player function
//     createPlayer = () => {
//         this.player = new Player();
//         console.log("Player is created.")
//     }
    
//     // add image to screen
//     addImage = (object,posX,posY) => {
//         // console.log("inside addImage",object)
//         object.posX = posX;
//         object.posY = posY;
//         const image = new Image();
//         image.src = object.imgSrc;
//         image.onload = () => {
//             context.drawImage(image,object.posX,object.posY)
//         }
//         return image
//         console.log(object.name,"is added to the screen")
//     }
//     moveImage = (image,direction) => {
//         let oldPosX = image.posX;
//         let oldPosY = image.posY;
//         if (direction === "up") {
//             image.posY -= 10;
//         } else if (direction === "down") {
//             image.posY += 10;
//         } else if (direction === "left") {
//             image.posX -= 10;
//         }
//     //     setTimeout(() => {
//     //     context.clearRect(0,0,canvas.width,canvas.height)
//     //     this.addImage(image,image.posX,image.posY)
//     // },1000)

//     }
// }

// //starting x 
// const startingX = canvas.width/10;
// const startingY = canvas.height/2;
// const shoeIconPath = "images/shoe_icon.png";
// let positionPlayerX = 0;
// let positionPlayerY = 0;

// // add player on page
// // const addPlayerIcon = (posX,posY) => {
// //     shoeIcon = new Image();
// //     shoeIcon.src = shoeIconPath;
// //     shoeIcon.onload = () => {
// //         playerIcon.drawImage(shoeIcon,posX,posY)
// //     }
// //     positionPlayerX = posX
// //     positionPlayerY = posY
// // }

// // addPlayerIcon(startingX,startingY);

// //move player function
// // player move up
// const movePlayerUp = (player) => {
//     let positionY = player.posY
//     positionPlayerY = oldY - 10;
//     imgNew = new Image();
//     imgNew.src = shoeIconPath;
//     imgNew.onload = () => {
//         playerIcon.clearRect(0, 0, canvas.width, canvas.height);
//         playerIcon.drawImage(imgNew,oldX,positionPlayerY)
//     }
// }
// // player move down
// const movePlayerDown = (posX,posY) => {
//     let oldX = posX;
//     let oldY = posY;
//     positionPlayerY = oldY + 10;
//     imgNew = new Image();
//     imgNew.src = shoeIconPath;
//     imgNew.onload = () => {
//         playerIcon.clearRect(0, 0, canvas.width, canvas.height);
//         playerIcon.drawImage(imgNew,oldX,positionPlayerY)
//     }
// }



// //move playerIcon with keyboard up and down
// document.addEventListener("keyup",(e)=>{
//     if (e.key === "ArrowUp") {
//         // console.log(`Key ${e.key} \r\n Key code value: ${e.code}`)
//         // console.log(playerIcon)
//         console.log("Up")
//         movePlayerUp(positionPlayerX,positionPlayerY);
//     } else if (e.key === "ArrowDown") {
//         // console.log(`Key ${e.key} \r\n Key code value: ${e.code}`)
//         console.log("Down")
//         movePlayerDown(positionPlayerX,positionPlayerY);
//     }
// })

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



// //create player
// const game = new Game()

// game.createPlayer()
// // console.log(game.player)
// const backgroundImage = game.addImage(background,0,0)

// setTimeout( () => {
// const playerImage = game.addImage(game.player,startPlayerPosX,startPlayerPosY)
// })
// console.log(game.player)
// game.moveImage(game.player,"up")
// console.log(game.player)
// console.log(context)



// let x = 0;
// //animate
// const animate = () => {
//     requestAnimationFrame(animate);
//     // context.clearRect(0,0,canvas.width,canvas.height)
//     const image = new Image();
//         image.src = "./images/background.jpeg";
//         image.onload = () => {
//             context = canvas.getContext("2d");
//             context.drawImage(image,x,0);
//         }
//     x-=5
// }

// // animate()
// // 
// const image = new Image();
//         image.src = "./images/background.jpeg";
//         image.onload = () => {
//             context = canvas.getContext("2d");
//             context.drawImage(image,x,0);
//         }
