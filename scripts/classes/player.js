class Player{
    constructor(size,sHeight){
        this.size = size;
        this.centerPosY = Math.ceil(sHeight/2);
        this.setDefault();
    }
    setDefault(){
        this.pos = new Vector2d(50,this.centerPosY);
        this.vel = 0;
        this.collisionOn = true;
    }
    draw(ctx){
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    }
    move(){
        this.vel = minmax(-15,15,this.vel);
        this.pos.y -= this.vel;
        this.vel += -1;
    }
    checkCollision(){
        if(this.collisionOn == false) return;
        let minY = 0 + Math.floor(this.size/2);
        let maxY = this.centerPosY*2 - this.size;
        this.pos.y = minmax(minY,maxY,this.pos.y);
    }
}

export default Player;