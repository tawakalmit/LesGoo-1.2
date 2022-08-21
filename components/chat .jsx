import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useDispatch, useSelector } from 'react-redux';
import { setChats } from '../redux/chat';
import { useRouter } from 'next/router';

export default function Chat() {
  const router = useRouter();
  const chats = useSelector((state) => state.chats.chats);
  const dispatch = useDispatch();

  const token = getCookie('usr_token');
  const username = getCookie('usr_username');
  const group_id = getCookie('usr_group_id');

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
    if (!group_id) {
      router.push('/');
    }
    fetchData();
  }, []);

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
        // console.log(data);
        dispatch(
          setChats({
            status: data.status,
            groupname: data.name,
            chats: data.chats,
            created_at: data.created_at,
          })
        );
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally();
  };

  return (
    <>
      {chats?.map((chat) => {
        return (
          <div key={chat.id} className='p-2 mb-2'>
            <div
              className={`flex ${
                chat.username == username ? 'justify-end' : ''
              }`}
            >
              <div
                className='rounded py-2 px-3 max-w-xs'
                style={{
                  backgroundColor: `${
                    chat.username == username ? '#E2F7CB' : '#F2F2F2'
                  }`,
                }}
              >
                <p className='text-sm text-teal'>{chat.username}</p>
                <p className='text-sm mt-1'>{chat.message}</p>
                <p className='text-right text-xs text-grey-dark mt-1'>
                  {/* {chat.created_at} */}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
