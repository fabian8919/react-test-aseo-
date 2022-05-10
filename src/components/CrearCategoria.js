import React from 'react';
import Header from '../components/Header';
import { Link, Navigate } from "react-router-dom"

class CrearCategoria extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nombreCategoria: "", categoriaAdd: false }
    }
    
    cambioValor = (e) =>{
        e.preventDefault();
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({state});
    }

    enviarDatosCategoria = (e) =>{
        e.preventDefault();
        
        const {nombreCategoria} = this.state;
        var datos = {nombre: nombreCategoria};
        fetch("http://localhost/apiCrudReact/BD.php?insertarCategoria=1",{
            method: "POST",
            body: JSON.stringify(datos)
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.setState({categoriaAdd : true});
        })
        .catch()
    }

    render() { 

        const {nombreCategoria, categoriaAdd} = this.state;

        return ( 
            <>
                <Header/>
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            Crear Categoría
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.enviarDatosCategoria}>
                                <div className="form-group">
                                    <label htmlFor="nombreCategoria"></label>
                                    <input type="text" onChange={this.cambioValor} value={nombreCategoria} name="nombreCategoria" id="nombreCategoria" className="form-control" aria-describedby="helpId" required/>
                                    <small id="helpId" className="text-muted">Digita el nombre de la categoria</small>
                                </div>
                                <br></br>
                                <div className="btn-group" role="group" aria-label="">
                                    <button type="submit" className="btn btn-success">Agregar</button>
                                    {categoriaAdd && <Navigate replace to="/categoria" />}
                                    <Link to="/categoria" className="btn btn-danger">Cancelar</Link>
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
 
export default CrearCategoria;