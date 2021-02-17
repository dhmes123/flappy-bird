const canvas = document.querySelector('#gameScreen');
const ctx = canvas.getContext("2d");


class Bird{
    constructor(size){
        this.pos = new Vector2d(50,Math.ceil(canvas.height/2+size));
        this.size = size;
    }
    draw(){
        ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    }
}

const player = new Bird(20);

Start();
Update();

function Start(){
    
}

function Update(){
    player.draw();
}