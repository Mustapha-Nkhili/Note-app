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
            </div>
          );
        })}
      </div>
    </div>
  );
}
