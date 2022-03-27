import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink exact className="nav-link" activeClassName="active" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact className="nav-link" activeClassName="active" to="/about">About</NavLink>
              </li>
            </ul>
            <Link to="/login" role="button" className="btn btn-info mx-2">Login</Link>
            <Link to="/signup" role="button" className="btn btn-info mx-2">Sign Up</Link>
          </div>

        </div>
      </nav>
    </>
  )
}
