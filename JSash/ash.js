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
let size = 10; //maximum size (do not go under 1)
let nb_particles = 100; //nb max of particles
let nb_particles_fire = 50;
let particle_spawn_x = 0;
let particle_spawn_y = c.height / 2; //coordiantes of the particle spawn
let speed = 1
//global variables
let particles = [];
let fire = [];


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
        //ash
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        ctx.fillStyle = "hsla(" + this.color +"," + "100%," + "50%," + this.opacity + ")";
        ctx.fill();
        //glowing effect
        ctx.beginPath();
        ctx.arc(this.x, this.y,  3* this.width, 0, Math.PI * 2);
        let rdg = ctx.createRadialGradient(this.x, this.y, 1, this.x, this.y, 3 * this.width);
        rdg.addColorStop(0, "hsla(" + this.color +"," + "100%," + "50%," + this.opacity + ")");
        rdg.addColorStop(1, "transparent");
        ctx.fillStyle = rdg;
        ctx.fill();
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

class FireParticle {
    constructor() {
        this.x = 0;
        this.y = c.height * Math.random();
        this.opacity = Math.random() + 0.1;
        this.color = 11;
        this.width =10 * Math.random() * size + 3;
        this.speed = Math.random() * 0.01 + 0.005;
        this.direction = Math.random() * 2 - 1
    }
    draw () {
        ctx.beginPath();
        ctx.arc(this.x, this.y,  this.width, 0, Math.PI * 2);
        let rdg = ctx.createRadialGradient(this.x, this.y, 1, this.x, this.y, this.width);
        rdg.addColorStop(0, "hsla(" + this.color +"," + "100%," + "50%," + this.opacity + ")");
        rdg.addColorStop(1, "transparent");
        ctx.fillStyle = rdg;
        ctx.fill();
    }
    update () {
        this.x += 0.2;
        this.y += this.direction;
        this.opacity -= this.speed;
    }
}

function createAshes() {
    for (let i = 0; i < nb_particles; i++) {
        particles.push(new AshParticle());
    }
}
createAshes();

function createFireParticles() {
    for (let k = 0; k < nb_particles_fire; k++) {
        fire.push(new FireParticle());
    }
}

createFireParticles();

function handleParticles() {
    for (let m = 0; m < nb_particles_fire; m++) {
        fire[m].draw()
        if (fire[m].opacity <= 0.05) {
            fire.splice(m, 1);
            fire.push(new FireParticle());
        }
        fire[m].update()
    }
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
