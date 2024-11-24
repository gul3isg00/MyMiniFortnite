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
        this.storm = new Storm();
        if(numOfPlayers){
            this.generatePlayers(numOfPlayers)
        }
    }

    public update(){
        this.ticks++;

        // Update each player
        for(let x = 0; x!= this.players.length; x++){
            if(!this.players[x].isAlive()){continue;}
            this.players[x].move();
            for(let y = 0; y != this.players.length; y++){
                if (x==y){continue;}
                this.players[x].attackPlayer(this.players[y]);
            }
        }
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