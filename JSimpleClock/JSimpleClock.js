let c = document.getElementById("clocktest");
let ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;

window.addEventListener("resize", function (){
    c.width = window.innerWidth;
    c.height = window.innerHeight;

})

ctx.beginPath();
ctx.fillStyle = 'blue';

ctx.arc(0, 0, 100, 0, Math.PI * 2);
ctx.fill();



