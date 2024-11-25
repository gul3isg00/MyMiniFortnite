import React, { useState, useEffect } from 'react';
import mapImg from '../Assets/map.jpg';
import { World } from '../Classes/World';
import PlayerModel from './PlayerModel';
import StormModel from './StormModel';

interface Props {
}

const tickInterval = 100;

const world = new World(100);

const size = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

const Map: React.FC<Props> = ({ }) => {

    const [ticks, setTicks] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTicks(ticks => ticks + 1);
            world.update();
        }, tickInterval); 
    
        return () => clearInterval(interval);
      }, []);


    
    return (
        <div style={{ 
            backgroundImage: `url(${mapImg})`,
            backgroundSize: size,
            height: size,
            width: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position:'relative'
          }}>
            <StormModel storm={world.getStorm()}/>
            {world.getPlayers().map(player => 
                    <PlayerModel 
                        key = {Math.random()}
                        player = {player}
                        size = {size/80}
                    />
                )
            }
          </div>
    );
};

export default Map;