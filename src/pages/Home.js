import React from "react";
import Nav from "../components/Nav/Nav";
import Sidebar from "../components/sidebar/Sidebar";
import Body from "../components/Body/Body";
import Card from "../components/card/card";
import { Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";

import styles from "./Home.module.css";
const Home = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);

  return (
    <div>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.main}>
        <Nav user={user} />
      </div>
    </div>
  );
};

export default Home;
