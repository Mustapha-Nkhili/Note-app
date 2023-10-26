import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faCircleLeft,
  faItalic,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";

export default function Editor({
  noteContent,
  handleNoteChanges,
  updateNoteTitle,
  noteTitle,
  handleNoteTextChanges,
  formData,
  styles
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleScreenResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleScreenResize);
    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, []);

  const backToNoteList = () => {
    const sideBar = document.querySelector(".notes-sideBar");
    if (sideBar) sideBar.classList.remove("clicked");
  };

  const noteStyles = {
    fontWeight: formData.bold ? "bold" : "normal",
    fontStyle: formData.italic ? "italic" : "normal",
    textDecoration: formData.underline ? "underline" : "none",
  }

  console.log(noteStyles)
  return (
    <div className="editor">
      <header className="editor-header">
        <div className="edit-note-text">
          <div className="text-styles">
            <input
              type="checkbox"
              name="bold"
              id="bold"
              onChange={handleNoteTextChanges}
              value={formData.bold}
              checked={formData.bold}
            />
            <label htmlFor="bold">
              <FontAwesomeIcon icon={faBold} />
            </label>
            <input
              type="checkbox"
              name="italic"
              id="italic"
              onChange={handleNoteTextChanges}
              value={formData.italic}
              checked={formData.italic}
            />
            <label htmlFor="italic">
              <FontAwesomeIcon icon={faItalic} />
            </label>
            <input
              type="checkbox"
              name="underline"
              id="underline"
              onChange={handleNoteTextChanges}
              value={formData.underline}
              checked={formData.underline}
            />
            <label htmlFor="underline">
              <FontAwesomeIcon icon={faUnderline} />
            </label>
          </div>
        </div>
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
        style={noteStyles}
        onChange={handleNoteChanges}
        value={noteContent}
        spellCheck="false"
      />
      {windowWidth <= 480 && (
        <span className="back-note-list-btn" onClick={backToNoteList}>
          <FontAwesomeIcon icon={faCircleLeft} />
        </span>
      )}
    </div>
  );
}
