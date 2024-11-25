import { Position } from "./Position"

const worldSize = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

class Storm{
    private pos: Position;
    private radius: number;
    private damageTick: number;
    private ticks: number;
    private ticksUntilNextCircle: number;
    private numberOfCirclesCompleted: number;

    constructor(x?:number,y?:number){
        this.pos = new Position(x??0,y??0);
        this.radius = worldSize * 0.4;
        this.damageTick = 1;
        this.ticks = 0;
        this.ticksUntilNextCircle = 50;
        this.numberOfCirclesCompleted = 0;
    }

    public incrementTick(){
        this.ticks++;
        if(this.ticks >= this.ticksUntilNextCircle){
            this.nextStormCircle();
            this.ticksUntilNextCircle = this.ticks + (this.ticksUntilNextCircle * 0.6);
        }
    }

    public getRadius(){
        return this.radius;
    }

    public getStormProgress(){
        return this.ticks / this.ticksUntilNextCircle;
    }

    public getdamageTick(){
        return this.damageTick;
    }

    public getPosition(){
        return this.pos;
    }

    private nextStormCircle(){
        this.numberOfCirclesCompleted++;        
        this.radius = 0.6* this.radius;

        this.pos.setX(Math.random() * (this.pos.getX() + this.radius));
        this.pos.setY(Math.random() * (this.pos.getY() + this.radius));
        
        if(this.numberOfCirclesCompleted % 2 == 0){this.damageTick *=2;}

    }
}

export {Storm}