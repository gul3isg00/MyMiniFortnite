import { HealingType } from "../Enums/HealingType";
import { Item } from "./Item";
import { Player } from "./Player";

class SupportItem extends Item{

    private ticksBetweenHeal: number;
    private lastHealTick: number;
    private amountPerHeal: number;
    private amountOfHeals: number;
    private usedHeals: number;
    private maxHeals: number;
    private type: HealingType;

    constructor(ticksBetweenHeal?:number, amountPerHeal?:number,amountOfHeals?:number,maxHeals?:number,type?:HealingType){
        super();
        this.setRarity(this.generateRarity());

        this.ticksBetweenHeal = ticksBetweenHeal ?? 0;
        this.lastHealTick = 0;
        this.usedHeals = 0;
        this.amountPerHeal = amountPerHeal ?? 0;
        this.amountOfHeals = amountOfHeals ?? 0;
        this.maxHeals = maxHeals ?? 0;
        this.type = type??0;
    }

    public heal(tick:number, player:Player){
        if((this.lastHealTick + this.ticksBetweenHeal <= tick) && this.usedHeals < this.amountOfHeals){
            this.usedHeals++;
            this.lastHealTick = tick;
            
            if(this.type == HealingType.Shield && player.getShields() < this.maxHeals){
                const shieldAmount = this.amountPerHeal + player.getShields() > this.maxHeals ? this.maxHeals - player.getShields() : this.amountPerHeal;
                player.applyShield(shieldAmount);
            } else if(this.type == HealingType.Health && player.getHealth() < this.maxHeals){
                const healthAmount = this.amountPerHeal + player.getHealth() > this.maxHeals ? this.maxHeals - player.getHealth() : this.amountPerHeal;
                player.heal(healthAmount);
            }
        }
        return 0;
    }

    public getMaxCurrentHealingOutput(){
        return (this.amountOfHeals * this.amountOfHeals) > this.maxHeals ? this.maxHeals : (this.amountOfHeals * this.amountOfHeals);
    }

    public getType(){
        return this.type;
    }

}

export {SupportItem}