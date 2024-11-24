import { Chest } from "./Chest";
import { Position } from "./Position";

class PointOfInterest{
    name: string;
    size: number;
    pos: Position;
    chests: Chest[];

    constructor(name?:string, size?:number, x?:number, y?:number){
        this.name = name??"Unnamed Land";
        this.size = size??0;
        this.pos = new Position(x??0,y??0);
        this.chests = [];

        var numOfChests = Math.ceil(this.size / 10);
        for(var z = 0; z!= numOfChests; z++){
            this.chests.push(new Chest(this.pos.getX() + Math.random() * this.size/2, this.pos.getY() + Math.random() * this.size/2));
        }
    }
}

export {PointOfInterest}