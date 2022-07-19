// canvas references
// tutorial https://www.youtube.com/c/ChrisCourses
// viewport https://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas
// scrolling image https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations


const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d");
canvas.width = 700; // changed to fixed width
canvas.height = 600; // changed to fixed height

let positionX = 0 // position for each feets

//menu variables
const menuPosition = {
    x: canvas.width / 8,
    y: canvas.height / 8
}
const menuDims = {
    width: canvas.width * 3/4 ,
    height: canvas.height * 3/4 
}

const feets = [];

//player info
class Player {
    constructor() {
        // added to catch error
        this.position = {
            x: canvas.width / 10,
            y: canvas.height / 2 - this.height / 2 // to move in middle
        }
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

//background class
class Background extends Player {
    constructor(position) {
        super()
        this.speed = {
            x : -2,
            y : 0
        }
        this.rotation = 0;
        const image = new Image();
        image.src = "./images/background.jpeg";
        image.onload = () => {
            this.image = image
            this.width = image.width
            this.height = canvas.height
            this.position = {
                x: 0,
                y: 0 
            }
        }  
    }
    draw = () => {
        context.drawImage(this.image, this.position.x,this.position.y,this.width,this.height)     
    }
    update = () => {
        if (this.image != undefined) {
            this.draw()
            // changes every movement
            this.position.x += this.speed.x
            this.position.y += this.speed.y  
            if (background.position.x <= -1300){
                    background.position.x = -100
                    // console.log(background.position.x)
                }
        } 
        // //show background from position
        // if (background.position.x <= -1300){
        //     background.position.x = 0
        //     console.log(background.position.x)
        // }
        // console.log(this.image)
        
    }
}

// feet class
// removed extend due to issue when spawn
class Feet{
    constructor(positionX = 0){
        this.position = {
            x: canvas.width / 2,
            y: canvas.height / 2 - this.height / 2 // to move in middle
        }
        this.speed = {
            x: -2, // -1 change after play button is pressed
            y: 0,
        }
        this.rotation = 0.0001; //changed from 0 to catch error for collision
        const image = new Image();
        image.src = "./images/feet_icon.png";
        image.onload = () => {
            const scale = 1
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            let positionY = selectFromTwoNumbers(0,canvas.height-240)
            // set position and rotation
            //if position is top rotate image if position is bottom don't rotate.
            if (positionY===0) {
                positionY = 0
                this.rotation = 3.15
            } else {
                positionY = canvas.height-240
                this.rotation = 0
            }
            this.position = {
                x: positionX,
                y: positionY
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

//make a FIFO for feets NOT BEING USED
class FeetsQueue {
    constructor() {
        this.feets = [];
    }

    enqueue = (item) => {
        this.items.push(item);
    }

    dequeue = () => {
        return this.item.shift();
    }

    peek() {
        if (this.item[0]) null;
        return this.item[0];
    }

    isEmpty() {
        return this.getSize() === 0;
    }
}


// function to select pick from two numbers
const selectFromTwoNumbers = (firstNum , secondNum) => {
    randomTwoNumbers = Math.random()
    if (randomTwoNumbers <= 0.5) {
        randomTwoNumbers = firstNum
    } else if (randomTwoNumbers > 0.5) {
        randomTwoNumbers = secondNum
    }
    return randomTwoNumbers
}


// make an array of feet to be able to create one easily
for (i = 0; i <50; i++) {
    
    //x-axis distance for each feets
    // console.log("Feets Array Length",feets.length)
    if (feets.length === 0) {
        // console.log("Empty Array")
        positionX = canvas.width / 2
        // console.log("POsitionX",positionX)
    } else {
        // console.log(feets)
        // add a fix distance for each feet
        positionX = positionX + 250
        // console.log("POsitionX",positionX)
    }

    feets.push(new Feet(positionX))
    
    
    
}

animate = () => {
    requestAnimationFrame(animate);
    context.fillStyle = "black"
    context.fillRect(0,0,canvas.width,canvas.height)
    
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
    background.update()
    player.update()
    
    feets.forEach(feet => {
        feet.update()
        // console.log("Player X", player.position.x)
        //     console.log("Feet X",feets[0].position.x)
        //     console.log("Player Y", player.position.y)
        //     console.log("Feet Y",feets[0].position.y)

        ///// COLLISION CODE ******* ///////
        // For feet on bottom screen
        // Colission for first feet test
        // console.log(feets[0].rotation)
        // added fix number to adjust collision
        if (feet.rotation === 0) {
            // top right corner of player image     top left side of feet image 
            // console.log("Feet 1 Y Position",feets[0].position.y)
            if(player.position.x + player.width - 17 >= feet.position.x &&
         // lower left corner of player image    Top left corner of feet image
                player.position.y + 40 >= feet.position.y&&
               // add && for player already passed by feet
                // top right corner of player image       top right side of feet image
               player.position.x - 5 <=  feet.position.x + feet.width
                ) {
                    // console.log("Player X", player.position.x + player.width, "Feet 1 X", feet.position.x)
                    // console.log(" Player Y", player.position.y, " Feet 1 Y",feet.position.y)
                    location.reload()
                    alert("Game Over")
                
            }
        }

          // For feet on bottom screen
          if (feet.rotation === 3.15) {
            // top right corner of player image     top left side of feet image 
            // console.log("Feet 1 Y Position",feet.position.y)
            if(player.position.x + player.width - 10>= feet.position.x &&
         // lower left corner of player image    bottom left corner of feet image
                player.position.y + 25 <= feet.position.y + feet.height - 5 &&
                // add && for player already passed by feet
                 // top right corner of player image       top right side of feet image
                player.position.x + player.width <=  feet.position.x + feet.width + 30){
                    // console.log("Player X", player.position.x + player.width, "Feet 1 X", feet.position.x)
                    // console.log(" Player Y", player.position.y, " Feet 1 Y",feet.position.y)
                    location.reload()
                    alert("Game Over")
            }
        }

    })

    
    context.beginPath();
    context.lineWidth = "6"
    context.strokeStyle = "darkblue"
    context.rect(canvas.width/8, canvas.height/8, canvas.width * 3/4 , canvas.height * 3/4 )
    context.stroke();
    context.closePath();

    context.fillStyle = ("white");
    context.fillRect(menuPosition.x, menuPosition.y, menuDims.width, menuDims.height )

}


const background = new Background();
const player = new Player();
// setup if keys are pressed
const keys = {
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
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
            // console.log(key)
            keys.ArrowUp.pressed = false
            break
        case "ArrowDown" :
            // console.log(key)
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
