import { number } from "prop-types";
import { CompassDirection } from "./CompassDirection";
import { Inventory } from "./Inventory";
import { Item } from "./Item";
import { Position } from "./Position";
import { Shotgun } from "./Shotgun";
import { Weapon } from "./Weapon";
import { circularIntersect, distance } from "../Services/general";
import { Sniper } from "./Sniper";

const worldSize = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

class Player{
    private username: string;
    private alive: boolean;
    private health: number;
    private healing: boolean;
    private shield: number;
    private pos: Position;
    private movementDirection: CompassDirection;
    private reactionSpeed: number;
    private accuracy: number;
    private speed: number;
    private inv: Inventory;
    private lastAggressor: string;
    private viewDistance: number;

    constructor(x?:number,y?:number,username?: string, speed?: number){
        this.username = username??"Anonymous";
        this.health = 100;
        this.speed = speed??1;
        this.shield = 0;
        this.alive = true;

        this.healing = false;

        this.reactionSpeed = Math.random() *100;
        this.accuracy = Math.random() * 100;

        this.lastAggressor = "Anonymous";

        this.pos = new Position(x??0,y??0);
        this.movementDirection = new CompassDirection();
        this.viewDistance = worldSize / 30;
        this.inv = new Inventory();

        // Weapon distance doesn't scale as map scales
        this.inv.addItem(new Shotgun());
        this.inv.addItem(new Sniper());
    }

    public getInventory(){
        return this.inv;
    }

    public getDegrees(){
        return this.pos.getDegrees();
    }

    public isAlive(){
        return this.alive;
    }

    public getEffectiveRange(){
        const selected = this.inv.getSelectedItem();
        if(selected instanceof Weapon){
            return selected.getRange();
        }
        return 0;
    }

    // Doesn't always select optimal, maybe change to pick best based on chance of hitting 
    // (e.g. whether gun can hit player, and if multiple can hit player, use distance aim multipliers)
    public selectOptimalWeapon(opponent:Player){
        if(!this.inv.hasAWeapon()){return;}
        var curOptimal = [-1,999999]
        this.inv.getItems().forEach((item,i) => {
            if(item instanceof Weapon && item.isLoaded()){
                const dist = distance(this.pos.getX(), this.pos.getY(), opponent.getPosition().getX(), opponent.getPosition().getY());
                if(dist <= item.getRange()){
                    const similarity =  Math.abs(curOptimal[1] - (this.inv.getItemInSlot(curOptimal[0]) as Weapon)?.getRange());

                    if(curOptimal[0] == -1 || (Math.abs(dist - item.getRange()) < similarity)){
                        curOptimal = [i,dist];
                    }
                }
            }
        });
        if(curOptimal[0] != -1){
            this.inv.selectItemInSlot(curOptimal[0]);
        }
    }

    // !! Deffo attacks people out of range and doesn't take into account gun shooting speeds  !!
    public attackPlayer(otherPlayer:Player, tick:number){
        if( 
            // If the player has a weapon
            this.inv.hasAWeapon() && 
            // Can possible attack them
            circularIntersect(
                this.pos.getX(),
                this.pos.getY(),
                this.inv.getLongestRange(),
                otherPlayer.getPosition().getX(),
                otherPlayer.getPosition().getY(),
                5
            )&& 
            // Hits their shot
            (Math.random() * 100 > this.accuracy) && 
            // And the other play can be attacked
            otherPlayer.isAlive()
        ){
            otherPlayer.setLastAggressor(this.getUsername());
            // select the optimal weapon
            this.selectOptimalWeapon(otherPlayer);
            
            //NEEDS TO TAKE INTO ACCOUNT DIFFICULTY OF SNIPING FROM DISTANCE

            // And shoot!
            otherPlayer.takeDamage((this.inv.getSelectedItem() as Weapon)?.shoot(tick));
            if(otherPlayer.getHealth() <= 0){
                console.log(`${otherPlayer.getUsername()} was eliminated by ${this.username} with a ${this.inv.getSelectedItem()?.constructor.name} from ${Math.round(distance(this.pos.getX(), this.pos.getY(), otherPlayer.getPosition().getX(),otherPlayer.getPosition().getY()))}m`);
            }
            return true;
            
        }
        return false;
    }

    public setLastAggressor(la:string){
        this.lastAggressor = la;
    }

    public getHealth(){
        return this.health;
    }

    public getShields(){
        return this.shield;
    }

    // Needs to take into consideration movement direction - The current method doesn't rly work
    public move(){
        this.getPosition().getDirection().setDegrees(Math.random()*360);
        const {x,y} = this.getPosition().getDirection().getXYFromDegrees();
        this.pos.addX(this.speed * (worldSize / 1000) * x);
        this.pos.addY(this.speed * (worldSize / 1000) * y);
    }

    public getViewDistance(){
        return this.viewDistance;
    }

    public assignRandomUsername(){
        if(this.username === "Anonymous"){
            const nouns = [
                "Guleisgoo",
                "Aimee",
                "Jonathan",
                "Oliver",
                "Frog",
                "Tree",
                "Cat",
                "Dog",
                "Snake",
                "Hippo",
                "Bear",
                "Anonymous"
            ];

            const adjectives = [
                "Raunchy",
                "Tall",
                "Short",
                "Aggressive",
                "General",
                "Loud",
                "Quiet",
                "Violent",
                "Peaceful",
                "Friendly",
                "Cautious",
                "Sleek",
                "Generative",
                "Frank",
                "Lovely",
                "Smelly"
            ];

            this.username = `${adjectives[Math.floor(Math.random()*adjectives.length)]}${nouns[Math.floor(Math.random()*nouns.length)]}`;
        }
    }

    public getPosition (){
        return this.pos;
    }

    private kill(){
        this.alive = false;
        this.health = 0;
        this.healing = false;
        this.shield = 0;
        return this.inv.dropAllItems();
    }

    public getUsername(){
        return this.username;
    }

    public takeDamage(amount: number, healthOnly?:boolean){
        if(this.shield > 0 && !healthOnly){
            this.shield -= amount;
            if(this.shield < 0){
                this.health = Math.abs(this.shield);
                this.shield = 0;
            }
            if(this.health <= 0){
                this.health = 0;
                return this.kill();
            }
        } else {
            this.health -= amount;
            if(this.health <= 0){
                this.health = 0;
                return this.kill();
            }
        } 
        return [];
    }

    public takeHealthDamage(tick:number){
        this.health = this.health - tick;
        if(this.health <= 0){
            this.health = 0;
            return this.kill();
        }
        return [];
    }

    public isHealing(){
        return this.healing;
    }

    public heal(amount:number){
        if(this.health < 100){
            this.health += amount;
        }
        if(this.health > 100){
            this.health = 100;
        }
    }

    public applyShield(amount:number){
        if(this.shield < 100){
            this.shield +=amount;
        }
        if(this.shield > 100){
            this.shield = 100;
        }
    }

    public pickupItem(item: Item){
        if(!item.hasOwner()){
            item.setOwner(this.username);
            this.inv.addItem(item);
        }
    }
}

export { Player }