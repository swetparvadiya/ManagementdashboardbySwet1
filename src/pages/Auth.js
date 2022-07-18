import React from "react";
import Nav from "../components/Nav/Nav";
import Sidebar from "../components/sidebar/Sidebar";
import Body from "../components/Body/Body";
import Card from "../components/card/card";

import styles from "./Home.module.css";
import { useSelector } from "react-redux";
const Auth = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  return (
    <div>
      <div className={styles.menu}>
        <Sidebar user={user} />
      </div>
      <div className={styles.main}>
        <Nav user={user} />
        <Body />
        <Card />
      </div>
    </div>
  );
};

export default Auth;
