import React, { useState, useEffect } from 'react';
import mapImg from '../Assets/map.jpg';
import { World } from '../Classes/World';
import PlayerModel from './PlayerModel';

interface Props {
    onClick: () => void;
}

const tickInterval = 100;

const world = new World(1);

const Map: React.FC<Props> = ({  onClick }) => {

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
            backgroundSize: 500,
            height: 500,
            width: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {world.getPlayers().map(player => 
                    <PlayerModel 
                        key = {Math.random()}
                        player = {player}
                    />
                )
            }
          </div>
    );
};

export default Map;