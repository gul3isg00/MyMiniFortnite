import { number } from "prop-types";
import { CompassDirection } from "./CompassDirection";
import { Inventory } from "./Inventory";
import { Item } from "./Item";
import { Position } from "./Position";
import { Shotgun } from "./Shotgun";
import { Weapon } from "./Weapon";

const worldSize = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

class Player{
    private username: string;
    private alive: boolean;
    private health: number;
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

        this.reactionSpeed = Math.random() *100;
        this.accuracy = Math.random() * 100;

        this.lastAggressor = "Anonymous";

        this.pos = new Position(x??0,y??0);
        this.movementDirection = new CompassDirection();
        this.viewDistance = worldSize / 30;
        this.inv = new Inventory();

        this.inv.addItem(new Shotgun());
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

    public collidesWith(otherPlayer: Player){
        const distance = Math.sqrt(
            Math.pow(otherPlayer.getPosition().getX() - this.getPosition().getX(), 2) + Math.pow(otherPlayer.getPosition().getY() - this.getPosition().getY(), 2)
        );

        return distance < (2 * (this.viewDistance));
    }

    public attackPlayer(otherPlayer:Player){
        if(this.collidesWith(otherPlayer) && (Math.random() * 100 > this.accuracy) && otherPlayer.isAlive()){
            otherPlayer.setLastAggressor(this.getUsername());
            otherPlayer.takeDamage((this.getInventory().getItemInSlot(0) as Weapon).getDamage());
        }
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
        this.shield = 0;
        console.log(`${this.getUsername()} was eliminated by ${this.lastAggressor}`);
        return this.inv.dropAllItems();
    }

    public getUsername(){
        return this.username;
    }

    public takeDamage(amount: number){
        if(this.shield > 0){
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