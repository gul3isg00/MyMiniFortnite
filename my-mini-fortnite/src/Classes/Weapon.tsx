import { Ammo } from "../Enums/Ammo";
import { Rarity } from "../Enums/Rarity";
import { Item } from "./Item";

class Weapon extends Item{

    ammoType: Ammo;
    ammoLoaded: number;
    maxAmmoLoaded: number;
    tickOfLastShot: number;
    fireRate: number;
    range: number;
    damage: number;

    constructor(ammoType: Ammo, maxLoaded: number, fireRate: number, range: number, damage:number, rarity?: Rarity){
        super(rarity);

        this.ammoType = ammoType;
        this.maxAmmoLoaded = maxLoaded;
        this.fireRate = fireRate;
        this.range = range;
        this.damage = damage;
        this.tickOfLastShot = -1;

        this.ammoLoaded = maxLoaded;

        if(!rarity){
            this.setRarity(this.generateRarity());
        }
    }

    public getDamage(){
        return this.damage;
    }

}

export {Weapon}

