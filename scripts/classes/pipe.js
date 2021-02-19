class Pipe{
    constructor(x){
        this.x = x;
        this.vel = 3;
        this.generateSafeZone();
    }
    generateSafeZone(){
        this.safeZone = Math.floor((Math.random() * 475) +50);
    }
    reset(pointToReset){
        this.x = pointToReset;
        this.generateSafeZone();
    }
    draw(ctx, sHeight){
        ctx.fillStyle = "#00ff00";
        // Draw top pipe 
        ctx.fillRect(this.x, 0, 30, this.safeZone);
        // Draw top pipe 
        ctx.fillRect(this.x, this.safeZone+120, 30, sHeight - this.safeZone);
    }
    move(){
        this.x -= this.vel;
    }
    isOffScreen(){
        if(this.x+30 < 0) return true;
        return false;
    }
}

export default Pipe;