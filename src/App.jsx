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
    }
  );

  const handleNoteTextChanges = (e) => {
    const { value, name, type, checked } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData(updatedFormData);
    console.log(formData);
    localStorage.setItem(currentNoteId, JSON.stringify(updatedFormData));
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNotes = () => {
    let newNote = {
      id: nanoid(),
      title: "",
      body: "",
    };
    // console.log(newNote.noteStyles);
    setNotes([...notes, newNote]);
    setCurrentNoteId(newNote.id);
    setNoteText("");
    setNoteTitle("");
  };

  const findCurrentNoteId = (e) => {
    const note = e.target.classList.contains("note")
      ? e.target
      : e.target.parentElement;

    const id = note.id;

    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === id) {
        setCurrentNoteId(id);
        setNoteText(notes[i].body);
        setNoteTitle(notes[i].title);
        setFormData(
          JSON.parse(localStorage.getItem(notes[i].id)) || {
            bold: false,
            italic: false,
            underline: false,
          }
        );
      }
    }

    const sideBarContainer = note.parentElement.parentElement;
    sideBarContainer.classList.add("clicked");
  };

  const updateNote = (e) => {
    const { value } = e.target;
    setNoteText(value);
    setNotes((oldNotes) =>
      oldNotes.map((note) =>
        note.id === currentNoteId ? { ...note, body: value } : note
      )
    );
  };

  // const [noteStyles, setNoteStyles] = useState({});
  // console.log(noteStyles)
  // useEffect(() => {
  //   setNoteStyles(() => {
  //     notes.map((note) => {
  //       if (note.id === currentNoteId) {
  //         return note.noteStyles;
  //       }
  //     });
  //   });
  // }, [notes, currentNoteId]);

  const updateNoteTitle = (e) => {
    const { value } = e.target;
    setNoteTitle(value);
    setNotes((notes) => {
      return notes.map((note) => {
        return note.id === currentNoteId ? { ...note, title: value } : note;
      });
    });
  };
  return (
    <div className="container">
      <SideBar
        addNotes={addNotes}
        notes={notes}
        currentNoteId={currentNoteId}
        findCurrentNoteId={findCurrentNoteId}
        // noteTitle={noteTitle}
      />
      <Editor
        noteContent={noteText}
        handleNoteChanges={updateNote}
        updateNoteTitle={updateNoteTitle}
        noteTitle={noteTitle}
        handleNoteTextChanges={handleNoteTextChanges}
        formData={formData}
        // styles={JSON.parse(localStorage.getItem("notes")) || {}}
      />
    </div>
  );
}
