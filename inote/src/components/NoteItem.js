import React,{useContext} from 'react'
import notesContext from '../context/notes/notesContext'

export const NoteItem = (props) => {

    const context = useContext(notesContext)
    const {deleteNote} = context

    return (
        <div className="card m-2 notesitem">
            <div className="card-header border-bottom border-secondary">
                <div className="note-title">
                    {props.notes.title}
                </div>
                <div className="card-buttons">
                    <button className="btn btn-success mx-1 card-btn" onClick={()=>props.updateNote(props.notes)}><i className="fas fa-edit"></i></button>
                    <button className="btn btn-danger mx-1 card-btn" onClick={()=> deleteNote(props.notes._id)}><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>
            <div className="card-body">
                <p className="card-text">{props.notes.description}</p>
                <a href="/" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
}
