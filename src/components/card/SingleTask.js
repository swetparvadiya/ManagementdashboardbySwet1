import React from "react";
import styles from "./card.module.css";
import editdeleteproject from "../../assets/editdeleteproject.svg";
import user from "../../assets/users.svg";
import comments from "../../assets/comments.png";
import files from "../../assets/files.png";
import { deleteDoc, doc, getDoc, getFirestore } from "firebase/firestore";

import { useDispatch } from "react-redux";
import { app } from "../../firebase";
import {
  removebody,
  bodyChange,
  discriptionChange,
  selectChange,
} from "../../action/body";
import Draggable from "react-draggable";

const SingleTask = (props) => {
  const db = getFirestore(app);

  const dispatch = useDispatch();

  const handleEdit = (e) => {
    const box = document.querySelector(".add-note-form");
    const box_body = document.querySelector("#body");

    const getData = async () => {
      const data = await getDoc(doc(db, "TASK", props.id));

      if (data.exists()) {
        box.style.display = "flex";
        dispatch(bodyChange(data.data().body));
        dispatch(discriptionChange(data.data().discription));
        dispatch(selectChange(data.data().select));
        box_body.focus();
        dispatch(removebody(props.id));
        delDoc();
      }
    };

    getData();
  };

  const handleDelete = (e) => {
    dispatch(removebody(props.id));

    delDoc();
  };

  const delDoc = async (id) => {
    const del = await deleteDoc(doc(db, "TASK", props.id));
  };

  return (
    <Draggable draggableId="TODO">
      <div className={styles.task}>
        <div className={styles.taskHeader}>
          <div className={styles.taskPriority}>
            <p className={styles.taskpriorityText}>{props.select}</p>
          </div>
          <div>
            <img
              src={editdeleteproject}
              alt="noeditdeletetask"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <p
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleTaskEditModal"
                  id="edit"
                  onClick={handleEdit}
                >
                  Edit Task
                </p>
              </li>
              <li>
                <p
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleDeleteTaskModal"
                  id="delete"
                  onClick={handleDelete}
                >
                  Delete Task
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.taskName}>{props.body}</div>
        <div className={styles.taskName}>{props.discription}</div>
        <div className={styles.taskFooter}>
          <img src={user} alt="nouserImage" className={styles.userImage} />
          <div className={styles.comments}>
            <img
              src={comments}
              alt="nocommentsImage"
              className={styles.commentsImage}
            />
            <p className={styles.commentsText}>12 comments</p>
          </div>
          <div className={styles.files}>
            <img src={files} alt="nofilesImage" className={styles.filesImage} />
            <p className={styles.filesText}>0 files</p>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default SingleTask;
