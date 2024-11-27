import { Ammo } from "../Enums/Ammo";
import { Weapon } from "./Weapon";

class Sniper extends Weapon{
    constructor(){
        super(Ammo.Heavy,1,3000,100,150);
    }
}

export {Sniper}