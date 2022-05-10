import './App.css';
import Autores from "./components/Autores";
import EditarAutor from "./components/EditarAutor";
import CrearAutor from './components/CrearAutor'
import Categorias from "./components/Categorias";
import EditarCategoria from "./components/EditarCategoria";
import CrearCategoria from './components/CrearCategoria'
import Peliculas from "./components/Peliculas";
import CrearPelicula from "./components/CrearPelicula";
import EditarPelicula from "./components/EditarPelicula";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Autores/>}></Route>
          <Route path="/crearAutor" element={<CrearAutor/>}></Route>
          <Route path={"/editarAutor/:id"} element={<EditarAutor/>}></Route>
          <Route path="/categoria" element={<Categorias/>}></Route>
          <Route path="/crearCategoria" element={<CrearCategoria/>}></Route>
          <Route path={"/editarCategoria/:id"} element={<EditarCategoria/>}></Route>
          <Route path="/pelicula" element={<Peliculas/>}></Route>
          <Route path="/crearPelicula" element={<CrearPelicula/>}></Route>
          <Route path={"/editarPelicula/:id"} element={<EditarPelicula/>}></Route>
        </Routes>
    </Router>
  );
}

export default App;
