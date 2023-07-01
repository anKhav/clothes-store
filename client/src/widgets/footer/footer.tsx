import style from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footer__wrapper}>
        <ul className={style.footer__list}>
          <h5 className={style.footer__title}>Company Info</h5>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Latest Posts</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a href="#">Shop</a>
          </li>
        </ul>
        <ul className={style.footer__list}>
          <h5 className={style.footer__title}>Company Info</h5>
          <li>
            <a href="#">Tracking</a>
          </li>
          <li>
            <a href="#">Order Status</a>
          </li>
          <li>
            <a href="#">Delivery</a>
          </li>
          <li>
            <a href="#">Shipping Info</a>
          </li>
          <li>
            <a href="#">FAQ</a>
          </li>
        </ul>
        <ul className={style.footer__list}>
          <h5 className={style.footer__title}>Company Info</h5>
          <li>
            <a href="#">Special Offers</a>
          </li>
          <li>
            <a href="#">Gift Cards</a>
          </li>
          <li>
            <a href="#">Advetising</a>
          </li>
          <li>
            <a href="#">Terms of Use</a>
          </li>
        </ul>
        <ul className={style.footer__list}>
          <h5 className={style.footer__title}>Company Info</h5>
          <div className={style.input__wrapper}>
            <input
              type="email"
              className={style.footer__input}
              placeholder="Enter email"
            />
            <span>&gt;</span>
          </div>
        </ul>
      </div>
      <div className={style.rights}>
        <div>
          <p className={style.rights__text}>© 2020 NorthStar eCommerce</p>
          <p className={style.rights__text}>
            Privacy Policy Terms & Conditions
          </p>
        </div>
        <div>
          <img src="/visa.png" alt="Visa icon" width={50} height={50} />
          <img src="/visa.png" alt="Visa icon" width={50} height={50} />
          <img src="/visa.png" alt="Visa icon" width={50} height={50} />
          <img src="/visa.png" alt="Visa icon" width={50} height={50} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;