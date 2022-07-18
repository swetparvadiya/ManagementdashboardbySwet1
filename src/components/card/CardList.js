import { useSelector } from "react-redux";

import SingleTask from "./SingleTask";
import { useParams } from "react-router-dom";
import { Droppable } from "react-beautiful-dnd";

function CardList() {
  const slug = useParams();

  const bodys = useSelector((store) => store.bodyRed);
  const currentProject = bodys.filter((item) => item.projectId === slug.id);

  return (
    <Droppable droppableId="TODO">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {currentProject.length <= 0 ? (
            <h3>No Notes Found</h3>
          ) : (
            currentProject.map((note, index) => {
              return (
                <SingleTask
                  id={note.id}
                  key={index}
                  body={note.body}
                  discription={note.discription}
                  select={note.select}
                  status={note.status}
                />
              );
            })
          )}
        </div>
      )}
    </Droppable>
  );
}

export default CardList;
