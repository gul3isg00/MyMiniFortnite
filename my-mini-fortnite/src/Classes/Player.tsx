import { CompassDirection } from "./CompassDirection";
import { Inventory } from "./Inventory";
import { Item } from "./Item";
import { Position } from "./Position";

class Player{
    private username: string;
    private alive: boolean;
    private health: number;
    private shield: number;
    private pos: Position;
    private movementDirection: CompassDirection;
    private speed: number;
    private inv: Inventory;

    constructor(x?:number,y?:number,username?: string, speed?: number){
        this.username = username??"Anonymous";
        this.health = 100;
        this.speed = speed??1;
        this.shield = 0;
        this.alive = true;
        this.pos = new Position(x??0,y??0);
        this.movementDirection = new CompassDirection();
        this.inv = new Inventory();
    }

    // Needs to take into consideration movement direction.
    public move(){
        this.pos.addX(1);
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
            console.log(`Welcome ${this.username} to the world!`);
        }
    }

    public getPosition (){
        return this.pos;
    }

    private kill(){
        this.alive = false;
        this.health = 0;
        this.shield = 0;
        return this.inv.dropAllItems();
    }

    public getUsername(){
        return this.username;
    }

    public takeDamage(amount: number){
        if(this.shield > 0){
            this.shield -= amount;
        }
        if(this.shield < 0){
            this.health = Math.abs(this.shield);
            this.shield = 0;
        }
        if(this.health <= 0){
            this.health = 0;
            return this.kill();
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