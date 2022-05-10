import React from 'react';
import {Link} from "react-router-dom";
import Header from '../components/Header';

class Categorias extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            datosCargados:false,
            DataCategorias:[] 
        }
    }

    eliminarCategoria(id){
        var datos = {id:id};
        fetch("http://localhost/apiCrudReact/BD.php?eliminarCategoria=1",{
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
        fetch("http://localhost/apiCrudReact/BD.php?Categoria=1")
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.setState({datosCargados:true, DataCategorias:datosRespuesta})
        })
        .catch()
    }

    componentDidMount(){
        this.cargarDatos();
    }

    render() { 

        const{datosCargados, DataCategorias}=this.state;

        if(!datosCargados){return(<div>Cargando...</div>)}
        else{
            return (
                <>
                <Header />
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <Link className="btn btn-success" to="/crearCategoria" >Agregar Categoría</Link>
                        </div>
                        <div className="card-body">
                            <h4>Lista de Categorías</h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Nombre</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {DataCategorias ?
                                    DataCategorias.map(
                                        (categoria)=>(
                                            <tr key={categoria.id_categoria}>
                                                <td>{categoria.id_categoria}</td>
                                                <td>{categoria.nombre}</td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="">
                                                        <Link className="btn btn-warning" to={"/editarCategoria/"+categoria.id_categoria}>Editar</Link>
                                                        <button type="button" className="btn btn-danger" onClick={()=>this.eliminarCategoria(categoria.id_categoria)}>
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
 
export default Categorias;