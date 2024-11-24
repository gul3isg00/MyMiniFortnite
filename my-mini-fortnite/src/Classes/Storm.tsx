import { Position } from "./Position"

const worldSize = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

class Storm{
    pos: Position;
    radius: number;
    tick: number;
    numberOfCirclesCompleted: number;

    constructor(x?:number,y?:number){
        this.pos = new Position(x??0,y??0);
        this.radius = worldSize * 0.3;
        this.tick = 1;
        this.numberOfCirclesCompleted = 0;
    }

    public getTick(){
        return this.tick;
    }

    public nextStormCircle(){
        this.numberOfCirclesCompleted++;        
        this.radius = 0.6* this.radius;

        this.pos.setX(Math.random() * (this.pos.getX() + this.radius));
        this.pos.setY(Math.random() * (this.pos.getY() + this.radius));
        
        if(this.numberOfCirclesCompleted % 2 == 0){this.tick *=2;}

    }
}

export {Storm}