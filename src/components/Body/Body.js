import React from "react";
import downarrow from "../../assets/downarrow.svg";
import calendar from "../../assets/calendar.svg";
import inviteuser from "../../assets/inviteuser.svg";
import editIcon from "../../assets/editIcon.svg";
import linkIcon from "../../assets/linkIcon.svg";
import styles from "./body.module.css";
import filterIcon from "../../assets/filterIcon.svg";
import users from "../../assets/users.svg";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const Body = () => {
  const slug = useParams();
  console.log(slug);

  const projectDetail = useSelector((state) => state.notes);
  const currentProject = projectDetail.find((item) => item.id === slug.id);

  return (
    <div>
      <div>
        <div className={styles}>
          <p className={styles.project}>
            {currentProject ? <p>{currentProject.title}</p> : ""}
            <img src={editIcon} alt="noediticonimage" />
            <img src={linkIcon} alt="nolinkiconimage" />
          </p>
          <div className={styles.line}>
            <img
              src={inviteuser}
              alt="noinviteuserimage"
              className={styles.in}
            />
            <p className={styles.inv}>Invite</p>
            <img src={users} alt="nousersimage" className={styles.im} />
          </div>
        </div>
      </div>
      <div className={styles.filtersection}>
        <div className={styles.filter}>
          <img
            src={filterIcon}
            alt="nofiltericonimage"
            className={styles.filtericonimage}
          />
          <p className={styles.filterword}>Filter</p>
          <img
            src={downarrow}
            alt="nodownarrowimage"
            className={styles.downarrowimage}
          />
        </div>
        <div className={styles.filter}>
          <img
            src={calendar}
            alt="nofiltericonimage"
            className={styles.filtericonimage}
          />
          <p className={styles.filterword}>Today</p>
          <img
            src={downarrow}
            alt="nodownarrowimage"
            className={styles.downarrowimage}
          />
        </div>
      </div>
    </div>
  );
};

export default Body;
