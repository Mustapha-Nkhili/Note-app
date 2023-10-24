export default function SideBar({
  addNotes,
  notes,
  findCurrentNoteId,
  currentNoteId,
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
              onClick={findCurrentNoteId}
            >
              <span className="note-title">{note.title === "" ? `Note ${index + 1}` : note.title}</span>
              <span className="note-summary-title">
                {note.body.match(/.+/)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
