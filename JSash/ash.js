let c = document.getElementById("ashCanvas");
let ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;

//dynamic canvas resize (mandatory)
window.addEventListener("resize", function (){
    c.width = window.innerWidth;
    c.height = window.innerHeight;
})

//ctx.rotate(45 * Math.PI / 180);


ctx.setTransform(1, 0, 0, 1, 0, 0);

//parameters
let size = 20; //maximum size (do not go under 1)
let nb_particles = 100; //nb max of particles
let particle_spawn_x = 0;
let particle_spawn_y = c.height / 2; //coordiantes of the particle spawn
let speed = 1
//global variables
let particles = [];


class AshParticle {
    constructor() {
        //we start by randomizing the shape of the ash with random parameters
        this.width = Math.random() * size + 3;
        this.height = Math.random() * size + 3;
        //we define the position here
        this.x = particle_spawn_x + Math.random() * particle_spawn_x - 50
        this.y = particle_spawn_y + Math.random() * particle_spawn_y - 50
        // color and opacity goes here
        this.opacity = Math.random() * 0.5 + 0.5;
        this.opacity_dec = Math.random() * 0.01 + 0.001;
        this.isGlow =  Math.random() < 0.5; //if true glow must increase
        this.color = Math.random() * 25 + 20;
        //TODO set the color glow
        this.speed = Math.random() * speed + speed;

        //for math calculations
        this.direction = Math.random() * 4 - 2
        this.z = 0;
    }
    draw() {
        let width = this.width / 3;
        let height = this.height / 3;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y); // 0 0
        ctx.lineTo(this.x + width, this.y - height); // + 1w - 1h
        ctx.lineTo(this.x + 2 * width, this.y - height); // + 2w - 1h
        ctx.lineTo(this.x + 3 * width, this.y); // + 3w - 0
        ctx.lineTo(this.x + 3 * width, this.y + height); // + 3w + 1h
        ctx.lineTo(this.x + 2 * width, this.y + 2 * height); // + 2w + 2h
        ctx.lineTo(this.x + width, this.y + 2 * height); // + 1w + 2h
        ctx.lineTo(this.x, this.y + height); // + 0w + 1h
        ctx.fillStyle = "hsla(" + this.color +"," + "100%," + "50%," + this.opacity + ")";
        ctx.fill();
        //glowing effect


    }
    update() {
        if (this.isGlow) {
            this.color += 0.1;
            if (this.color >= 45) {
                this.isGlow = false;
            }
        }
        else {
            this.color-= 0.1;
            if (this.color <= 20) {
                this.isGlow = true;
            }
        }
        this.x += this.speed;
        this.y += this.direction + Math.cos(this.z) * this.opacity_dec * 100;
        this.z+= this.opacity_dec * 10;
        //this.speed -= 0.05;
        this.opacity -= this.opacity_dec;
    }
}

function createAshes() {
    for (let i = 0; i < nb_particles; i++) {
        particles.push(new AshParticle());
    }
}
createAshes();

function handleParticles() {
    for (let j = 0; j < nb_particles; j++) {
        particles[j].update();
        if (particles[j].opacity <= 0.05) {
            particles.splice(j, 1);
            particles.push(new AshParticle());

        }
        particles[j].draw();

    }
}
function Animate() {
    ctx.clearRect(0, 0, c.width, c.height);
    //handle particles here
    handleParticles()
    requestAnimationFrame(Animate);
}

Animate();