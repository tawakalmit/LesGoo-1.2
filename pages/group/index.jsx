import { useState, useEffect } from 'react';
import Navbargroup from '../../components/navbargroup';
import Footbar from '../../components/footbar';
import dynamic from 'next/dynamic';

export default function group() {

  const Getmap = dynamic(() => import('../../components/getmap'), {
    ssr: false
  });

  const [location, setLocation] = useState({ lat: -6.7169157, lng: 107.0296782});
  const [destination, setDestination] = useState({ lat: -6.7310985770600755, lng: 107.04116821289064});
  const [latitude, setLatitude] = useState({lat:null});
  const [longitude, setLongitude] = useState({lng:null});

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  })

  return (
    <>
      <div className='bg-slate-500 '>
        <Navbargroup />
        <div>
        <Getmap
          popup_label="Start Location"
          center={location}
          location={location}
          destination={destination}
          latitude={latitude}
          longitude={longitude}
          />
        </div>
        <div className='p-2 mb-16'>
          <div className='flex mb-2'>
            <div
              className='rounded py-2 px-3'
              style={{ backgroundColor: '#F2F2F2' }}
            >
              <p className='text-sm text-teal'>Sylverter Stallone</p>
              <p className='text-sm mt-1'>
                Hi everyone! Glad you could join! I am making a new movie.
              </p>
              <p className='text-right text-xs text-grey-dark mt-1'>12:45 pm</p>
            </div>
          </div>

          <div className='flex mb-2'>
            <div
              className='rounded py-2 px-3'
              style={{ backgroundColor: '#F2F2F2' }}
            >
              <p className='text-sm text-purple'>Tom Cruise</p>
              <p className='text-sm mt-1'>
                Hi all! I have one question for the movie
              </p>
              <p className='text-right text-xs text-grey-dark mt-1'>12:45 pm</p>
            </div>
          </div>

          <div className='flex mb-2'>
            <div
              className='rounded py-2 px-3'
              style={{ backgroundColor: '#F2F2F2' }}
            >
              <p className='text-sm text-orange'>Harrison Ford</p>
              <p className='text-sm mt-1'>Again?</p>
              <p className='text-right text-xs text-grey-dark mt-1'>12:45 pm</p>
            </div>
          </div>

          <div className='flex mb-2'>
            <div
              className='rounded py-2 px-3'
              style={{ backgroundColor: '#F2F2F2' }}
            >
              <p className='text-sm text-orange'>Russell Crowe</p>
              <p className='text-sm mt-1'>Is Andrés coming for this one?</p>
              <p className='text-right text-xs text-grey-dark mt-1'>12:45 pm</p>
            </div>
          </div>

          <div className='flex mb-2'>
            <div
              className='rounded py-2 px-3'
              style={{ backgroundColor: '#F2F2F2' }}
            >
              <p className='text-sm text-teal'>Sylverter Stallone</p>
              <p className='text-sm mt-1'>He is. Just invited him to join.</p>
              <p className='text-right text-xs text-grey-dark mt-1'>12:45 pm</p>
            </div>
          </div>

          <div className='flex justify-end mb-2'>
            <div
              className='rounded py-2 px-3'
              style={{ backgroundColor: '#E2F7CB' }}
            >
              <p className='text-sm mt-1'>Hi guys.</p>
              <p className='text-right text-xs text-grey-dark mt-1'>12:45 pm</p>
            </div>
          </div>

          <div className='flex justify-end mb-2'>
            <div
              className='rounded py-2 px-3'
              style={{ backgroundColor: '#E2F7CB' }}
            >
              <p className='text-sm mt-1'>Count me in</p>
              <p className='text-right text-xs text-grey-dark mt-1'>12:45 pm</p>
            </div>
          </div>
          <div className='flex mb-2'>
            <div
              className='rounded py-2 px-3'
              style={{ backgroundColor: '#F2F2F2' }}
            >
              <p className='text-sm text-teal'>Sylverter Stallone</p>
              <p className='text-sm mt-1'>
                Hi everyone! Glad you could join! I am making a new movie.
              </p>
              <p className='text-right text-xs text-grey-dark mt-1'>12:45 pm</p>
            </div>
          </div>

          <div className='flex mb-2'>
            <div
              className='rounded py-2 px-3'
              style={{ backgroundColor: '#F2F2F2' }}
            >
              <p className='text-sm text-purple'>Tom Cruise</p>
              <p className='text-sm mt-1'>
                Hi all! I have one question for the movie
              </p>
              <p className='text-right text-xs text-grey-dark mt-1'>12:45 pm</p>
            </div>
          </div>

          <div className='flex mb-2'>
            <div
              className='rounded py-2 px-3'
              style={{ backgroundColor: '#F2F2F2' }}
            >
              <p className='text-sm text-orange'>Harrison Ford</p>
              <p className='text-sm mt-1'>Again?</p>
              <p className='text-right text-xs text-grey-dark mt-1'>12:45 pm</p>
            </div>
          </div>

          <div className='flex mb-2'>
            <div
              className='rounded py-2 px-3'
              style={{ backgroundColor: '#F2F2F2' }}
            >
              <p className='text-sm text-orange'>Russell Crowe</p>
              <p className='text-sm mt-1'>Is Andrés coming for this one?</p>
              <p className='text-right text-xs text-grey-dark mt-1'>12:45 pm</p>
            </div>
          </div>

          <div className='flex mb-2'>
            <div
              className='rounded py-2 px-3'
              style={{ backgroundColor: '#F2F2F2' }}
            >
              <p className='text-sm text-teal'>Sylverter Stallone</p>
              <p className='text-sm mt-1'>He is. Just invited him to join.</p>
              <p className='text-right text-xs text-grey-dark mt-1'>12:45 pm</p>
            </div>
          </div>

          <div className='flex justify-end mb-2'>
            <div
              className='rounded py-2 px-3'
              style={{ backgroundColor: '#E2F7CB' }}
            >
              <p className='text-sm mt-1'>Hi guys.</p>
              <p className='text-right text-xs text-grey-dark mt-1'>12:45 pm</p>
            </div>
          </div>

          <div className='flex justify-end mb-2'>
            <div
              className='rounded py-2 px-3'
              style={{ backgroundColor: '#E2F7CB' }}
            >
              <p className='text-sm mt-1'>Count me in</p>
              <p className='text-right text-xs text-grey-dark mt-1'>12:45 pm</p>
            </div>
          </div>
        </div>
        <Footbar />
      </div>
    </>
  );
}
