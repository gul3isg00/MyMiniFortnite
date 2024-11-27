import { randomInRange } from "../Services/general";
import { Item } from "./Item";
import { Player } from "./Player"
import { PointOfInterest } from "./PointOfInterest";
import { Storm } from "./Storm";

const size = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

class World{
    private players: Player[];
    private items: Item[];
    private pois: PointOfInterest[];
    private ticks: number;
    private storm: Storm;

    constructor(numOfPlayers?: number){
        this.ticks = 0;
        this.players = [];
        this.items = [];
        this.pois = [];
        this.storm = new Storm(randomInRange(size*0.3,size*0.7),randomInRange(size*0.3,size*0.7),size);
        if(numOfPlayers){
            this.generatePlayers(numOfPlayers)
        }
    }


    // Called every time the component ticks
    public update(){
        this.ticks++;

        // Tick the storm
        this.storm.incrementTick();

        // Filter dead players
        this.players = this.players.filter(player => player.isAlive());

        // Update each player
        for(let x = 0; x!= this.players.length; x++){
            if(this.players[x].isHealing()){
                // heal
                continue;
            }
            this.players[x].move();

            var isAttacking = false;
            for(let y = 0; y != this.players.length; y++){
                if (x==y){continue;}
                // If it ever returns true, then the player is attacking
                isAttacking = this.players[x].attackPlayer(this.players[y]) || isAttacking;
            }

            if(!isAttacking){
                //look for POI
            }
        }
    }

    public getStorm(){
        return this.storm;
    }

    public getPlayers(){
        return this.players;
    }

    public getItems(){
        return this.items;
    }

    public getPOIs(){
        return this.pois;
    }

    private generatePlayers(numOfPlayers: number){
        for(var x = 0; x !== numOfPlayers; x++){
            var curPlayer = new Player(Math.round(Math.random() * size), Math.round(Math.random() * size));
            curPlayer.assignRandomUsername();
            this.players.push(curPlayer);
        }
    }
}

export {World}