import React from 'react';
import { useParams } from "react-router-dom";
import Header from './Header';
import { Link, Navigate } from "react-router-dom"

function withRouter(Component) {
    function ComponentWithRouter(props) {
      let params = useParams()
      return <Component {...props} params={params} />
    }
    return ComponentWithRouter
  }

class EditarPelicula extends React.Component {
    constructor(props) {
        super(props);
        this.state = { datosCargados:false,
            DataPelicula:[],
            DataAutores:[],
            DataCategorias: [],
            peliculaEdit: false
        }
    }

    cambioValor = (e) =>{
        e.preventDefault();
        const state = this.state.DataPelicula;
        state[e.target.name] = e.target.value;
        this.setState({DataPelicula:state});
    }

    enviarDatosPelicula = (e) =>{
        e.preventDefault();
        var datos = {
            id_pelicula: this.state.DataPelicula.id_pelicula, 
            nombre: this.state.DataPelicula.nombre,
            id_autor: this.state.DataPelicula.id_autor,
            id_categoria: this.state.DataPelicula.id_categoria,
            fecha_lanzamiento: this.state.DataPelicula.fecha_lanzamiento,
            productora: this.state.DataPelicula.productora
        };

        fetch("http://localhost/apiCrudReact/BD.php?EditarPelicula=1",{
            method: "POST",
            body: JSON.stringify(datos)
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.setState({peliculaEdit : true});
        })
        .catch()
    }
    
    componentDidMount(){
        const {id} = this.props.params 
        
        fetch("http://localhost/apiCrudReact/BD.php?ExtraerPelicula=1",{
            method: "POST",
            body: JSON.stringify({id:id})
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.setState({datosCargados:true, DataPelicula:datosRespuesta[0]})
        })
        .catch()

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
        const{datosCargados, DataPelicula, DataAutores, DataCategorias, peliculaEdit}=this.state;

        if(!datosCargados){return(<div>Cargando...</div>)}
        else{
            return (
                <>
                <Header/>
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            Editar Película
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.enviarDatosPelicula}>
                                <div className="form-group">
                                  <label htmlFor="id_pelicula"></label>
                                  <input type="text" readOnly name="id_pelicula" id="id_pelicula" onChange={this.cambioValor} value={DataPelicula.id_pelicula} className="form-control" placeholder="" aria-describedby="helpId"/>
                                  <small id="helpId" className="text-muted">Id Película</small>
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input type="text" onChange={this.cambioValor} value={DataPelicula.nombre} name="nombre" id="nombre" className="form-control" aria-describedby="helpId" required />
                                    <small id="helpId" className="text-muted">Digita el nombre de la película</small>
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label htmlFor="id_autor">Autor</label>
                                    <select className="form-control" onChange={this.cambioValor} value={DataPelicula.id_autor} name="id_autor" id="id_autor"  required>
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
                                  <label htmlFor="id_categoria">Categoría</label>
                                  <select className="form-control" onChange={this.cambioValor} value={DataPelicula.id_categoria} name="id_categoria" id="id_categoria" required>
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
                                    className="form-control" onChange={this.cambioValor} value={DataPelicula.fecha_lanzamiento} name="fecha_lanzamiento" id="fecha_lanzamiento" aria-describedby="helpId" placeholder="" required/>
                                  <small id="helpId" className="form-text text-muted">Seleccione la fecha de publicación de la película</small>
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label htmlFor="productora">Productora</label>
                                    <input type="text" onChange={this.cambioValor} value={DataPelicula.productora} name="productora" id="productora" className="form-control" aria-describedby="helpId" required />
                                    <small id="helpId" className="text-muted">Digita el nombre de la productora</small>
                                </div>
                                <br></br>
                                <div className="btn-group" role="group" aria-label="">
                                    <button type="submit" className="btn btn-success">Agregar</button>
                                    {peliculaEdit && <Navigate replace to="/pelicula" />}
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
}
 
export default withRouter(EditarPelicula);