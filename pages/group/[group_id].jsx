import { useState, useEffect } from 'react';
import Navbargroup from '../../components/navbargroup';
import Footbar from '../../components/footbar';
import dynamic from 'next/dynamic';
import Chat from '../../components/chat ';
import { getCookie } from 'cookies-next';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Group() {
  const token = getCookie('usr_token');

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  });

  const [alerted, setAlerted] = useState(false);

  if (alerted) {
    Swal.fire({
      backdrop: `rgba(231, 76, 60, .7)`,
      title: 'ALERT',
      html: 'there are members left behind',
    });
  }

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
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position.coords);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  });

  return (
    <>
      <Head>
        <title>LesGoo | Group</title>
        <link rel='icon' href='/icon.png' />
      </Head>
      <div className='bg-slate-500 min-h-screen md:w-[425px] mx-auto border-[#2c3e50] pb-10'>
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
        <div className='pt-72'>
          <Chat />
        </div>
        <Footbar />
      </div>
    </>
  );
}
