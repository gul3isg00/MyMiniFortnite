import { Storm } from '../Classes/Storm';

interface Props {
    storm: Storm
}


const StormModel: React.FC<Props> = ({ storm }) => {
    return (
        <div style={{width:window.innerWidth, height:window.innerHeight}}>
          {/* Center marker */}
         {/* <div style={{
            left: storm.getPosition().getX() - ((window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight)*0.005),
            top: storm.getPosition().getY() - ((window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight)*0.005),
            position:'absolute',
            width:5,
            height:5,
            backgroundColor:'red',
            zIndex:6
         }}/> */}
        <div 
          style={{ 
          width: storm.getRadius()*2,
          height: storm.getRadius()*2,
          borderRadius: storm.getRadius()*10,
          position:'absolute',
          border:'solid',
          borderColor:'white',
          borderWidth: ((window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight)*0.005),
          // Might have to minus / add radius to get true center
          left: storm.getPosition().getX() - ((window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight)*0.005) - storm.getRadius(),
          top: storm.getPosition().getY() - ((window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight)*0.005) - storm.getRadius(),
          zIndex:4,
        }}/>
        <div 
            style={{ 
            width: (storm.getOldRadius()*2) - (Math.abs((storm.getRadius() - storm.getOldRadius()))*2 * (storm.getStormProgress())),
            height: (storm.getOldRadius()*2) - (Math.abs((storm.getRadius() - storm.getOldRadius()))*2 * (storm.getStormProgress())),
            borderRadius: (window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight) *10,
            position:'absolute',
            border:'solid',
            overflow: 'hidden',
            borderColor:'rgba(194,3,252,0.5)',
            borderWidth: (window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight),
            left: (storm.getOldPosition().getX() + ((storm.getPosition().getX() - storm.getOldPosition().getX())*storm.getStormProgress())) - (window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight) - (((storm.getOldRadius()*2) - (Math.abs((storm.getRadius() - storm.getOldRadius()))*2 * (storm.getStormProgress())))/2) ,
            top: (storm.getOldPosition().getY() + ((storm.getPosition().getY() - storm.getOldPosition().getY())*storm.getStormProgress())) - (window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight) - (((storm.getOldRadius()*2) - (Math.abs((storm.getRadius() - storm.getOldRadius()))*2 * (storm.getStormProgress())))/2),
            zIndex:3,
          }}/>
        </div>
    )
};

export default StormModel;