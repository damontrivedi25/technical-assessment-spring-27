import './App.css';
import { useState, useEffect } from 'react';

function App() {
  
  const [vechiclecount, setvehiclecount] = useState(0)

  useEffect(() => {

    async function getTrains() {
      const ur1 = 'https://api-v3.mbta.com/vehicles'
      const response = await fetch(ur1)

      if (!response.ok) {
        throw new Error('MBTA request failed')
      }
      const mbtatrains = await response.json()

      console.log(mbtatrains.data.length)
      setvehiclecount(mbtatrains.data.length)
    }

    getTrains()

}, []);
  
  return (
        <div>
            <h1>'Boston Transit Chaos Meter'</h1>

            <p>'Tracking the T, one train at a time'</p>

            <h2>{vechiclecount}</h2>

            <p>'Vechile Records Retrived'</p>
        </div>
    );
}
export default App;