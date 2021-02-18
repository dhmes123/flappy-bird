class Vector2d{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

function minmax(min,max,value){
    if(value <= min) return min;
    if(value >= max) return max;
    return value; 
}