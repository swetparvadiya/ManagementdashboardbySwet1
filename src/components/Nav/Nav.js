import React from "react";
import styles from "./Nav.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from "../../redux/actions";
import downarrow from "../../assets/downarrow.svg";
import User from "../../assets/userimage.svg";

const Nav = (props) => {
  const currentUser = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleAuth = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
    }
  };

  const { displayName } = currentUser.currentUser._delegate;
  return (
    <div className={styles.border}>
      <div className={styles.nav}>
        <div>
          <p className={styles.userName}>{displayName}</p>
          <p className={styles.userAddress}>Surat, India</p>

          <img src={User} alt="/" className={styles.profileimage} />

          <img
            src={downarrow}
            alt="nodownarrowimage"
            className={styles.dropdown}
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <p className={styles.logout} onClick={handleAuth}>
                Logout
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
