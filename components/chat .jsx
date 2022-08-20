import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useDispatch, useSelector } from 'react-redux';
import { setChats } from '../redux/chat';

export default function Chat() {
  const chats = useSelector((state) => state.chats.chats);
  const dispatch = useDispatch();

  const token = getCookie('usr_token');
  const username = getCookie('usr_username');
  const group_id = getCookie('usr_group_id');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(group_id),
    };
    fetch(
      'https://virtserver.swaggerhub.com/faqihassyfa/LesGoo/1.0.0/group/chats',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const { data } = result;
        // console.log(data);
        dispatch(
          setChats({
            status: data.status,
            groupname: data.name,
            chats: data.chats,
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
      {chats.map((chat) => {
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
                  12:45 pm
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
