import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faCircleLeft } from "@fortawesome/free-solid-svg-icons";

export default function Editor({
  noteContent,
  handleNoteChanges,
  updateNoteTitle,
  noteTitle,
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

  return (
    <div className="editor">
      <header className="editor-header">
        <FontAwesomeIcon icon={faBold} />
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
