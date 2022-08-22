import React, {useRef, useMemo} from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

export default function Map({ center, draggable, onDragMarker, location, popup_label }) {

  const markerRef = useRef(null);

  const dragHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker !== null) {
          onDragMarker(marker.getLatLng());
        }
      },
    }),
    []
  );

  return (
    <MapContainer className="h-96 w-full" center={[center.lat, center.lng]} zoom={10} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
        position={[
          location && location.lat ? location.lat : "",
          location && location.lng ? location.lng : "",
        ]}
        draggable={draggable}
        eventHandlers={dragHandlers}
        ref={markerRef}
        >
            <Popup>{popup_label}</Popup>
        </Marker>
    </MapContainer>
  )
}
