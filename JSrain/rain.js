//initiate canvas
let c = document.getElementById("rainCanvas");
let ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;

//dynamic canvas resize (mandatory)
window.addEventListener("resize", function (){
    c.width = window.innerWidth;
    c.height = window.innerHeight;
})

//any listeners can be set here.

//global variable, parameters

let nb_rain = 1000; //number of snowflakes
let fall_speed = 5; // speed
let rain_drops = []; //list of droplets
let drop_size = 10;
let drop_color = "0,0,255"; //rgb value of the color

// We create a class which will represent one rain Drop
class Drop {
    //parameters
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.coef = Math.random() * fall_speed
        this.speed = this.coef + fall_speed;
        this.size = this.coef / fall_speed * drop_size + drop_size;
        this.y = -10 * this.size;
        this.opacity = this.coef / fall_speed // this value is between 0 and 1, representing the depth of a drop (slow drop > far drop > less visible drop)
    }
    //function to draw one frame for one drop
    draw() {
        ctx.fillStyle = "rgba("+ drop_color +"," + this.coef+")"; // this.coef represents the opacity of the drop
        ctx.beginPath();
        //ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.rect(this.x, this.y, this.size, 10 * this.size);
        ctx.fill();
    }
    //function which will be called before each frame (thats where we update the position of one drop)
    update() {
        this.y += this.speed;
        this.draw();
    }
}


//we inittiate the list of droplets here
function FillRain() {
    for (let i = 0; i < nb_rain; i++) {
        rain_drops.push(new Drop());
    }
}
FillRain();


//this is where we are going to analyze each droplet
function HandleRainDrops() {
    for (let i = 0; i < nb_rain; i++) {
        rain_drops[i].update();
        if (rain_drops[i].y >= window.innerHeight) {
            rain_drops[i] = new Drop();
        }
        rain_drops[i].draw()
    }
}

//te animation loop
function Animate() {
    ctx.clearRect(0, 0, c.width, c.height);
    HandleRainDrops();
    requestAnimationFrame(Animate);
}

Animate();


