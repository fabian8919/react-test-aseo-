import React from 'react';
import Header from '../components/Header';
import { Link, Navigate } from "react-router-dom"

class CrearAutor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nombreAutor: "", autorAdd: false }
    }
    

    cambioValor = (e) =>{
        e.preventDefault();
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({state});
    }

    enviarDatosAutor = (e) =>{
        e.preventDefault();
        
        const {nombreAutor} = this.state;
        var datos = {nombre: nombreAutor};
        fetch("http://localhost/apiCrudReact/BD.php?insertarAutor=1",{
            method: "POST",
            body: JSON.stringify(datos)
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.setState({autorAdd : true});
        })
        .catch()
    }

    render() { 

        const {nombreAutor, autorAdd} = this.state;

        return ( 
            <>
                <Header/>
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            Crear Autor
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.enviarDatosAutor}>
                                <div className="form-group">
                                    <label htmlFor="nombreAutor"></label>
                                    <input type="text" onChange={this.cambioValor} value={nombreAutor} name="nombreAutor" id="nombreAutor" className="form-control" aria-describedby="helpId" required/>
                                    <small id="helpId" className="text-muted">Digita el nombre del autor</small>
                                </div>
                                <br></br>
                                <div className="btn-group" role="group" aria-label="">
                                    <button type="submit" className="btn btn-success">Agregar</button>
                                    {autorAdd && <Navigate replace to="/" />}
                                    <Link to="/" className="btn btn-danger">Cancelar</Link>
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
 
export default CrearAutor;