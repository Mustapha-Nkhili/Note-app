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

          function getNoteYear() {
            let noteYear;
            if (noteDate.getFullYear() === currentDate.getFullYear()) {
              noteYear = "";
            } else {
              noteYear = `, ${noteDate.getFullYear()}`;
            }

            return noteYear;
          }

          function getNoteMonth() {
            let noteMonth;
            if (
              noteDate.getMonth() === currentDate.getMonth() &&
              noteDate.getDate() === currentDate.getDate()
            ) {
              noteMonth = "";
            } else {
              noteMonth = month[noteDate.getMonth()];
            }
            return noteMonth;
          }

          function getNoteDay() {
            let noteDay;
            if (noteDate.getDate() === currentDate.getDate()) {
              noteDay = "";
            } else {
              noteDay = noteDate.getDate();
            }
            return noteDay;
          }

          function getNoteHour() {
            let noteHour;
            if (getNoteYear() === "" && getNoteMonth() === "" && getNoteDay() === "") {
              noteHour = `Today, ${
                noteDate.getHours() < 10
                  ? `0${noteDate.getHours()}`
                  : noteDate.getHours()
              }:${
                noteDate.getMinutes() < 10
                  ? `0${noteDate.getMinutes()}`
                  : noteDate.getMinutes()
              }`
            } else {
              noteHour = "";
            }
            return noteHour;
          }

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
              <span className="note-date">{`${getNoteMonth()} ${getNoteDay()}${getNoteYear()} ${getNoteHour()}`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
