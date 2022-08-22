import React, { useRef, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import { getCookie } from 'cookies-next';

export default function Getmap({
  center,
  location,
  destination,
  latitude,
  longitude,
}) {
  const markerRef = useRef(null);
  const token = getCookie('usr_token');
  const group_id = getCookie('usr_group_id');

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ group_id: group_id }),
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/group/chats`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally();
  };

  return (
    <MapContainer
      className='fixed top-16 h-52 w-[425px] z-10'
      center={[center.lat, center.lng]}
      zoom={7}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker
        id='start point'
        position={[
          location && location.lat ? location.lat : '',
          location && location.lng ? location.lng : '',
        ]}
        ref={markerRef}
      >
        <Popup>Start Point</Popup>
      </Marker>

      <Marker
        id='destination point'
        position={[
          destination && destination.lat ? destination.lat : '',
          destination && destination.lng ? destination.lng : '',
        ]}
        ref={markerRef}
      >
        <Popup>Destination Point</Popup>
      </Marker>

      <Marker id='My Location' position={[latitude, longitude]} ref={markerRef}>
        <Popup>My Location</Popup>
      </Marker>
    </MapContainer>
  );
}
