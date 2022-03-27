import React from 'react'
import { useContext, useState, useEffect, useRef } from 'react'
import notesContext from '../context/notes/notesContext'
import { NoteItem } from './NoteItem'

export const Notes = () => {

    const context = useContext(notesContext)
    const { notes,addNote, getallnotes ,editNote} = context
    useEffect(() => {
        getallnotes()
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id:"",title: "", description: "", tag: "" })
    const [enote, setEnote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }
    const oneChange = (event) => {
        setEnote({ ...enote, [event.target.name]: event.target.value })
    }
    const handleonclick = () => {
        addNote(note.title, note.description, note.tag)
        setNote({title: "", description: "", tag: ""})
    }
    const updateNote = (currentNote) => {
        ref.current.click();
        setEnote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }
    const handlesave = ()=>{
        editNote(enote.id, enote.etitle, enote.edescription, enote.etag)
        refClose.current.click();
    }

    return (
        <div className="container my-3">

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
            {/* form for updating note */}
                            <div className="mb-3">
                                <label htmlFor="Title" className="form-label modal-label">Title</label>
                                <input onChange={oneChange} value={enote.etitle} type="text" name="etitle" className="form-control" placeholder="Enter title" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edesription" className="form-label modal-label">Description</label>
                                <input onChange={oneChange} value={enote.edescription} type="text" name="edescription" className="form-control" placeholder="Enter title" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etag" className="form-label modal-label">Tag</label>
                                <input onChange={oneChange} value={enote.etag} type="text" name="etag" className="form-control" placeholder="Enter title" />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={enote.etitle.length<5 || enote.edescription.length<5} className="btn btn-primary" onClick={handlesave}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <h1>Add Notes</h1>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input onChange={onChange} id="title" type="text" name="title" className="form-text form-control" placeholder="Enter title" />
            </div>
            <div className="mb-3">
                <label htmlFor="desc" className="form-label">Description</label>
                <textarea onChange={onChange} name="description" className="form-control form-text" id="desc" rows="3" placeholder="Enter description"></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" onChange={onChange} name="tag" className="form-control form-text" id="tag" rows="3" placeholder="Enter tag"></input>
            </div>
            <div className="mb-3">
                <button disabled={note.title.length<3||note.description.length<5} className="btn btn-primary" onClick={handleonclick}>Add Note</button>
            </div>
            <div className="container my-3">
                <h1>Your Notes</h1>
                <div className="container my-3 notesclass">
                    {notes.length === 0 && 'No notes to display'}
                    {notes.map((note) => {
                        return <NoteItem notes={note} key={note._id} updateNote={updateNote} />
                    })}
                </div>
            </div>
        </div>
    )
}
