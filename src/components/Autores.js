import React from 'react';
import {Link} from "react-router-dom";
import Header from '../components/Header';

class Autores extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            datosCargados:false,
            DataAutores:[] 
        }
    }

    eliminarAutor(id){
        var datos = {id:id};
        fetch("http://localhost/apiCrudReact/BD.php?eliminarAutor=1",{
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
        fetch("http://localhost/apiCrudReact/BD.php?Autores=1")
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.setState({datosCargados:true, DataAutores:datosRespuesta})
        })
        .catch()
    }

    componentDidMount(){
        this.cargarDatos();
    }

    render() { 

        const{datosCargados, DataAutores}=this.state;

        if(!datosCargados){return(<div>Cargando...</div>)}
        else{
            return (
                <>
                <Header />
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <Link className="btn btn-success" to="/crearAutor" >Agregar Autor</Link>
                        </div>
                        <div className="card-body">
                            <h4>Lista de Autores</h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Nombre</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {DataAutores ?
                                    DataAutores.map(
                                        (autor)=>(
                                            <tr key={autor.id_autor}>
                                                <td>{autor.id_autor}</td>
                                                <td>{autor.nombre}</td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="">
                                                        <Link className="btn btn-warning" to={"/editarAutor/"+autor.id_autor}>Editar</Link>
                                                        <button type="button" className="btn btn-danger" onClick={()=>this.eliminarAutor(autor.id_autor)}>
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
 
export default Autores;