import { deleteDoc, doc, getDoc, getFirestore } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import editdeleteproject from "../../assets/editdeleteproject.svg";
import { Link } from "react-router-dom";
import styles from "./Project.module.css";
import { bodyChange, remove, titleChange } from "../../action";

import { app } from "../../firebase";

function SingleNote(props) {
  const db = getFirestore(app);

  const dispatch = useDispatch();

  const handleEdit = (e) => {
    const box = document.querySelector(".add-note-form");
    const box_title = document.querySelector("#title");

    const getData = async () => {
      const data = await getDoc(doc(db, "PROJECT", props.id));
      console.log("dataTOD", data);
      if (data.exists()) {
        box.style.display = "flex";
        dispatch(titleChange(data.data().title));
        box_title.focus();
        dispatch(remove(props.id));
        delDoc();
      }
    };

    getData();
  };

  const handleDelete = (e) => {
    dispatch(remove(props.id));

    delDoc();
  };

  const delDoc = async (id) => {
    const del = await deleteDoc(doc(db, "PROJECT", props.id));
  };

  return (
    <div className="">
      <ul>
        <li className={styles.notess}>
          •
          <Link to={/project/ + props.id} className={styles.none}>
            <h5>{props.title}</h5>
          </Link>
          <div>
            <img
              src={editdeleteproject}
              alt="noeditdeletetask"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              className={styles.not}
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
        </li>
      </ul>
    </div>
  );
}

export default SingleNote;
