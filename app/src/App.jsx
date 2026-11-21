import './App.css';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  
  const [vehiclecount, setvehiclecount] = useState(0)

  const [vehicles, setvechiles] = useState([])


  useEffect(() => {

    async function getTrains() {
      const ur1 = 'https://api-v3.mbta.com/vehicles'
      const response = await fetch(ur1)

      if (!response.ok) {
        throw new Error('MBTA request failed')
      }
      const mbtatrains = await response.json()
      
      setvehiclecount(mbtatrains.data.length)

      setvechiles(mbtatrains.data)
    }

    getTrains()

}, []);
  
  return (
        <div>
            <h1>'Boston Transit Chaos Meter'</h1>

            <p>'Tracking the T, one train at a time'</p>

            <h2>{vehiclecount}</h2>

            <p>'Vechile Records Retrived'</p>

            <MapContainer
              center={[42.3601, -71.0589]}
              zoom={12}
              style={{ height: '450px', width: '100%' }}
            >
            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {vehicles
              .filter(vehicle =>
                  typeof vehicle.attributes.latitude === 'number' &&
                  typeof vehicle.attributes.longitude === 'number'
              )
              .map(vehicle => (
              <Marker key={[vehicle.id]}
                position={[vehicle.attributes.latitude, vehicle.attributes.longitude]}
              >
                <Popup>
                  <h3>Vehicle Information</h3>
                  <p>Marker ID: {vehicle.id}</p>
                  <p>Current Status: {vehicle.attributes.current_status}</p>
                </Popup>
              </Marker>
              ))
            }
            </MapContainer>
        </div>
    );
}
export default App;