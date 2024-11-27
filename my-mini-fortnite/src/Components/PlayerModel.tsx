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
        <div>
            {/* <div style={{
            left: player.getPosition().getX() ,
            top: player.getPosition().getY(),
            position:'absolute',
            width:2,
            height:2,
            borderRadius:size*2,
            backgroundColor:'green',
            zIndex:7
         }}/> */}
          <div style={{
            left: player.getPosition().getX() - (size/2) ,
            top: player.getPosition().getY()  - (size/2),
            position:'absolute',
            width:size,
            height:size,
            borderRadius:size*2,
            backgroundColor:'red',
            color:'white',
            zIndex:6
         }}>{player.getUsername()}</div>
         {player.getEffectiveRange() > 0 ? <div style={{
            left: player.getPosition().getX() - (size/2) - (player.getEffectiveRange()/2),
            top: player.getPosition().getY()  - (size/2) - (player.getEffectiveRange()/2),
            position:'absolute',
            width:size + player.getEffectiveRange(),
            height:size + player.getEffectiveRange(),
            borderRadius: player.getEffectiveRange()*2,
            backgroundColor:'rgba(0,0,0,0.5)',
            zIndex:5
         }}/> : <div/>}
        </div>
       
    ) : <div/>;
};

export default PlayerModel;