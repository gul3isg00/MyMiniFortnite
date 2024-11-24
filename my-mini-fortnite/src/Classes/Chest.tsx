import { Item } from "./Item";
import { Position } from "./Position"

class Chest{
    private pos: Position;
    private items: Item[];
    private opened: boolean;

    constructor(x?:number, y?:number){
        this.opened = false;
        this.pos = new Position(x??0,y??0);
        this.items = [];
        this.fillChest();
    }

    private fillChest (){
        // Random add support item
        // Random add weapon and ammo
        // Random add material
    }

    public openChest (){
        if(!this.opened){
            return this.items;
        }
        return [];
    }

    
}

export {Chest}