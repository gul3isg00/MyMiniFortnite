import { Item } from "./Item";
import { Player } from "./Player"
import { PointOfInterest } from "./PointOfInterest";

class World{
    private players: Player[];
    private items: Item[];
    private pois: PointOfInterest[];
    
    constructor(numOfPlayers?: number){
        this.players = [];
        this.items = [];
        this.pois = [];
        if(numOfPlayers){
            this.generatePlayers(numOfPlayers)
        }
    }

    public update(){
        // Update each player
        for(let x = 0; x!= this.players.length; x++){
            //this.players[x].move();
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
            var curPlayer = new Player();
            curPlayer.assignRandomUsername();
            this.players.push(curPlayer);
        }
    }
}

export {World}