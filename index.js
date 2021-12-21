//seting up canvas and getting things by id
var can = document.getElementById('can');
var ctx = can.getContext('2d');
var e = document.getElementById("movsel");
can.width = 2000
can.height = 2000

//tank class to store data
class tank{
    constructor(player){//init function
        this.hp = 3;
        this.points = 0;
        this.range = 1;
        this.user = player; 
        this.x = 2
        this.y = 4
        this.color = "#042069"
    }
    //getters bc javascript is shit
    get player(){
        return this._user
    }
    get x(){
        return this._x;
    }
    get y(){
        return this._y;
    }
    get points(){
        return this._points;
    }
    get hp(){
        return this._hp;
    }
    
    //setters bc javascript is shit
    set x(n){
        this._x = n;
    }
    set y(n){
        this._y = n;
    }
    set points(n){
        this._points = n;
    }
    set hp(n){
       this._hp = n;
    }

    drawt(){//draws tank to the screen
        ctx.fillStyle = this.color;
        ctx.beginPath();
        this.xd = this.x-1
        this.yd = this.y-1
        ctx.rect(this.xd*50+10 , this.yd*50+10 , 30, 30);
        ctx.fill();
    }

}
function grid(){//draws the grid to the canvas
    //setup line settings
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.strokeStyle = "black";
    
    //get width and hight of canvas
    var width = can.width
    var height = can.height

    //draws the vertical lines on the grid
    for (let i = 0; i < width; i+=50) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
    }
    //draws the horazontall lines on the grid
    for (let o = 0; o < height; o+=50){
        ctx.moveTo(0, o);
        ctx.lineTo(width, o);
        ctx.stroke();
    }
}
//
function pxtocord(i) {
    var o = String(i/50);
    var ou = o.split(".");
    out = ou[0];
    return parseInt(out);
}
//wipes canvas
function clear() {
    ctx.clearRect(0, 0, can.width, can.height);
}
//updates the canvas
function draw() {
    //clear and reset the grid
    clear();
    grid();
    //goes through tank list and draws each tank
    for (let i = 0; i < tanks.length; i++) {
        var t = tanks[i];
        t.drawt()
    }   
}

//event listeners for draging perposes
can.addEventListener('mousedown', function(ev) {
    drag = true;
    //get mouse position
    var posx = ev.clientX;
    console.log("x: ", posx)
    var posy = ev.clientY;
    console.log("y: ", posy)
    //convert to code grid position
    var gridx = pxtocord(posx)
    var gridy = pxtocord(posy)
    console.log(gridx)
    console.log(gridy)
});

can.addEventListener('mousemove', function(event) {
    if (drag){
        
    }
});

can.addEventListener('mouseup', function(event) {
    drag = false;
});
function getop() {
    var value = e.options[e.selectedIndex].value;
    action = value
}
//drag related vars
var action = "R"
var drag = false;

//creates a list to store tanks *todo create way to load from sql
var tanks = [new tank("joi")];
draw();
