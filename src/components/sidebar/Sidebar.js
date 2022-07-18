import React from "react";
import styles from "./sidebar.module.css";
import { Link } from "react-router-dom";

import colorFilter from "../../assets/colorfilter.svg";
import home from "../../assets/home.svg";
import members from "../../assets/members.svg";
import settings from "../../assets/settings.svg";
import tasks from "../../assets/tasks.svg";
import sidebarArrow from "../../assets/siderbar_arrow.svg";
import Project from "../project/Project";

const Sidebar = () => {
  return (
    <div>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarHeaderContent}>
            <div className={styles.sidebarContent}>
              <img src={colorFilter} alt="nocolorfilterimage" />
              <p className={styles.sidebarHeaderContentText}>Project M.</p>
            </div>
            <img src={sidebarArrow} alt="nosidebararrowimage" />
          </div>
        </div>
        <div className={styles.sidebarMenu}>
          <div className={styles.sidebarHome}>
            <img src={home} alt="nohomeimage" />
            <Link to="/dashboard" className={styles.homeLink}>
              <p className={styles.sidebarMenuContentText}>Home</p>
            </Link>
          </div>
          <div className={styles.sidebarTasks}>
            <img src={tasks} alt="notaskimage" />
            <p className={styles.sidebarMenuContentText}>Tasks</p>
          </div>
          <div className={styles.sidebarMembers}>
            <img src={members} alt="nomemberimage" />
            <p className={styles.sidebarMenuContentText}>Members</p>
          </div>
          <div className={styles.sidebarSettings}>
            <img src={settings} alt="nosettingimage" />
            <p className={styles.sidebarMenuContentText}>Settings</p>
          </div>
          <div className={styles.sidebarLine}></div>
        </div>
      </div>
      <Project />
    </div>
  );
};

export default Sidebar;
