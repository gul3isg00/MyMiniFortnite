import { Directions } from "../Enums/Directions";

class CompassDirection{
    private degrees: number;

    constructor(degrees?:number){
        this.degrees = 0;
        if(degrees){ this.setDegrees(degrees); }
    }

    public getDegrees(){
        return this.degrees;
    }

    public getDegreesRounded(){
        return this.roundDegrees(5);
    }

    private roundDegrees (step: number){
        return Math.round(this.degrees / step) * step;
    }

    public getCompassDirection(){
        var rounded = this.roundDegrees(45);
        switch(rounded){
            case(0):
                return Directions.N;
            case(45):
                return Directions.NE;
            case(90):
                return Directions.E;
            case(135):
                return Directions.SE;
            case(180):
                return Directions.S;
            case(225):
                return Directions.SW;
            case(270):
                return Directions.W;
            case(315):
                return Directions.NW;
            case(360):
                return Directions.N;
            }
    }

    public setDegrees(newDeg: number){
        if(newDeg >= 0 && newDeg <= 360){
            this.degrees = newDeg;
        }
    }
}

export {CompassDirection}