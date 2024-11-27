import { HealingType } from "../Enums/HealingType";
import { Item } from "./Item"
import { SupportItem } from "./SupportItem";
import { Weapon } from "./Weapon";

class Inventory{
    private items: Item[];
    private slots: number;
    private selectedSlot: number;
    private longestRange: number;
    private hasWeapon: boolean;
    private hasHeals: boolean;
    private lightAmmo: number;
    private mediumAmmo: number;
    private heavyAmmo: number;

    constructor(slots?:number){
        this.slots = slots?? 5;
        this.selectedSlot = -1;
        this.items = [];
        this.hasHeals = false;
        this.hasWeapon = false;
        this.lightAmmo = 0;
        this.mediumAmmo = 0;
        this.heavyAmmo = 0;
        this.longestRange = 0;
    }

    public getSelectedItem(){
        if(this.selectedSlot != -1 && this.selectedSlot < this.items.length){
            return this.items[this.selectedSlot];
        }
    }

    public getItemInSlot(slot: number){
        if(slot >= 0 && slot <= this.slots && this.items[slot]){
            return this.items[slot];
        }
    }

    public selectItemInSlot(slot: number){
        const tryToSelect = this.getItemInSlot(slot);
        if(tryToSelect){
            this.selectedSlot = slot;
            return tryToSelect;
        }
    }

    public selectOptimalHealingItem(healthDisparity:number, type?:HealingType){
        if(!this.hasHeals){
            return;
        }
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

    public getLongestRange(){
        return this.longestRange;
    }

    public getSelectedIndex(){
        return this.selectedSlot;
    }

    public getItems(){
        return this.items;
    }
    
    public hasAWeapon(){
        return this.hasWeapon;
    }

    // Later actually drop the item?
    public dropItem(slot:number){
        
        if(slot >= 0 && slot <= this.slots && this.items[slot]){
            const wasWeapon = this.items[slot] instanceof Weapon;

            // Not sure this will do anything
            this.items.slice(slot,slot+1);

            if(wasWeapon){
                var curMax = 0;
                this.hasWeapon = false;
                this.items.forEach(item => {
                    if(item instanceof Weapon){
                        this.hasWeapon = true;
                        if(item.getRange() > curMax){
                            curMax = item.getRange();
                        }
                    }
                });
                this.longestRange = curMax;
            }

            return this.items[slot];
        }

    }

    public addItem(item: Item){
        if(item instanceof Weapon){
            if(item.getRange() > this.longestRange){
                this.longestRange = item.getRange();
            }
            this.hasWeapon = true;
        } else if (item instanceof SupportItem){
            this.hasHeals = true;
        }
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