export default function Editor({
  noteContent,
  handleNoteChanges,
  updateNoteTitle,
  noteTitle,
}) {
  return (
    <div className="editor">
      <header className="editor-header">
        <input
          type="text"
          className="note-title"
          name="noteTitle"
          placeholder="Title"
          onChange={updateNoteTitle}
          value={noteTitle}
        />
      </header>
      <hr />
      <textarea
        className="editor-body"
        placeholder="Enter your notes here"
        name="textContent"
        onChange={handleNoteChanges}
        value={noteContent}
      />
    </div>
  );
}
