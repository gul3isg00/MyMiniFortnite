import { CompassDirection } from "./CompassDirection";

class Position{
    private x: number;
    private y: number;
    private z: number;
    private direction: CompassDirection;


    constructor(x?:number, y?:number, z?:number, degrees?:number){
        this.x = x??0;
        this.y = y??0;
        this.z = z??0;
        this.direction = new CompassDirection(degrees??0);
    }

    public getDegrees(){
        return this.direction.getDegrees();
    }

    public getX(){
        return this.x;
    }

    public getDirection(){
        return this.direction;
    }

    public getY(){
        return this.y;
    }

    public getZ(){
        return this.z;
    }

    public addX(newX: number){
        this.x += newX
    }

    public addY(newY: number){
        this.y += newY
    }

    public setX(newX: number){
        this.x = newX
    }

    public setY(newY: number){
        this.y = newY
    }

    public addZ(newZ: number){
        this.z += newZ
    }

}

export  { Position }