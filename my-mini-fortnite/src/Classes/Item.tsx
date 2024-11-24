import { Rarity } from "../Enums/Rarity"

class Item{
    private rarity: Rarity;
    private owner: string;

    constructor(rarity?: Rarity){
        this.rarity = rarity??Rarity.Common;
        this.owner = "";
    }

    public getRarity(){
        return this.rarity;
    }

    public getOwner(){
        return this.owner;
    }

    public hasOwner(){
        return this.owner == "";
    }

    public setOwner(newOwner: string){
        if(this.owner == ""){
            this.owner = newOwner;
        }
    }
}

export {Item}