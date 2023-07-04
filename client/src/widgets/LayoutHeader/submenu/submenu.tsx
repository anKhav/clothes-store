
import { Link } from "react-router-dom";
import CartIcon from "./icons/cartIcon";
import styles from "./submenu.module.css";
import UserIcon from "./icons/userIcon";


const Submenu = () => {
  return (
    <nav className={styles.submenu}>
      <Link to="/profile" className={styles.submenu__item}>
        <UserIcon className={styles.submenu__icon} />
      </Link>
      <Link to="/cart" className={styles.submenu__item}>
        <CartIcon className={styles.submenu__icon} />
      </Link>
    </nav>
  );
};

export default Submenu;
