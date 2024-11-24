import { Item } from "./Item"

class Inventory{
    private items: Item[];
    private slots: number;

    constructor(slots?:number){
        this.slots = slots?? 5;
        this.items = [];
    }

    public getItemInSlot(slot: number){
        if(slot >= 0 && slot <= this.slots && this.items[slot]){
            return this.items[slot];
        }
    }

    // Later actually drop the item?
    public dropItem(slot:number){
        if(slot >= 0 && slot <= this.slots && this.items[slot]){
            this.items.slice(slot,slot+1);
            return this.items[slot];
        }
    }

    public addItem(item: Item){
        if(this.items.length < this.slots){
            this.items.push(item);
        }
    }

    public dropAllItems(){
        var copy = this.items;
        this.items = [];
        return copy;
    }

}

export {Inventory}