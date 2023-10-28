import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faCircleLeft,
  faItalic,
  faUnderline,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

export default function Editor({
  noteContent,
  handleNoteChanges,
  updateNoteTitle,
  noteTitle,
  handleNoteTextChanges,
  formData,
  styles,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const fontSizesArray = [8, 9, 12, 14, 16, 18, 20, 24, 30, 36, 48, 64, 72, 96];

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
    fontFamily: `${formData.fontFamily}, system-ui, Avenir, Helvetica, Arial, sans-serif`,
    fontWeight: formData.bold ? "bold" : "normal",
    fontStyle: formData.italic ? "italic" : "normal",
    textDecoration: formData.underline ? "underline" : "none",
    textAlign: formData.align,
    fontSize: `${formData.fontSize}px`,
    color: formData.color,
  };

  return (
    <div className="editor">
      <header className="editor-header">
        <div className="edit-note-text">
          {/* Start font family */}
          <div className="note-font container">
            <select
              name="fontFamily"
              id="fontFamily"
              onChange={handleNoteTextChanges}
              value={formData.fontFamily}
            >
              <option value="sans serif">Sans Serif</option>
              <option value="serif">Serif</option>
              <option value="roboto">Roboto</option>
              <option value="open sans">Open Sans</option>
              <option value="bad script">Bad Script</option>
            </select>
          </div>
          {/* End font family */}

          {/* Start font size */}
          <div className="note-font-size container">
            <select
              name="fontSize"
              id="fontSize"
              onChange={handleNoteTextChanges}
              value={formData.fontSize}
            >
              {fontSizesArray.map((fontSize, index) => {
                return (
                  <option value={fontSize} key={index}>
                    {fontSize}
                  </option>
                );
              })}
            </select>
          </div>
          {/* End font size */}

          {/* Start color */}
          <div className="color container">
            <input
              type="color"
              name="color"
              id="textColor"
              onChange={handleNoteTextChanges}
              value={formData.color}
            />
            <label htmlFor="textColor">
              <FontAwesomeIcon icon={faAngleDown} />
            </label>
          </div>
          {/* End color */}

          {/* start styles */}
          <div className="text-styles container">
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
          {/* End styles */}

          {/* start Align */}
          <div className="align container">
            <input
              type="radio"
              name="align"
              id="alignLeft"
              onChange={handleNoteTextChanges}
              value="left"
              checked={formData.align === "left"}
            />
            <label htmlFor="alignLeft">
              <FontAwesomeIcon icon={faAlignLeft} />
            </label>
            <input
              type="radio"
              name="align"
              id="alignCenter"
              onChange={handleNoteTextChanges}
              value="center"
              checked={formData.align === "center"}
            />
            <label htmlFor="alignCenter">
              <FontAwesomeIcon icon={faAlignCenter} />
            </label>
            <input
              type="radio"
              name="align"
              id="alignRight"
              onChange={handleNoteTextChanges}
              value="right"
              checked={formData.align === "right"}
            />
            <label htmlFor="alignRight">
              <FontAwesomeIcon icon={faAlignRight} />
            </label>
            <input
              type="radio"
              name="align"
              id="alignJustify"
              onChange={handleNoteTextChanges}
              value="justify"
              checked={formData.align === "justify"}
            />
            <label htmlFor="alignJustify">
              <FontAwesomeIcon icon={faAlignJustify} />
            </label>
          </div>
          {/* End align */}
        </div>
        <hr />
        {/* Note title */}
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
