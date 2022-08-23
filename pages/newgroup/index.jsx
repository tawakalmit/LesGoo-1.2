import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import Head from 'next/head';
import { getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';
import Swal from 'sweetalert2';

import { CgProfile } from 'react-icons/cg';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import Navbarback from '../../components/navbarback';

export default function Newgroup() {
  const Map = dynamic(() => import('../../components/map'), {
    ssr: false,
  });
  const route = useRouter();
  const token = getCookie('usr_token');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [objSubmit, setObjSubmit] = useState({});
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [groupimg, setGroupimg] = useState('');
  const [start_dest, setStart_dest] = useState({
    lat: -6.7169157,
    lng: 107.0296782,
  });
  const [final_dest, setFinal_dest] = useState({
    lat: -6.7169157,
    lng: 107.0296782,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      route.push('/login');
    }
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setStart_dest(pos);
      setFinal_dest(pos);
    });
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    for (const key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }
    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/group`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code < 300) {
          const { group_id } = result;
          setCookie('usr_group_id', group_id);
          route.push(`/group/${group_id}`);
          const { message } = result;
          Swal.fire(message);
          setObjSubmit({});
        }
      })
      .catch((error) => console.log('error', error))
      .finally(() => setLoading(false));
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  const handlePosition = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  const handleCoordChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = { value };
    setObjSubmit(temp);
  };

  return (
    <div className='bg-[#ecf0f1] border-0 md:h-full w-[425px] mx-auto border-2 border-[#2c3e50] pb-10'>
      <Head>
        <title>LesGoo | New Group</title>
        <link rel='icon' href='/icon.png' />
      </Head>
      <Navbarback title={'New Group'} />
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className='w-full h-fit bg-white'>
          <div className='w-10/12 mx-auto flex justify-around'>
            <Image src={groupimg} width={75} height={75} />
            <input
              id='input-groupname'
              type='text'
              placeholder=' type group subject'
              className='mt-5 w-9/12 rounded-xl bg-[#d9d9d9] p-5'
              onChange={(e) => handleChange(e.target.value, 'name')}
            />
          </div>
          <div className='w-fit mx-auto mt-3'>
            <input
              id='input-img'
              type='file'
              onChange={(e) => {
                setGroupimg(URL.createObjectURL(e.target.files[0]));
                handleChange(e.target.files[0], 'groupimg');
              }}
            />
          </div>
          <p className='text-xs text-center mt-3 opacity-50 pb-5'>
            Provide a group subject and optional group icon
          </p>
        </div>
        <div className='w-full mt-10 h-32 bg-white flex flex-col items-center'>
          <textarea
            id='input-groupdes'
            name='description'
            placeholder=' add group description'
            cols='30'
            rows='10'
            className='rounded-xl mt-5 h-24 bg-[#d9d9d9] w-10/12 p-5'
            onChange={(e) => handleChange(e.target.value, 'description')}
          ></textarea>
        </div>
        <div className='w-full mt-10 h-32 bg-white flex justify-around items-center'>
          <div className='bg-[#1abc9c] rounded'>
            <p className='text-center text-white'>Start Date</p>
            <input
              type='date'
              id='start-date'
              onChange={(e) => handleChange(e.target.value, 'start_date')}
            />
          </div>
          <div className='bg-[#1abc9c] rounded'>
            <p className='text-center text-white'>End Date</p>
            <input
              id='end-date'
              type='date'
              onChange={(e) => handleChange(e.target.value, 'end_date')}
            />
          </div>
        </div>
        <div className='w-full mt-10 h-auto bg-white'>
          <h2 className='p-3'>Start Location</h2>
          <Map
            popup_label='Start Location'
            center={start_dest}
            location={start_dest}
            draggable={true}
            onDragMarker={(e) => {
              let loc = { lat: e.lat, lng: e.lng };
              setStart_dest(loc);
              console.log(start_dest);
              console.log(loc);
              handleChange(e, 'start_dest');
            }}
          />
          {'lat: ' + start_dest.lat}
          <br />
          {'lng: ' + start_dest.lng}
        </div>
        <div className='w-full mt-10 h-auto bg-white'>
          <h2 className='p-3'>Set Destination</h2>
          <Map
            popup_label='Destination'
            center={final_dest}
            location={final_dest}
            draggable={true}
            onDragMarker={(e) => {
              let loc = { lat: e.lat, lng: e.lng };
              setFinal_dest(loc);
              handleChange(e, 'final_dest');
            }}
          />
          {'lat: ' + final_dest.lat}
          <br />
          {'lng: ' + final_dest.lng}
        </div>
        <div className='mt-10 w-full h-fit bg-white p-5'>
          <p className='text-center text-xs mb-5'>
            Fill the button below to access your position
          </p>
          <div className='flex w-fit mx-auto'>
            <div className='w-24 flex justify-around'>
              <input
                type='radio'
                onChange={(e) => {
                  handlePosition(latitude, 'latitude');
                }}
              />
              <p>Latitude</p>
            </div>
            <div className='w-24 flex justify-around'>
              <input
                type='radio'
                onChange={(e) => {
                  handlePosition(longitude, 'longitude');
                }}
              />
              <p>Longitude</p>
            </div>
          </div>
        </div>
        <button className='w-full flex justify-end mt-10'>
          <BsFillArrowRightCircleFill
            id='btn-newgroup'
            size={40}
            color='#1abc9c'
            className='mr-5'
          />
        </button>
      </form>
    </div>
  );
}
