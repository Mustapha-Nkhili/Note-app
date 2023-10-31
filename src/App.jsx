import SideBar from "./components/SideBar";
import Editor from "./components/Editor";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";

export default function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || [
      {
        id: nanoid(),
        title: "",
        body: "",
      },
    ]
  );
  const [noteText, setNoteText] = useState(notes[0].body);
  const [currentNoteId, setCurrentNoteId] = useState(notes[0].id);
  const [noteTitle, setNoteTitle] = useState(notes[0].title);
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem(currentNoteId)) || {
      bold: false,
      italic: false,
      underline: false,
      fontFamily: "serif",
      align: "",
      fontSize: "16",
      color: "#80838a",
    }
  );

  useEffect(() => {
    const handlePreLoader = () => {
      const preLoader = document.getElementById("preLoader");
      if (preLoader) {
        preLoader.style.display = "none";
      }
    };
    window.addEventListener("load", handlePreLoader);

    return () => {
      window.removeEventListener("load", handlePreLoader);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNotes = () => {
    let newNote = {
      id: nanoid(),
      title: "",
      body: "",
    };
    setNotes([...notes, newNote]);
    setCurrentNoteId(newNote.id);
    setNoteText("");
    setNoteTitle("");
  };

  const handleNoteClick = (e) => {
    const note = e.target.classList.contains("note")
      ? e.target
      : e.target.parentElement;

    const id = note.id;

    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === id) {
        setCurrentNoteId(id);
        setNoteText(notes[i].body);
        setNoteTitle(notes[i].title);
        setFormData(JSON.parse(localStorage.getItem(notes[i].id)) || {});
      }
    }

    const sideBarContainer = note.parentElement.parentElement;
    sideBarContainer.classList.add("clicked");
  };

  const moveEditedNoteToTop = () => {
    const newNotes = [...notes];
    let indexOfEditedNote = newNotes.findIndex(
      (note) => note.id === currentNoteId
    );
    newNotes.unshift(newNotes.splice(indexOfEditedNote, 1)[0]);
    setNotes(newNotes);
  };

  const handleNoteTextChanges = (e) => {
    const { value, name, type, checked } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    moveEditedNoteToTop();
    setFormData(updatedFormData);
    localStorage.setItem(currentNoteId, JSON.stringify(updatedFormData));
  };

  const updateNoteTitle = (e) => {
    const { value } = e.target;

    moveEditedNoteToTop();
    setNoteTitle(value);
    setNotes((notes) => {
      return notes.map((note) => {
        return note.id === currentNoteId ? { ...note, title: value } : note;
      });
    });
  };

  const updateNoteText = (e) => {
    const { value } = e.target;

    moveEditedNoteToTop();
    setNoteText(value);
    setNotes((oldNotes) =>
      oldNotes.map((note) =>
        note.id === currentNoteId ? { ...note, body: value } : note
      )
    );
  };

  const removeNote = (deletedNote) => {
    if (notes.length > 1) {
      let noteIndex = notes.findIndex((note) => note.id === deletedNote.id);
      const newNotes = notes.filter((note) => note !== deletedNote);
      setNotes(newNotes);
      console.log(noteIndex);
      document
        .getElementById(notes[noteIndex === 0 ? 1 : noteIndex - 1].id)
        .click();
    }
  };

  return (
    <>
      <div className="pre-loader" id="preLoader">
        <span className="loader"></span>
      </div>
      <div className="container">
        <SideBar
          addNotes={addNotes}
          notes={notes}
          currentNoteId={currentNoteId}
          handleNoteClick={handleNoteClick}
          removeNote={removeNote}
        />
        <Editor
          noteContent={noteText}
          handleNoteChanges={updateNoteText}
          updateNoteTitle={updateNoteTitle}
          noteTitle={noteTitle}
          handleNoteTextChanges={handleNoteTextChanges}
          formData={formData}
        />
      </div>
    </>
  );
}
