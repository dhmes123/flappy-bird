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
        console.log(minmax(-15,15,this.vel));
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

const player = new Bird(20);


Start();
Update();

function Start(){
    canvas.focus();
    canvas.addEventListener('click', HandleKeyPress);
}

function Update(){
    ClearScreen();

    player.move();
    player.draw();
    player.checkCollision();

    setTimeout(Update, 30);
}

function ClearScreen(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function HandleKeyPress(e){
    player.vel = 15;
}