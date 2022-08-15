import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Notification from '../components/notification';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Notification>
        <Component {...pageProps} />
      </Notification>
    </>
  );
}

export default MyApp;
