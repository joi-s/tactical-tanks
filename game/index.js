//getting the canvas and context for the canvas
var can = document.getElementById('can');
var ctx = can.getContext('2d');

//tooltip variables
var tooltip = document.getElementById("tool");
var usertip = document.getElementById("header")
var hptip = document.getElementById("tool1")
var pointtip = document.getElementById("tool2")
var rangetip = document.getElementById("tool3")
var button1 = document.getElementById("cbut1")
var button2 = document.getElementById("cbut2")
//manualy setting canvas size
can.width = 2000
can.height = 1000

//vars from php
var session = document.getElementById('php1').innerHTML;
var game = document.getElementById("php2").innerHTML;
var players = document.getElementById("php2").innerHTML;
var gamedata = document.getElementById("php3").innerHTML;


//tank class to store data
class tank{
    constructor(player, x, y, hp, points, range,color){//init function
        this.hp = hp;
        this.points = points;
        this.range = range;
        this.user = player; 
        this.x = x
        this.y = y
        this.color = color
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
    get range(){
        return this._range;
    }
    
    //setters bc javascript is shit
    set range(n){
        this._range = n;
    }
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
    //cheack if you can afford, does take points away
    canaffordM(r){
        if (this.points - r >= 0){
            this.points -= r;
            return true
        }
    }
    //cheack if you can afford, doesnt take any away
    canaffordN(r){
        if (this.points - r >= 0){
            return true
        }
        return false
    }
    uprange(r){
        if (this.points - r >= 0){
            this.range += r;
            this.points -= r;
            console.log("added " + r + "range")
        }
    }
    drawt(){//draws tank to the screen
        ctx.fillStyle = this.color;
        ctx.beginPath();
        this.xd = this.x-1;
        this.yd = this.y-1;
        ctx.rect(this.xd*50+10 , this.yd*50+10 , 30, 30);
        ctx.fill();
    }

    mcheck(event){//checks if tank is at a specific square on the grid
        const x = event.offsetX;
        const y = event.offsetY;
        this.xd = this.x-1;
        this.yd = this.y-1;
        if (x >= this.xd * 50 + 10 && x <= this.xd * 50 + 40){
            if (y >= this.yd * 50 + 10 && y <= this.yd * 50 + 40){
                return true;
            }
        }
        return false
    }
    //returns data used in tooltip/other in a convenent dicionary
    toolinfo(){
        return {'hp':this._hp, 'player': this.user, 'points':this._points, "range": this._range, "x": this._x, "y": this._y, "color": this.color}
    }
    inmovrange(cords){
        this.xd = this.x-1;
        this.yd = this.y-1;
        if(cords[0] <= this.xd + 1 && cords[0] >= this.xd - 1){
            if(cords[1] <= this.yd + this.range && cords[1] >= this.yd - this.range){
                return true;
            }
        }
        return false
    }
    inrange(cords){
        this.xd = this.x-1;
        this.yd = this.y-1;
        if(cords[0] <= this.xd + this.range && cords[0] >= this.xd - this.range){
            if(cords[1] <= this.yd + this.range && cords[1] >= this.yd - this.range){
                return true;
            }
        }
        return false
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

//set tooltip stuff
function updatetooltip(tank){
    var ttstuff = tank.toolinfo()
    usertip.innerHTML = ttstuff["player"]
    hptip.innerHTML = ttstuff["hp"]
    pointtip.innerHTML = ttstuff["points"]
    rangetip.innerHTML = ttstuff["range"]
}

//gets mouse cords and returns them in a list [x,y]
function getmousecord(ev){
    //gets exactpoition
    posses = getCursorPosition(ev)
    //convert to code grid position
    var gridx = pxtocord(posses["x"])
    var gridy = pxtocord(posses["y"])
    //returns in list
    return [gridx,gridy]
}

//event listeners for draging perposes
can.addEventListener('mousedown', function(ev) {
    if (mov){
        var coli = false;
        

        for (let t = 0; t < tanks.length; t++) {
            const tank = tanks[t];
            if (tank.mcheck(ev)){
                coli = true;
            }
        }
        var mouseloc = getmousecord(ev)
        if (tvar.inmovrange(mouseloc)){
            if (!coli){
                if (tvar.canaffordM(1)){
                    tvar.x = mouseloc[0] + 1 
                    tvar.y = mouseloc[1] + 1 
                    mov = false;
                    draw()
                }
            }
        }
        mov = false;
    }
    drag = true;
    //get mouse position
    posses = getCursorPosition(ev)
    //convert to code grid position
    var gridx = pxtocord(posses["x"])
    var gridy = pxtocord(posses["y"])
    console.log(gridx + "," + gridy)
});

can.addEventListener('mousemove', function(event) {
    //get coordenent and screen positions
    var mouseloc = getmousecord(event);
    var exmouse = [event.x, event.y]
    var tton = false;
    for (let t = 0; t < tanks.length; t++) {
        const tank = tanks[t];
        if (tank.mcheck(event)){
            if (!mov){
                tton = true;
                tooltip.style.visibility = 'visible';
                
                //set tooltip location
                var px = String(exmouse[0]) + "px"
                tooltip.style.left = px;
                var py = String(exmouse[1]) + "px"
                tooltip.style.top = py;

                var ttstuff = tank.toolinfo()
                //update the tooltip
                updatetooltip(tank)
                

                //hover over self button setup
                if (ttstuff["player"] == session){
                    tvar = tank;
                    //show buttons
                    button1.style.visibility = 'visible';
                    button2.style.visibility = 'visible';
                    //set button text
                    button1.innerHTML = "upgrade";
                    button2.innerHTML = "move";
                    //set onclick function
                    button1.setAttribute("onclick", "buttonhandle('U')");
                    button2.setAttribute("onclick","buttonhandle('M')");
                }
            }
        }   
    }
    if (!tton){
        tooltip.style.visibility = 'hidden';
        button1.style.visibility = 'hidden';
        button2.style.visibility = 'hidden';
    }
});

can.addEventListener('mouseup', function(event) {
    drag = false;
});

function getCursorPosition(event){
    const x = event.offsetX
    const y = event.offsetY
    return {"x": x,"y": y}
}

//handes the presses of tooltip buttons
function buttonhandle(act){

    if (act == "U"){
        tvar.uprange(1)
    } else if (act == "M"){
        if (tvar.canaffordN(1)){
            mov = true;
        }
    }
    updatetooltip(tvar);
}

function save(tlist){
    for (let i = 0; i < tlist.length; i++){
        var it = tlist[i];
        var isstuf = it.toolinfo();
        
    }
}

//drag related vars

var drag = false;
var mov = false;
var tvar;
//creates a list to store tanks *todo create way to load from sql server 
var tanks = [new tank("joi", 1, 2), new tank("tylar", 3,4)];
draw();
