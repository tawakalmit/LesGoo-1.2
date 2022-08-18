import { useState, useEffect } from 'react';
import Navbargroup from '../../components/navbargroup';
import Footbar from '../../components/footbar';
import dynamic from 'next/dynamic';
import Chat from '../../components/chat ';
import { getCookie } from 'cookies-next';

export default function Group() {
  const group_id = getCookie('usr_group_id');
  const token = getCookie('usr_token');

  const Getmap = dynamic(() => import('../../components/getmap'), {
    ssr: false,
  });

  const [location, setLocation] = useState({
    lat: -6.7169157,
    lng: 107.0296782,
  });
  const [destination, setDestination] = useState({
    lat: -6.7310985770600755,
    lng: 107.04116821289064,
  });
  const [latitude, setLatitude] = useState({ lat: null });
  const [longitude, setLongitude] = useState({ lng: null });

  useEffect(() => {
    fetchData();
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  });

  const fetchData = async () => {
    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/${group_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;
        const { id, username, email, phone } = data;
        setId(id);
        setUsername(username);
        setEmail(email);
        setPhone(phone);
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className='bg-slate-500 h-screen'>
        <Navbargroup />
        <div>
          <Getmap
            popup_label='Start Location'
            center={location}
            location={location}
            destination={destination}
            latitude={latitude}
            longitude={longitude}
          />
        </div>
        <Chat />
        <Footbar />
      </div>
    </>
  );
}
