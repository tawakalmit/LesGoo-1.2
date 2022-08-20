import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import Notification from '../components/notification';
import store from '../store';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Notification>
          <Component {...pageProps} />
        </Notification>
      </Provider>
    </>
  );
}

export default MyApp;
