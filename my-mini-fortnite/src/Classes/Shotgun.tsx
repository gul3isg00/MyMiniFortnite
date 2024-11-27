import { Ammo } from "../Enums/Ammo";
import { Weapon } from "./Weapon";

const worldSize = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

class Shotgun extends Weapon{
    constructor(){
        super(Ammo.Shotgun,5,1000,worldSize*0.02,100);
    }
}

export {Shotgun}