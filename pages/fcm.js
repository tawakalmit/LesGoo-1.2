import Notification from '../components/notification';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Notification>
      <div className={styles.container}>
        <main className={styles.main}>
          <h2>Home Page</h2>
        </main>
      </div>
    </Notification>
  );
}
