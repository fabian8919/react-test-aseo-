import React from 'react';
import {Link} from "react-router-dom";
import Header from '../components/Header';

class Peliculas extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            datosCargados:false,
            DataPeliculas:[] 
        }
    }

    eliminarPelicula(id){
        var datos = {id:id};
        fetch("http://localhost/apiCrudReact/BD.php?eliminarPelicula=1",{
            method: "POST",
            body: JSON.stringify(datos)
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.cargarDatos();
        })
        .catch()
    }

    cargarDatos(){
        fetch("http://localhost/apiCrudReact/BD.php?Peliculas=1")
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.setState({datosCargados:true, DataPeliculas:datosRespuesta})
        })
        .catch()
    }

    componentDidMount(){
        this.cargarDatos();
    }

    render() { 

        const{datosCargados, DataPeliculas}=this.state;

        if(!datosCargados){return(<div>Cargando...</div>)}
        else{
            return (
                <>
                <Header />
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <Link className="btn btn-success" to="/crearPelicula" >Agregar Película</Link>
                        </div>
                        <div className="card-body">
                            <h4>Lista de Películas</h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Nombre</th>
                                        <th>Nombre Autor</th>
                                        <th>Nombre Categoría</th>
                                        <th>Fecha Lanzamiento</th>
                                        <th>Productora</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {DataPeliculas ?
                                    DataPeliculas.map(
                                        (pelicula)=>(
                                            <tr key={pelicula.id_pelicula}>
                                                <td>{pelicula.id_pelicula}</td>
                                                <td>{pelicula.nombre_peli}</td>
                                                <td>{pelicula.nombre_autor}</td>
                                                <td>{pelicula.nombre_cate}</td>
                                                <td>{pelicula.fecha_lanzamiento}</td>
                                                <td>{pelicula.productora}</td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="">
                                                        <Link className="btn btn-warning" to={"/editarPelicula/"+pelicula.id_pelicula}>Editar</Link>
                                                        <button type="button" className="btn btn-danger" onClick={()=>this.eliminarPelicula(pelicula.id_pelicula)}>
                                                            Eliminar</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )
                                    : <tr>
                                        <td>SIN REGISTROS</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                }
                                    
                                </tbody>
                            </table>
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
 
export default Peliculas;