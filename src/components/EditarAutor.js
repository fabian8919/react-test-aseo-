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

class EditarAutor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { datosCargados:false,
            DataAutor:[],
            autorEdit: false
        }
    }

    cambioValor = (e) =>{
        e.preventDefault();
        const state = this.state.DataAutor;
        state[e.target.name] = e.target.value;
        this.setState({DataAutor:state});
    }

    enviarDatosAutor = (e) =>{
        e.preventDefault();
   
        var datos = {id:this.state.DataAutor.id_autor, nombre: this.state.DataAutor.nombre};
        fetch("http://localhost/apiCrudReact/BD.php?EditarAutor=1",{
            method: "POST",
            body: JSON.stringify(datos)
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.setState({autorEdit : true});
        })
        .catch()
    }
    
    componentDidMount(){
        const {id} = this.props.params 
        
        fetch("http://localhost/apiCrudReact/BD.php?ExtraerAutor=1",{
            method: "POST",
            body: JSON.stringify({id:id})
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.setState({datosCargados:true, DataAutor:datosRespuesta[0]})
        })
        .catch()
    }
    
    render() { 
        const{datosCargados, DataAutor, autorEdit}=this.state;

        if(!datosCargados){return(<div>Cargando...</div>)}
        else{
            return (
                <>
                <Header/>
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            Editar Autor
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.enviarDatosAutor}>

                                <div className="form-group">
                                  <label htmlFor=""></label>
                                  <input type="text" readOnly name="id_autor" id="id_autor" onChange={this.cambioValor} value={DataAutor.id_autor} className="form-control" placeholder="" aria-describedby="helpId"/>
                                  <small id="helpId" className="text-muted">Id Autor</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombre"></label>
                                    <input type="text" onChange={this.cambioValor} value={DataAutor.nombre} name="nombre" id="nombre" className="form-control" aria-describedby="helpId" required/>
                                    <small id="helpId" className="text-muted">Digita el nombre del autor</small>
                                </div>
                                <br></br>
                                <div className="btn-group" role="group" aria-label="">
                                    <button type="submit" className="btn btn-warning">Editar</button>
                                    {autorEdit && <Navigate replace to="/" />}
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
}
 
export default withRouter(EditarAutor);