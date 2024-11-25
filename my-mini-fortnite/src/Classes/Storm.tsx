import { randomInRange } from "../Services/general";
import { Position } from "./Position"


class Storm{
    private pos: Position;
    private oldPos: Position;
    private radius: number;
    private oldRadius: number;
    private damageTick: number;
    private worldSize:number;
    private ticks: number;
    private ticksUntilNextCircle: number;
    private numberOfCirclesCompleted: number;

    constructor(x?:number,y?:number, worldSize?:number){
        this.pos = new Position(x??0,y??0);
        this.oldPos = new Position(x??0,y??0);
        this.worldSize = worldSize??0
        this.radius = this.worldSize * 0.4;
        this.oldRadius = this.worldSize * 0.8;
        this.damageTick = 1;
        this.ticks = 0;
        this.ticksUntilNextCircle = 500;
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

        this.pos.setX(this.pos.getX() + randomInRange(-(this.oldRadius*0.6),this.oldRadius*0.4));
        this.pos.setY(this.pos.getY() + randomInRange(-(this.oldRadius*0.6),this.oldRadius*0.4));
        
        if(this.numberOfCirclesCompleted % 2 == 0 && this.damageTick > 5){this.damageTick *=2;}

        if(this.radius <= 0){
            this.radius = 0;
        }

    }
}

export {Storm}