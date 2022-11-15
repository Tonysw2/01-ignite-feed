import igniteLogo from '../assets/ignite-logo.svg';
import styles from './Header.module.css';

export const Header = function () {
  return (
    <header className={styles.header}>
      <img src={igniteLogo} alt="Logo do ignite" />
      {/* <p>Ignite Feed</p> */}
    </header>
  );
};
