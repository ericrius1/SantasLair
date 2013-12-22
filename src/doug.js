var c = 0,
    clr = 16777215;

        
var canvas = document.getElementsByTagName('canvas')[0],
    ctx = canvas.getContext('2d')
function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
} 

function rand(num){
    return Math.floor(Math.random() * num)
}
function randomRGB(x, y){
    return "rgb(" + (y % 255).toFixed() + "," + (x % 255).toFixed() + "," + (c % 255) + ")";
}

function color(){
    if (clr < 0) {
        clr = 16777215;
    }
    return "#" + (clr = clr - 50).toString(16);
}

resizeCanvas();
setInterval(sparkle, 10);

function sparkle() {
    var x = canvas.width / 2,
        y = canvas.height / 2,
        num = 500, px, py, timeout, angle;
    c++ ;
    
    for (var i=0; i < num; i++){
        angle = (180 * Math.PI * (i/num)) + c; 
        px = x + Math.sin(angle) * Math.log(i) * (i);
        py = y + Math.cos(angle) * Math.log(i) * (i);
        point(px, py, color(), 1);
        setTimeout(point, 5000, px , py, '#FFF', 2.5);        
    }
}

function point(x,y, color, size){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();
    ctx.fill
}