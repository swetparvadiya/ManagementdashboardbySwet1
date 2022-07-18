import React from "react";
import styles from "./card.module.css";
import editdeleteproject from "../../assets/editdeleteproject.svg";
import { useParams } from "react-router-dom";
import user from "../../assets/users.svg";
import comments from "../../assets/comments.png";
import files from "../../assets/files.png";
import addProject from "../../assets/addProject.svg";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  doc,
} from "firebase/firestore";
import {
  addbody,
  bodyChange,
  discriptionChange,
  selectChange,
} from "../../action/body";

// import { v4 as uuidv4 } from "uuid";

import { app } from "../../firebase";
import CardList from "./CardList";
import SingleTask from "./SingleTask";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";

const Card = () => {
  const slug = useParams();

  const [added, setAdded] = useState(false);

  const db = getFirestore(app);

  const body = useSelector((store) => store.body);
  const discription = useSelector((store) => store.discription);
  const select = useSelector((store) => store.select);

  useEffect(() => {
    const getData = async () => {
      const snapshot = await getDocs(collection(db, "TASK"));
      snapshot.forEach((doc) => {
        const { body, discription, projectId, select } = doc.data();
        dispatch(addbody(doc.id, body, discription, projectId, select));
        console.log(select);
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
    addToDB(body, discription, select);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
    dispatch(bodyChange(""));
    dispatch(discriptionChange(""));
    dispatch(selectChange(""));
  };

  const addToDB = async (body, discription) => {
    const addRef = await addDoc(collection(db, "TASK"), {
      id: uuidv4(),
      body: body,
      discription: discription,
      projectId: slug.id,
      select: select,
      status: "To Do",
    });
    showDataAfterSubmit(addRef.id);
  };

  const showDataAfterSubmit = async (id) => {
    const docRef = await getDoc(doc(db, "TASK", id));

    if (docRef.exists()) {
      const { body, discription, projectId, select } = docRef.data();
      dispatch(addbody(docRef.id, body, discription, projectId, select));
    }
  };

  const handlebodyChange = (e) => {
    dispatch(bodyChange(e.target.value));
  };
  const handlediscriptionChange = (e) => {
    dispatch(discriptionChange(e.target.value));
  };
  const handleselectChange = (e) => {
    console.log(e.target.value, ">>>>>>>>>>>>>>>>>>>");

    console.log(typeof e.target.value, "fdgdgfdg");
    dispatch(selectChange(e.target.value));
  };

  const ondrag = (result) => {
    console.log(result);
  };

  return (
    <DragDropContext onDragEnd={ondrag}>
      <div className={styles.main}>
        <div className={styles.main1}>
          <div className={styles.onprogressHeader}>
            <p className={styles.tododot}></p>
            <div>
              <p className={styles.todotext12}>To Do</p>

              <img
                src={addProject}
                alt="noprojectimage"
                className={styles.fu}
                type="button"
                id12="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <div>
                    <input
                      type="text"
                      placeholder="body"
                      id="body"
                      value={body}
                      onChange={handlebodyChange}
                    />
                    <textarea
                      type="text"
                      placeholder="discription"
                      id="discription"
                      value={discription}
                      onChange={handlediscriptionChange}
                    />
                    <select
                      name="status"
                      id="status"
                      value={select}
                      onChange={handleselectChange}
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <button onClick={handleSubmit}> Task</button>
                </li>
              </ul>
            </div>
            <p className={styles.todolength12}></p>
          </div>

          <CardList />
        </div>
        <div className={styles.main1}>
          <div className={styles.onprogressHeader}>
            <p className={styles.tododot}></p>
            <p className={styles.todotext}>On Progress</p>
            <p className={styles.todolength}></p>
          </div>

          {/* <Draggable> */}
          <div className={styles.task}>
            <div className={styles.taskHeader}>
              <div className={styles.taskPriority}>
                <p className={styles.taskpriorityText}>High</p>
              </div>
              <img
                src={editdeleteproject}
                alt="noeditdeletetask"
                id12="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <p
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleTaskEditModal"
                  >
                    Edit Task
                  </p>
                </li>
                <li>
                  <p
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleDeleteTaskModal"
                  >
                    Delete Task
                  </p>
                </li>
              </ul>
            </div>
            <div className={styles.taskName}>sorting</div>
            <div className={styles.taskDescription}>sorting functionality</div>
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
                <img
                  src={files}
                  alt="nofilesImage"
                  className={styles.filesImage}
                />
                <p className={styles.filesText}>0 files</p>
              </div>
            </div>
          </div>
          {/* </Draggable> */}
        </div>

        <div className={styles.main1}>
          <div className={styles.onprogressHeader}>
            <p className={styles.tododot}></p>
            <p className={styles.todotext}>Completed</p>
            <p className={styles.todolength}></p>
          </div>

          {/* <Draggable> */}
          <div className={styles.task}>
            <div className={styles.taskHeader}>
              <div className={styles.taskPriority}>
                <p className={styles.taskpriorityText}>High</p>
              </div>
              <img
                src={editdeleteproject}
                alt="noeditdeletetask"
                id12="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <p
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleTaskEditModal"
                  >
                    Edit Task
                  </p>
                </li>
                <li>
                  <p
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleDeleteTaskModal"
                  >
                    Delete Task
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <div className={styles.taskName}>sorting</div>
              <div className={styles.taskDescription}>
                sorting functionality
              </div>
              <div className={styles.taskFooter}>
                <img
                  src={user}
                  alt="nouserImage"
                  className={styles.userImage}
                />
                <div className={styles.comments}>
                  <img
                    src={comments}
                    alt="nocommentsImage"
                    className={styles.commentsImage}
                  />
                  <p className={styles.commentsText}>12 comments</p>
                </div>
                <div className={styles.files}>
                  <img
                    src={files}
                    alt="nofilesImage"
                    className={styles.filesImage}
                  />
                  <p className={styles.filesText}>0 files</p>
                </div>
              </div>
            </div>
          </div>
          {/* </Draggable> */}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Card;
