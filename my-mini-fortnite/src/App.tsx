import React from 'react';
import Map from './Components/Map';
import './App.css';

function App() {
  return (
    <div style={{
        backgroundColor:'#01586B',
        height:'100vh',
        width:'100vw',
        display:'flex', flexDirection:'row', justifyContent:'center'
      }}>
        <div style={{alignContent:'center'}}>
          <Map /> 
        </div>
    </div>
  );
}

export default App;
