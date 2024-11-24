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


    public setRarity(rarity:Rarity){
        this.rarity = rarity;
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

    public generateRarity(){
        const rng = Math.random() * 100;

        if(rng < 35){
            return Rarity.Common;
        }

        if(rng < 60){
            return Rarity.Uncommon
        }

        if(rng < 75){
            return Rarity.Rare
        }

        if(rng < 85){
            return Rarity.Epic
        }
        else {
            return Rarity.Legendary;
        }
    }
}

export {Item}