"use client";
import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo/logo.tsx";
import Submenu from "./submenu/submenu.tsx";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerToggler = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen((prevState) => !prevState);
  };
  const pathname = useLocation().pathname;
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <header className={styles.header}>
      <Logo />
      <div
        className={
          isOpen ? `${styles.overlay} ${styles.overlayOpen}` : styles.overlay
        }
      ></div>
      <nav className={isOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav}>
        <Link
          to="/"
          className={pathname === "/" ? styles.activeLink : styles.nav__link}
        >
          Home
        </Link>
        <Link
          to={"/about"}
          className={
            pathname === "/about" ? styles.activeLink : styles.nav__link
          }
        >
          About
        </Link>
        <Link
          to="/"
          className={
            pathname === "/contact" ? styles.activeLink : styles.nav__link
          }
        >
          Contact Us
        </Link>
      </nav>
      <Submenu className={styles.submenu} />
      <button
        className={
          isOpen
            ? `${styles.hamburger} ${styles.hamburgerOpen}`
            : styles.hamburger
        }
        onClick={(e) => hamburgerToggler(e)}
      >
        {" "}
        <span className={styles.hamburger__bar}></span>
      </button>
    </header>
  );
};

export default Header;
