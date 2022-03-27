import NotesContext from "./notesContext";
import { useState } from "react";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesinitial = []
  
  const [notes, setNotes] = useState(notesinitial)
  const getallnotes = async() => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzM2JkYzI4MGNmMjEzZmM2OTU5MjcxIn0sImlhdCI6MTYzMDgzMjI2OH0.nGppplRPETWckmm4BUYHNIRO-Jzp65SmdlxdIgCxcHA"
      }
    });
    const json = await response.json()
    setNotes(json)
  }

  const addNote = async(title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzM2JkYzI4MGNmMjEzZmM2OTU5MjcxIn0sImlhdCI6MTYzMDgzMjI2OH0.nGppplRPETWckmm4BUYHNIRO-Jzp65SmdlxdIgCxcHA"
      },
      body: JSON.stringify({title, description, tag})
    });


    const note = {
      "_id": "6e6b0ba",
      "user": "6133bdc280cf213fc6959271",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-06T19:33:12.414Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }
  const deleteNote = async(id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzM2JkYzI4MGNmMjEzZmM2OTU5MjcxIn0sImlhdCI6MTYzMDgzMjI2OH0.nGppplRPETWckmm4BUYHNIRO-Jzp65SmdlxdIgCxcHA"
      }
    });


    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  const editNote = async(id,title,description,tag) =>{

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzM2JkYzI4MGNmMjEzZmM2OTU5MjcxIn0sImlhdCI6MTYzMDgzMjI2OH0.nGppplRPETWckmm4BUYHNIRO-Jzp65SmdlxdIgCxcHA"
      },
      body: JSON.stringify({title, description, tag})
    });

    const json = await response.json(); 

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

  return (
    <NotesContext.Provider value={{ notes, setNotes, addNote, deleteNote ,getallnotes,editNote}}>
      {props.children}
    </NotesContext.Provider>
  )
}

export default NoteState