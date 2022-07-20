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
const menuUI = document.querySelector(".menu-ui");
const menuTop = document.querySelector(".menu-top");
const menuMain = document.querySelector(".menu-main");
const buttons = document.querySelector(".buttons")
const btnPlay = document.querySelector("#btn-play");
const btnHowTo = document.querySelector("#btn-howto")
menuUI.style.position = "absolute";
menuUI.style.top = "100px";
menuUI.style.left = "300px";
menuUI.style.width = `${canvas.width/2}px`
menuUI.style.height = `${canvas.height/2}px`


const menuPosition = {
    x: canvas.width / 8,
    y: canvas.height / 8
}
const menuDims = {
    width: canvas.width * 3/4 ,
    height: canvas.height * 3/4 
}

// variable for animation to stop and start
let animation



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
            x : 0,
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
            x: 0, // -1 change after play button is pressed
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

animate = () => {
    animation = requestAnimationFrame(animate);
    context.fillStyle = "black"
    context.fillRect(0,0,canvas.width,canvas.height)
    
    if (keys.ArrowUp.pressed && player.position.y >= 0) {
        player.speed.y = -5;
        player.rotation = 5
    } else if (player.position.y + player.height <= canvas.height) {
        // if play button is clicked
        if (btnPlay.innerText === "Restart") {
            player.speed.y = 2;
        } else if (btnPlay.innerText === "Play") {
            player.speed.y = 0;
        }
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
                    cancelAnimationFrame(animation)
                    menuUI.style.display = "flex";
                    // location.reload()
                    // alert("Game Over")
                
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
                    cancelAnimationFrame(animation)
                    menuUI.style.display = "flex";
                    // location.reload()
                    // alert("Game Over")
            }
        }

    })
}





canvas.addEventListener("mousedown",() => {
        keys.ArrowUp.pressed = true 
        // console.log("Clicked", player.speed.y)  
})
canvas.addEventListener("mouseup",() => {
        keys.ArrowUp.pressed = false 
        // console.log("Unclicked", player.speed.y)

})
console.log(canvas)
//touch event for mobile
canvas.addEventListener("touchstart",() => { 
    keys.ArrowUp.pressed = true 
    // console.log("Unclicked", player.speed.y)

})
canvas.addEventListener("touchend",() => {
    keys.ArrowUp.pressed = false 
    // console.log("Unclicked", player.speed.y)

})

// play button event listener
btnPlay.addEventListener("click",()=>{
    // console.log(btnPlay.innerText," is clicked")
    menuUI.style.display = "none";
    if (btnPlay.innerText === "Restart") {
        location.reload()
    } else {
        // console.log(btnPlay.innerText," is clicked")
        player.speed.y = 2
        background.speed.x = -2
        feets.forEach(feet => {
            feet.speed.x = -2;
        });      
    }
    btnPlay.innerText = "Restart"
})

// How To Play button event listener
btnHowTo.addEventListener("click",(e)=>{
    console.log(e.target.innerText," is clicked")
    location.reload()
})



// create background objetc
const background = new Background();
// create player object
const player = new Player();

//create feet obstacle objects
// array for holding each feet obstacles
const feets = [];
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

// setup if keys are pressed
const keys = {
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
}

//amimate background and feet objects
animate()