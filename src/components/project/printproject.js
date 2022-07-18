import { useSelector } from "react-redux";

import SingleNote from "./SingleNot";
function Printproject() {
  const notes = useSelector((state) => state.notes);

  return (
    <div className="notes-list">
      {notes.length <= 0 ? (
        <h3>No Notes Found</h3>
      ) : (
        notes.map((note, index) => {
          return (
            <>
              <SingleNote
                id={note.id}
                key={index}
                title={note.title}
                date={note.date}
              />
            </>
          );
        })
      )}
    </div>
  );
}

export default Printproject;
