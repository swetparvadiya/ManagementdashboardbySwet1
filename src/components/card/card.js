import React, { useState, useEffect } from "react";
import styles from "./card.module.css";
import editdeleteproject from "../../assets/editdeleteproject.svg";
import { useParams } from "react-router-dom";
import user from "../../assets/users.svg";
import comments from "../../assets/comments.png";
import files from "../../assets/files.png";
import addProject from "../../assets/addProject.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  addbody,
  bodyChange,
  discriptionChange,
  selectChange,
} from "../../action/body";

import { app } from "../../firebase";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
const Card = () => {
  const db = getFirestore(app);
  const slug = useParams();

  const bodys = useSelector((store) => store.bodyRed);
  const currentProject = bodys.filter((item) => item.projectId === slug.id);
  const itemsFromBackend = [];

  const columnsFromBackend = {
    [uuid()]: {
      name: "Requested",
      items: itemsFromBackend,
    },
    [uuid()]: {
      name: "To do",
      items: [],
    },
    [uuid()]: {
      name: "Completed",
      items: [],
    },
  };

  useEffect(() => {
    setColumns({
      [uuid()]: {
        name: "TODO",
        status: "to-do",
        items: currentProject,
        dot: "tododot",
        progress: "todopro",
        nam: "todonam",
        im: "todoim",
      },
      [uuid()]: {
        name: "ONPROGRESS",
        status: "on-progress",
        items: [],
        dot: "progressdot",
        progress: "onpro",
        nam: "onnam",
        im: "onprogressim",
      },
      [uuid()]: {
        name: "Completed",
        status: "completed",
        items: [],
        dot: "completedDot",
        progress: "compro",
        nam: "comnam",
        im: "completedim",
      },
    });
  }, [currentProject.length]);
  const [columns, setColumns] = useState(columnsFromBackend);

  const getData = async () => {
    const snapshot = await getDocs(collection(db, "TASK"));
    snapshot.forEach((doc) => {
      const { body, discription, projectId, select, status } = doc.data();
      dispatch(addbody(doc.id, body, discription, projectId, select, status));
    });
  };

  const onDragEnd = async (result, columns) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
    }

    const data = await getDoc(doc(db, "TASK", draggableId));
    const taskDocRef = doc(db, "TASK", draggableId);

    await updateDoc(taskDocRef, {
      status: columns[result.destination.droppableId].status,
    });

    await getData();
  };

  const [added, setAdded] = useState(false);

  const body = useSelector((store) => store.body);
  const discription = useSelector((store) => store.discription);
  const select = useSelector((store) => store.select);

  useEffect(() => {
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
      id: uuid(),
      body: body,
      discription: discription,
      projectId: slug.id,
      select: select,
      status: "to-do",
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
    dispatch(selectChange(e.target.value));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "15px",
                alignItems: "center",
                backgroundColor: "#F5F5F5",
              }}
              key={columnId}
            >
              <div>
                <p className={styles[column.dot]}></p>
                <p className={styles[column.nam]}>{column.name}</p>
                <div className={styles[column.im]}>
                  <img
                    src={addProject}
                    alt=""
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
                          <option value="select">Select</option>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                      <button onClick={handleSubmit}> Task</button>
                    </li>
                  </ul>
                </div>
                <div className={styles[column.progress]}></div>
              </div>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    const currentProject = bodys.filter(
                      (item) =>
                        item.projectId === slug.id &&
                        item.status === column.status
                    );

                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "#F5F5F5",
                          padding: 4,
                          width: 400,
                          minHeight: 500,
                        }}
                      >
                        {currentProject.map((item, index) => {
                          console.log("item", item);
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <div className={styles.card}>
                                      <div>
                                        <div className={styles.sel}>
                                          {item.select}
                                        </div>
                                        <div>
                                          <h3 className={styles.bod}>
                                            {item.body}
                                          </h3>
                                        </div>
                                        <img
                                          src={editdeleteproject}
                                          alt="noeditdeletetask"
                                          className={styles.edit}
                                          id="dropdownMenuButton1"
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
                                              id="edit"
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
                                            >
                                              Delete Task
                                            </p>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className={styles.dis}>
                                        {item.discription}
                                      </div>
                                      <img
                                        src={user}
                                        alt="nouserImage"
                                        className={styles.userImage}
                                      />
                                      <div>
                                        <img
                                          src={comments}
                                          alt="nocommentsImage"
                                          className={styles.commentsImage}
                                        />
                                        <p className={styles.commentsText}>
                                          <h6>12 comments</h6>
                                        </p>
                                      </div>
                                      <div className={styles.files}>
                                        <img
                                          src={files}
                                          alt="nofilesImage"
                                          className={styles.filesImage}
                                        />
                                        <p className={styles.filesText}>
                                          0 files
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default Card;
