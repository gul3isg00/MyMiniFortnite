import { Ammo } from "../Enums/Ammo";
import { Rarity } from "../Enums/Rarity";
import { Item } from "./Item";

class Weapon extends Item{

    ammoType: Ammo;
    maxAmmoLoaded: number;
    ammoLoaded: number;
    tickOfLastShot: number;
    reloadTime: number;
    fireRate: number;
    range: number;
    damage: number;
    reloading: boolean;

    constructor(ammoType: Ammo, maxLoaded: number, fireRate: number, range: number, damage:number, reloadTime:number, rarity?: Rarity){
        super(rarity);

        this.ammoType = ammoType;
        this.maxAmmoLoaded = maxLoaded;
        this.ammoLoaded = maxLoaded;
        this.fireRate = fireRate;
        this.range = range;
        this.damage = damage;
        this.reloading = false;
        this.tickOfLastShot = -1;
        this.reloadTime = reloadTime;

        if(!rarity){
            this.setRarity(this.generateRarity());
        }
    }

    public getRange(){
        return this.range;
    }

    public getDamage(){
        return this.damage;
    }

    public isLoaded(tick?:number){
        if(this.ammoLoaded > 0 || (tick && tick >= this.tickOfLastShot+this.reloadTime)){
            return true;
        }
        return false;
    }

    // NEED THIS TO TAKE INTO ACCOUNT AMMO & RELOADING
    public shoot(tick: number){
        // VERY ABSTRACT INFINITE RELOAD
        if(this.ammoLoaded <= 0 && tick >= this.tickOfLastShot + this.reloadTime){
            this.ammoLoaded = this.maxAmmoLoaded;
        }
        if(tick > this.tickOfLastShot + this.fireRate && this.ammoLoaded > 0){
            this.tickOfLastShot = tick;
            this.ammoLoaded--;
            return this.damage;
        }
        return 0;
    }

}

export {Weapon}

