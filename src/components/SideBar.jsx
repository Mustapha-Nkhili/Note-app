import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function SideBar({
  addNotes,
  notes,
  handleNoteClick,
  currentNoteId,
  removeNote,
}) {
  return (
    <div className="notes-sideBar">
      <header>
        <span>notes</span>
        <button onClick={addNotes}>+</button>
      </header>
      <div className="notes">
        {notes.map((note, index) => {
          const currentDate = new Date();
          const noteDate = new Date(note.updateAt);
          const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          const noteYear =
            noteDate.getFullYear() === currentDate.getFullYear()
              ? ""
              : noteDate.getFullYear();

          const noteMonth =
            noteDate.getMonth() === currentDate.getMonth()
              ? ""
              : month[noteDate.getMonth()];

          const noteDay =
            noteDate.getDate() === currentDate.getDate()
              ? ""
              : `${noteDate.getDate()}, `;

          const hour =
            noteYear === "" && noteMonth === "" && noteDay === ""
              ? `Today, ${
                  noteDate.getHours() < 10
                    ? `0${noteDate.getHours()}`
                    : noteDate.getHours()
                }:${
                  noteDate.getMinutes() < 10
                    ? `0${noteDate.getMinutes()}`
                    : noteDate.getMinutes()
                }`
              : "";

          return (
            <div
              className={`note ${currentNoteId === note.id ? "active" : ""}`}
              key={note.id}
              id={note.id}
              onClick={handleNoteClick}
            >
              <span className="note-title">
                {note.title === "" ? `Note ${index + 1}` : note.title}
              </span>
              <span className="note-summary-title">
                {note.body.match(/.+/)}
              </span>
              <button
                type="button"
                onClick={() => removeNote(note)}
                className="delete-note-btn"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <span className="note-date">{`${noteMonth} ${noteDay}${noteYear} ${hour}`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
