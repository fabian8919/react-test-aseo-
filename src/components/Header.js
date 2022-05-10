import React from 'react'
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className="nav navbar-nav">
                <Link className="nav-item nav-link active" to="/">Autores </Link>
                <Link className="nav-item nav-link" to="/categoria">Categorías </Link>
                <Link className="nav-item nav-link" to="/pelicula">Películas </Link>
            </div>
        </nav>
        <br></br>
        <br></br>
    </div>
  )
}
