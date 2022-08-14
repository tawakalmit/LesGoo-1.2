import React, {useRef, useMemo} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

export default function Getmap({ center, location, destination, latitude, longitude }) {

  const markerRef = useRef(null);

  return (
    <MapContainer className="h-96 w-full" center={[center.lat, center.lng]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
        id="start point" 
        position={[
          location && location.lat ? location.lat : "",
          location && location.lng ? location.lng : "",
          ]}
        ref={markerRef}
        >
        <Popup>Start Point</Popup>
        </Marker>

        <Marker
        id="destination point" 
        position={[
          destination && destination.lat ? destination.lat : "",
          destination && destination.lng ? destination.lng : "",
          ]}
        ref={markerRef}
        >
        <Popup>Destination Point</Popup>
        </Marker>

        <Marker
        id="My Location" 
        position={[
          latitude, longitude
          ]}
        ref={markerRef}
        >
        <Popup>My Location</Popup>
        </Marker>        
    </MapContainer>
  )
}
