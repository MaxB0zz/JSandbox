//init (mandatory)
let c = document.getElementById("fwCanvas");
let ctx = c.getContext("2d");

c.height = window.innerHeight;
c.width = window.innerWidth;

window.addEventListener("resize", function (e) {
    c.height = window.innerHeight;
    c.width = window.innerWidth;
})

//parameters
let nb_particles_max = 100;
let size_max = 100;
//globa variables

//particles
class fireball {
    constructor(size, color, x, y, dx, dy) {
        this.size = size;
        this.color = color
        this.x =x;
        this.y = y;
        this.dx =dx;
        this.dy =dy;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.size--;
    }
}

class FireWork {
    constructor(x,y) {
        this.color = "hsla(" + Math.random() * 360 + ",100%, 50%, 1)";
        this.nb = 10;//Math.random() * nb_particles_max;
        this.size = size_max;
        this.particles = [];
        this.x = x;
        this.y = y;
        this.isAlive = true;
        this.fill_particles();
    }
    fill_particles() {
        for (let i = 0; i < this.nb; i ++) {
            let anlge_pi =  i * Math.PI * 2 / this.nb
            let dx = 1 * Math.cos(anlge_pi);
            let dy = 1 * Math.sin(anlge_pi);
            this.particles.push(new fireball(10, this.color, this.x, this.y, dx, dy));
        }
    }
    handle_particles = () => {
        for (let i = 0; i < this.nb; i ++) {
            this.particles[i].update();
            if (this.particles[i].size === 0)
                this.isAlive = false;
            this.particles[i].draw();
        }
    }
    Animate() {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, 0, c.width, c.height);
        for (let i = 0; i < this.nb; i ++) {
            this.particles[i].update();
            if (this.particles[i].size === 0)
                this.isAlive = false;
            this.particles[i].draw();
        }
        if (this.isAlive)
            requestAnimationFrame(this.Animate);
    }
}

function handle_p(fw) {
    for (let i = 0; i < fw.nb; i ++) {
        fw.particles[i].update();
        if (fw.particles[i].size === 0)
            fw.isAlive = false;
        fw.particles[i].draw();
    }
}

c.addEventListener("click", function (e) {
    let fw = new FireWork(e.x, e.y)
    fw.Animate();
})