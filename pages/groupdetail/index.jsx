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
      'https://virtserver.swaggerhub.com/faqihassyfa/LesGoo/1.0.0/group/1',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;
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
        participants={dataGroup.length}
      />

      <Description des={dataGroup.description} />

      <div className='h-fit w-full bg-[#d9d9d9] mt-10'>
        <h2 className='p-3'>Participants</h2>
        <div className='mt-5 pl-3'>
          {dataGroup.group_users.map((user) => {
            return <Contact key={user} name={user.username} />;
          })}
        </div>
      </div>
    </div>
  );
}
