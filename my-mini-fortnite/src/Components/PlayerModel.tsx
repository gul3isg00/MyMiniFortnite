import { Player } from '../Classes/Player';

interface Props {
    player: Player
    size: number
}


const PlayerModel: React.FC<Props> = ({  player, size }) => {

    // DOESN'T WORK - NEEDS TO DRAW WHAT PLAYER IS LOOKING AT
    const drawViewPort = () => {
        const center = (size + player.getViewDistance()) / 2
        const end = center + center * Math.cos((player.getDegrees() * Math.PI) / 180);
        const largeArcFlag = player.getDegrees() > 180? 1 : 0;
        return (<svg>
            <circle cx={center} cy={center} r={center} fill="lightgrey" />
      <path
        d={`M ${center} ${center} L ${center} ${center - center} A ${center} ${center} 0 ${largeArcFlag} 1 ${end} ${end} Z`}
        fill="lightblue"
      />
        </svg>)
    }


    return player.isAlive() ? (
        <div 
            style={{ 
            width: player.getViewDistance() + size,
            height: player.getViewDistance() + size,
            borderRadius: size*10,
            position:'absolute',
            backgroundColor:'rgba(0,0,0,0.5)',
            left:player? player.getPosition().getX() : 0,
            top:player? player.getPosition().getY() : 0,
            zIndex:5,
          }}>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', height: size + player.getViewDistance()}}>
            <div style={{display:'flex', justifyContent:'center'}}>

                <div
                    style={{ 
                    width: size,
                    height: size,
                    borderRadius: size*10,
                    position:'relative',
                    color:'white',
                    backgroundColor:'red',
                    zIndex:6}}
                />
                <div style={{position:'absolute', color:'white'}}>{player.getUsername()}</div>
            </div>
            </div>
          </div>
    ) : <div/>;
};

export default PlayerModel;