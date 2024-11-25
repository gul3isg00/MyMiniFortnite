import { Position } from "./Position"

const worldSize = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

class Storm{
    private pos: Position;
    private oldPos: Position;
    private radius: number;
    private oldRadius: number;
    private damageTick: number;
    private ticks: number;
    private ticksUntilNextCircle: number;
    private numberOfCirclesCompleted: number;

    constructor(x?:number,y?:number){
        this.pos = new Position(x??0,y??0);
        this.oldPos = new Position(x??0,y??0);
        this.radius = worldSize * 0.4;
        this.oldRadius = worldSize * 0.8;
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

    public getOldRadius(){
        return this.oldRadius;
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

    public getOldPosition(){
        return this.oldPos;
    }

    private nextStormCircle(){
        this.numberOfCirclesCompleted++;     

        this.oldRadius = this.radius;   
        this.radius = 0.6* this.radius;

        this.oldPos.setX(this.pos.getX());
        this.oldPos.setY(this.pos.getY());

        this.pos.setX((Math.random() > 0.5 ? 1 : -1)*Math.random() * (this.pos.getX() + (this.radius/2)));
        this.pos.setY((Math.random() > 0.5 ? 1 : -1)*Math.random() * (this.pos.getY() + (this.radius/2)));
        
        if(this.numberOfCirclesCompleted % 2 == 0 && this.damageTick > 5){this.damageTick *=2;}

        if(this.radius <= 0){
            this.radius = 0;
        }

    }
}

export {Storm}