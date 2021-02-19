import Player from './classes/player.js';
import Pipe from './classes/pipe.js';

const canvas = document.querySelector('#gameScreen');
const ctx = canvas.getContext("2d");
const gameStatus = {
    isPlaying:false,
    gameOver:false,
    score:0
}
const sounds = {
    fly:"sounds/fly.wav",
    hit:"sounds/hit.wav"
}
const audioSource = document.createElement("audio");

const player = new Player(20,canvas.height);
const pipeManager = { 
    pipes:[],
    generatePipes : function(){
        const distBase = Math.floor(canvas.width/2);
        for(let i=0; i<2;i++){
            let posToInstantiate = canvas.width + (distBase*i);
            this.pipes.push(new Pipe(posToInstantiate));
        }
    },
    drawPipes : function(ctx){
        this.pipes.forEach(pipe => {
            pipe.draw(ctx,canvas.height);
        });
    },
    checkCollision : function(){
        this.pipes.forEach(pipe => {
            if(pipe.x <= player.pos.x+player.size && pipe.x+30 >= player.pos.x) {
                if(pipe.safeZone > player.pos.y || pipe.safeZone+120 < player.pos.y+player.size)
                    GameOver();
            }
        });
    },
    movePipes : function(){
        this.pipes.forEach(pipe => {
            pipe.move();
            if(pipe.isOffScreen()) pipe.reset(canvas.width);
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

    player.setDefault();
    pipeManager.pipes = [];
    pipeManager.generatePipes();
}

function Update(){
    setTimeout(Update, 30);
    ClearScreen();

    pipeManager.drawPipes(ctx);
    player.draw(ctx);

    if(!gameStatus.isPlaying ) return;
    
    player.move();
    player.checkCollision();

    if(gameStatus.gameOver == true) {
        DrawScore(true);
        if(player.pos.y > canvas.height*1.5) Start();
        return;
    }

    pipeManager.movePipes();
    pipeManager.checkCollision();

    IncreaseScore();
    DrawScore();

}
function GameOver(){
    PlaySound(sounds.hit);
    gameStatus.gameOver = true;
    player.collisionOn = false;
}

function PlaySound(src){
    audioSource.src = src;
    audioSource.play();
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
    if(gameStatus.gameOver == true) return;
    player.vel = 10;
    PlaySound(sounds.fly);
}