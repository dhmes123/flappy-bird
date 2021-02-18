const canvas = document.querySelector('#gameScreen');
const ctx = canvas.getContext("2d");


class Bird{
    constructor(size){
        this.pos = new Vector2d(50,Math.ceil(canvas.height/2+size));
        this.size = size;
        this.vel = 0;
    }
    draw(){
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    }
    move(){
        this.vel = minmax(-15,15,this.vel);
        this.pos.y -= this.vel;
        this.vel += -1;
    }
    checkCollision(){
        let minY = 0 + Math.floor(this.size/2);
        let maxY = canvas.height - this.size*2;
        player.pos.y = minmax(minY,maxY,player.pos.y);
    }
}
class Pipe{
    constructor(x){
        this.x = canvas.width + x;
        this.vel = 3;
        this.generateSafeZone();
    }
    generateSafeZone(){
        this.safeZone = Math.floor((Math.random() * 475) +50);
    }
    reset(){
        this.x = canvas.width;
        this.generateSafeZone();
    }
    draw(){
        ctx.fillStyle = "#00ff00";
        // Draw top pipe 
        ctx.fillRect(this.x, 0, 30, this.safeZone);
        // Draw top pipe 
        ctx.fillRect(this.x, this.safeZone+120, 30, canvas.height - this.safeZone);
    }
    move(){
        this.x -= this.vel;
    }
    isOffScreen(){
        if(this.x+30 < 0) return true;
        return false;
    }
}

const player = new Bird(20);
const pipeManager = { 
    pipes:[],
    generatePipes : function(){
        const distBase = Math.floor(canvas.width/2);
        for(let i=0; i<2;i++){
            this.pipes.push(new Pipe(distBase*i));
        }
    },
    drawPipes : function(){
        this.pipes.forEach(pipe => {
            pipe.draw();
        });
    },
    movePipes : function(){
        this.pipes.forEach(pipe => {
            pipe.move();
            if(pipe.isOffScreen()) pipe.reset();
        });
    }
};


Start();
Update();

function Start(){
    canvas.focus();
    canvas.addEventListener('click', HandleKeyPress);

    pipeManager.generatePipes();
}

function Update(){
    ClearScreen();

    player.move();
    player.draw();
    player.checkCollision();

    pipeManager.movePipes();
    pipeManager.drawPipes();


    setTimeout(Update, 30);
}

function ClearScreen(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function HandleKeyPress(e){
    player.vel = 10;
}