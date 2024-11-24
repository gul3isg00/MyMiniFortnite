import { Player } from '../Classes/Player';

interface Props {
    player: Player
}

const playerSize = 10;

const PlayerModel: React.FC<Props> = ({  player }) => {
    return (
        <div 
            style={{ 
            width: playerSize,
            height: playerSize,
            borderRadius: playerSize*10,
            position:'absolute',
            background:'red',
            left:player? player.getPosition().getX() : 0,
            top:player? player.getPosition().getY() : 0,
            zIndex:5
          }}/>
    );
};

export default PlayerModel;