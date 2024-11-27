import { HealingType } from "../Enums/HealingType";
import { Item } from "./Item"
import { SupportItem } from "./SupportItem";

class Inventory{
    private items: Item[];
    private slots: number;
    private selectedSlot: number;

    constructor(slots?:number){
        this.slots = slots?? 5;
        this.selectedSlot = -1;
        this.items = [];
    }

    public getSelectedItem(){
        if(this.selectedSlot != -1 && this.selectedSlot < this.items.length){
            return this.items[this.selectedSlot];
        }
    }

    public selectItemInSlot(slot: number){
        if(slot >= 0 && slot <= this.slots && this.items[slot]){
            this.selectedSlot = slot;
            return this.items[slot];
        }
    }

    public selectOptimalHealingItem(healthDisparity:number, type?:HealingType){
        const healingItems = this.items.filter(item => item instanceof SupportItem && ((item as SupportItem).getType() == (type??HealingType.Health)));
        if(healingItems.length > 0){
            var bestForTheJob = healingItems[0] as SupportItem;
            healingItems.forEach(item => {
                const healItem = item as SupportItem;
                if(Math.abs(healthDisparity - healItem.getMaxCurrentHealingOutput()) < (Math.abs(healthDisparity - bestForTheJob.getMaxCurrentHealingOutput()))){
                    bestForTheJob = healItem;
                }
            })
            if(bestForTheJob){
                this.selectItemInSlot(this.items.indexOf(bestForTheJob));
            }
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