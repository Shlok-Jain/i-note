import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

export const Signup = () => {
    const host="http://localhost:5000"

    const history = useHistory()

    const [note, setNote] = useState({name:"", email:"",password:""})
    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }

    const handlesubmit = async(event)=>{
        event.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:note.name,email:note.email,password:note.password})
          });
        const json = await response.json()
        if(json.success){
            localStorage.setItem('authtoken',json.authtoken)
            history.push("/")
        }
        else{
            alert("Invalid credentials")
        }
    }
    return (
        <form className="login container" onSubmit={handlesubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={note.name} onChange={onChange} placeholder="Enter Name" required minLength={3}/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={note.email} onChange={onChange} placeholder="Enter email" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={note.password} onChange={onChange} placeholder="Enter password" required minLength={5}/>
            </div>
            <div className="container">
                <button className="btn btn-success" type="submit">Login</button>
            </div>
        </form>
    )
}
