import React from "react";
import { Link } from "react-router-dom";
import styles from "./Project.module.css";

import addProject from "../../assets/addProject.svg";
import Cross from "../../assets/x.png";

import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  doc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

import { add, titleChange } from "../../action";
import { async } from "@firebase/util";
import { app, db } from "../../firebase";
import Printproject from "./printproject";

const Project = () => {
  const slug = useParams();
  const [added, setAdded] = useState(false);

  const db = getFirestore(app);

  const title = useSelector((store) => store.title);

  useEffect(() => {
    const getData = async () => {
      const snapshot = await getDocs(collection(db, "PROJECT"));
      console.log(snapshot);
      snapshot.forEach((doc) => {
        const { title } = doc.data();
        dispatch(add(doc.id, title));
      });
    };
    try {
      getData();
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    addToDB(title);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
    dispatch(titleChange(""));
  };

  const addToDB = async (title) => {
    const addRef = await addDoc(collection(db, "PROJECT"), {
      title: title,
      id: uuidv4(),
    });
    showDataAfterSubmit(addRef.id);
  };

  const boxref = createRef();

  const handleShowBox = () => {
    boxref.current.style.display = "flex";
  };

  const handleCloseBox = () => {
    boxref.current.style.display = "none";
  };

  const showDataAfterSubmit = async (id) => {
    const docRef = await getDoc(doc(db, "PROJECT", id));

    if (docRef.exists()) {
      const { title } = docRef.data();
      dispatch(add(docRef.id, title));
    }
  };

  const handleTitleChange = (e) => {
    dispatch(titleChange(e.target.value));
  };

  return (
    <div>
      <div className="add-note"></div>
      <div className={styles.sidebarProjects}>
        <br />
        <br />
        <div className={styles.addProject}>
          <h4>My project</h4>

          <img
            src={addProject}
            alt="noprojectimage"
            type="button"
            className={styles.im}
            onClick={handleShowBox}
          />
        </div>
        <div>
          <div className="add-note-form" ref={boxref}>
            <img
              src={Cross}
              alt=""
              onClick={handleCloseBox}
              className={styles.cros}
            />
            <input
              type="text"
              placeholder="Title"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
            <button onClick={handleSubmit} className={styles.inp}>
              Submit
            </button>
          </div>
        </div>
        <div>
          <div className={styles.list12}>
            <Printproject />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
