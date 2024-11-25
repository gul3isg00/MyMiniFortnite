import { Storm } from '../Classes/Storm';

interface Props {
    storm: Storm
}


const StormModel: React.FC<Props> = ({ storm }) => {

    return (
        <div 
            style={{ 
            width: storm.getRadius()*2,
            height: storm.getRadius()*2,
            borderRadius: storm.getRadius()*10,
            position:'absolute',
            border:'solid',
            borderColor:'white',
            // Might have to minus radius?
            left: storm.getPosition().getX(),
            top: storm.getPosition().getY(),
            zIndex:4,
          }}/>
        
    )
};

export default StormModel;