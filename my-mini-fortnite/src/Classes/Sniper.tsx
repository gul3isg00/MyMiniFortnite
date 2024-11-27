import { Ammo } from "../Enums/Ammo";
import { Weapon } from "./Weapon";

const worldSize = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

class Sniper extends Weapon{
    constructor(){
        super(Ammo.Heavy,1,3000,worldSize*0.2,150);
    }
}

export {Sniper}