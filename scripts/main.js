const canvas = document.querySelector('#gameScreen');
const ctx = canvas.getContext("2d");
const gameStatus = {
    isPlaying:false,
    gameOver:false,
    score:0
}

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
        let maxY = canvas.height - this.size;
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
    checkCollision : function(){
        this.pipes.forEach(pipe => {
            if(pipe.x <= player.pos.x+player.size && pipe.x+30 >= player.pos.x) {
                if(pipe.safeZone > player.pos.y || pipe.safeZone+120 < player.pos.y+player.size)
                    gameStatus.gameOver = true;
            }
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

    gameStatus.score = 0;
    gameStatus.isPlaying = false;
    gameStatus.gameOver = false;

    player.pos.y = Math.ceil(canvas.height/2+player.size);
    pipeManager.pipes = [];
    pipeManager.generatePipes();
}

function Update(){
    setTimeout(Update, 30);
    ClearScreen();

    pipeManager.drawPipes();
    player.draw();

    if(!gameStatus.isPlaying ) return;
    
    player.move();
    player.checkCollision();

    if(gameStatus.gameOver == true) {
        DrawScore(true);
        return;
    }

    pipeManager.movePipes();
    pipeManager.checkCollision();

    IncreaseScore();
    DrawScore();

}
function IncreaseScore(iby=1){
    gameStatus.score+=iby;
}
function DrawScore(center=false){
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    let alignY = center?canvas.height/2:80; 
    ctx.fillText(gameStatus.score.toString(), canvas.width/2, alignY);
}
function ClearScreen(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function HandleKeyPress(e){
    if(gameStatus.isPlaying == false) gameStatus.isPlaying = true;
    if(gameStatus.gameOver == true) {Start(); return};
    player.vel = 10;
}