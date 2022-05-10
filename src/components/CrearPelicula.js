import React from 'react';
import Header from '../components/Header';
import { Link, Navigate } from "react-router-dom"

class CrearPelicula extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            nombrePelicula : "",
            select_autor: "",
            select_categoria: "",
            fecha_lanzamiento:"",
            productora:"",
            DataAutores:[],
            DataCategorias:[],
            peliculaAdd : false
        }
    }
    
    cambioValor = (e) =>{
        e.preventDefault();
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({state});
    }

    enviarDatosPelicula = (e) =>{
        e.preventDefault();
        var datos = {
            nombre: this.state.nombrePelicula,
            id_autor: this.state.select_autor,
            id_categoria: this.state.select_categoria,
            fecha_lanzamiento: this.state.fecha_lanzamiento,
            productora: this.state.productora
        };

        fetch("http://localhost/apiCrudReact/BD.php?insertarPelicula=1",{
            method: "POST",
            body: JSON.stringify(datos)
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.setState({peliculaAdd : true});
        })
        .catch()
    }

    componentDidMount(){
        fetch("http://localhost/apiCrudReact/BD.php?Autores=1")
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.setState({datosCargados:true, DataAutores:datosRespuesta})
        })
        .catch()

        fetch("http://localhost/apiCrudReact/BD.php?Categoria=1")
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.setState({datosCargados:true, DataCategorias:datosRespuesta})
        })
        .catch()
    }

    render() { 

        const {DataAutores, nombrePelicula, fecha_lanzamiento, peliculaAdd, DataCategorias, productora} = this.state;

        return ( 
            <>
                <Header/>
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            Crear Película
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.enviarDatosPelicula}>
                                <div className="form-group">
                                    <label htmlFor="nombrePelicula">Nombre</label>
                                    <input type="text" onChange={this.cambioValor} value={nombrePelicula} name="nombrePelicula" id="nombrePelicula" className="form-control" aria-describedby="helpId" required />
                                    <small id="helpId" className="text-muted">Digita el nombre de la película</small>
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label htmlFor="select_autor">Autor</label>
                                    <select className="form-control" onChange={this.cambioValor} name="select_autor" id="select_autor"  required>
                                        <option value="">Seleccione un autor...</option>
                                        {
                                            DataAutores.map(
                                                (autor)=>(
                                                    <option key={autor.id_autor} value={autor.id_autor}>{autor.nombre}</option>
                                                )
                                            )
                                        }
                                  </select>
                                </div>
                                <br></br>
                                <div className="form-group">
                                  <label htmlFor="select_categoria">Categoría</label>
                                  <select className="form-control" onChange={this.cambioValor} name="select_categoria" id="select_categoria" required>
                                    <option value="">Seleccione un categoria...</option>
                                      {
                                        DataCategorias.map(
                                            (categoria)=>(
                                                <option key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.nombre}</option>
                                            )
                                        )
                                      }
                                  </select>
                                </div>
                                <br></br>
                                <div className="form-group">
                                  <label htmlFor="fecha_lanzamiento">Fecha de publicación</label>
                                  <input type="date"
                                    className="form-control" onChange={this.cambioValor} value={fecha_lanzamiento} name="fecha_lanzamiento" id="fecha_lanzamiento" aria-describedby="helpId" placeholder="" required/>
                                  <small id="helpId" className="form-text text-muted">Seleccione la fecha de publicación de la película</small>
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label htmlFor="productora">Productora</label>
                                    <input type="text" onChange={this.cambioValor} value={productora} name="productora" id="productora" className="form-control" aria-describedby="helpId" required />
                                    <small id="helpId" className="text-muted">Digita el nombre de la productora</small>
                                </div>
                                <br></br>
                                <div className="btn-group" role="group" aria-label="">
                                    <button type="submit" className="btn btn-success">Agregar</button>
                                    {peliculaAdd && <Navigate replace to="/pelicula" />}
                                    <Link to="/pelicula" className="btn btn-danger">Cancelar</Link>
                                </div>
                            </form>
                        </div>


                        <div className="card-footer text-muted">
                            
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
 
export default CrearPelicula;