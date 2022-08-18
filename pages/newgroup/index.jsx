import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import "leaflet/dist/leaflet.css"

import { CgProfile } from 'react-icons/cg';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import Navbarback from '../../components/navbarback';

export default function Newgroup() {
    const Map = dynamic(() => import('../../components/map'), {
        ssr: false
      });
    const route = useRouter();
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [objSubmit, setObjSubmit] = useState("")
    const [startdate, setStartdate] = useState("")
    const [enddate, setEnddate] = useState("")
    const [groupname, setGroupname] = useState("");
    const [groupdes, setGroupdes] = useState("");
    const [groupimg, setGroupimg] = useState("");
    const [location, setLocation] = useState({ lat: -6.7169157, lng: 107.0296782});
    const [destination, setDestination] = useState({ lat: -6.7169157, lng: 107.0296782});
    const [loading, setLoading] = useState(false)
    
    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(function(position) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        });
      })

      const handleSubmit = async (e) => {
        alert("group made")
        setLoading(true);
        e.preventDefault();
        const formData = new FormData();
        for (const key in objSubmit) {
          formData.append(key, objSubmit[key]);
        }
        var requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        };
    
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/..`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            alert("message");
            setObjSubmit({});
          })
          .catch((error) => console.log("error", error))
          .finally(() => setLoading(false));
      };

      const handleChange = (value, key) => {
        let temp = { ...objSubmit };
        temp[key] = value;
        setObjSubmit(temp);
      };

  return(
    <div className='bg-[#ecf0f1] border-0 md:h-full w-[425px] mx-auto border-2 border-[#2c3e50] pb-10'>
      <Navbarback title={'New Group'} />
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='w-full h-32 bg-white'>
          <div className='w-10/12 mx-auto flex justify-around'>
            <CgProfile
              id='input-groupimage'
              size={60}
              color='#2c3e50'
              className='mt-5'
            />
            <input
              id='input-groupname'
              type='text'
              placeholder=' type group subject'
              className='mt-5 w-9/12 rounded-xl bg-[#d9d9d9]'
            />
          </div>
          <p className='text-xs text-center mt-3 opacity-50'>
            Provide a group subject and optional group icon
          </p>
        </div>
        <div className='w-full mt-10 h-32 bg-white flex flex-col items-center'>
          <textarea id='input-groupdes' name="description" placeholder=' add group description' cols="30" rows="10" className='rounded-xl mt-5 h-24 bg-[#d9d9d9] w-10/12' onChange={(e) => handleChange(e.target.value, "groupdes")} ></textarea>
        </div>
        <div className='w-full mt-10 h-32 bg-white flex justify-around items-center'>
          <div className='bg-[#1abc9c] rounded'>
            <p className='text-center text-white'>Start Date</p>
            <input type="date" id='start-date' onChange={(e) => handleChange(e.target.value, "start-date")}  />
          </div>
          <div className='bg-[#1abc9c] rounded'>
            <p className='text-center text-white'>End Date</p>
            <input id='end-date' type="date" onChange={(e) => handleChange(e.target.value, "end-date")} />
          </div>
        </div>
        <div className='w-full mt-10 h-auto bg-white'>
          <h2 className='p-3'>Start Location</h2>
          <Map
          onChange={(e) => handleChange(e.target.value, "location")}
          popup_label="Start Location"
          center={location}
          location={location}
          draggable={true}
          onDragMarker={(e) => {
              let loc = { lat: e.lat, lng: e.lng };
              setLocation(loc);
              console.log("start", location)
              }}
          />
          {"lat: " + location.lat}
          <br />
          {"lng: " + location.lng}
        </div>
        <div className='w-full mt-10 h-auto bg-white'>
          <h2 className='p-3'>Set Destination</h2>
          <Map
          onChange={(e) => handleChange(e.target.value, "destination")}
          popup_label="Destination"
          center={destination}
          location={destination}
          draggable={true}
          onDragMarker={(e) => {
              let loc = { lat: e.lat, lng: e.lng };
              setDestination(loc);
              console.log("finish", destination)
              }}
          />
          {"lat: " + destination.lat}
          <br />
          {"lng: " + destination.lng}
        </div>
        <button className='w-full flex justify-end mt-10'>
          <BsFillArrowRightCircleFill id='btn-newgroup' size={40} color='#1abc9c' className='mr-5'/>
        </button>
      </form>
    </div>
  );
}
