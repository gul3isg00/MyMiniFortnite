import { Ammo } from "../Enums/Ammo";
import { Weapon } from "./Weapon";

class Shotgun extends Weapon{
    constructor(){
        super(Ammo.Shotgun,5,1000,10,100);
    }
}

export {Shotgun}