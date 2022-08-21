import { useEffect, useState } from 'react';
import Deshead from '../../components/deshead';
import Description from '../../components/description';
import Contact from '../../components/contact';
import { setCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function GroupDetail() {
  const [dataGroup, setDataGroup] = useState({
    group_id: '',
    group_name: '',
    group_img: '',
    description: '',
    group_users: [],
  });
  const router = useRouter();
  const token = getCookie('usr_token');
  const group_id = getCookie('usr_group_id');

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
    if (!group_id) {
      router.push('/');
    }
    console.log('hee');
    fetchData();
  }, []);

  const fetchData = async () => {
    var requestOptions = {
      method: 'GET',
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
        console.log(data);
        setDataGroup((state) => ({
          ...state,
          group_id: data.id,
          group_name: data.name,
          group_img: data.groupimg,
          description: data.description,
          group_users: data.group_users,
        }));
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(console.log(dataGroup));
  };
  return (
    <div className='bg-[#ecf0f1] border-0 h-full md:w-[425px] mx-auto border-2 border-[#2c3e50] pb-10 lg:min-h-screen xl:h-screen'>
      <Head>
        <title>LesGoo | Group Detail</title>
        <link rel='icon' href='/icon.png' />
      </Head>
      <Deshead
        groupname={dataGroup.group_name}
        groupid={dataGroup.group_id}
        participants={dataGroup.group_users.length}
      />

      <Description des={dataGroup.description} />

      <div className='h-fit w-full bg-[#d9d9d9] mt-10'>
        <h2 className='p-3'> {dataGroup.group_users.length} Participants</h2>
        <div className='mt-2 pl-3'>
          {dataGroup.group_users.map((user) => {
            return <Contact key={user} name={user.username} />;
          })}
        </div>
      </div>
    </div>
  );
}
