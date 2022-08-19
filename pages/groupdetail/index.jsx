import { useEffect, useState } from 'react';
import Head from '../../components/head';
import Description from '../../components/description';
import Contact from '../../components/contact';
import { setCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

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

  if (!token) {
    router.push('/login');
  }

  useEffect(() => {
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
    <div>
      <Head
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
