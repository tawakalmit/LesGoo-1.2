import React, { useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';

export default function Getmap({
  center,
  location,
  destination,
  latitude,
  longitude,
}) {
  const markerRef = useRef(null);

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
        console.log(data);
        const {start_dest, final_dest} = data;
        setStartDest(start_dest);
        setFinalDest(final_dest);
        let coba = start_dest.substr(7,29);
        coba = coba.replace(")", "")
        let [lat, lng] = coba.split(", ")
        let latInt = parseFloat(lat)
        let lngint = parseFloat(lng)
        const startDes = {lat: latInt, lng: lngint}
        setLocation(startDes)

        let cobain = final_dest.substr(7,29);
        cobain = cobain.replace(")", "")
        let [latFinal, lngFinal] = cobain.split(", ")
        let latIntFinal = parseFloat(latFinal)
        let lngintFinal = parseFloat(lngFinal)
        const finalDes = {lat: latIntFinal, lng: lngintFinal}
        setLocation(startDes)
        setDestination(finalDes)
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
