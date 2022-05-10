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

class EditarCategoria extends React.Component {
    constructor(props) {
        super(props);
        this.state = { datosCargados:false,
            DataCategoria:[],
            categoriaEdit: false
        }
    }

    cambioValor = (e) =>{
        e.preventDefault();
        const state = this.state.DataCategoria;
        state[e.target.name] = e.target.value;
        this.setState({DataCategoria:state});
    }

    enviarDatosAutor = (e) =>{
        e.preventDefault();
   
        var datos = {id:this.state.DataCategoria.id_categoria, nombre: this.state.DataCategoria.nombre};
        fetch("http://localhost/apiCrudReact/BD.php?EditarCategoria=1",{
            method: "POST",
            body: JSON.stringify(datos)
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.setState({categoriaEdit : true});
        })
        .catch()
    }
    
    componentDidMount(){
        const {id} = this.props.params 
        
        fetch("http://localhost/apiCrudReact/BD.php?ExtraerCategoria=1",{
            method: "POST",
            body: JSON.stringify({id:id})
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            this.setState({datosCargados:true, DataCategoria:datosRespuesta[0]})
        })
        .catch()
    }
    
    render() { 
        const{datosCargados, DataCategoria, categoriaEdit}=this.state;

        if(!datosCargados){return(<div>Cargando...</div>)}
        else{
            return (
                <>
                <Header/>
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            Editar Categoria
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.enviarDatosAutor}>

                                <div className="form-group">
                                  <label htmlFor=""></label>
                                  <input type="text" readOnly name="id_categoria" id="id_categoria" onChange={this.cambioValor} value={DataCategoria.id_categoria} className="form-control" placeholder="" aria-describedby="helpId"/>
                                  <small id="helpId" className="text-muted">Id Categoria</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombre"></label>
                                    <input type="text" onChange={this.cambioValor} value={DataCategoria.nombre} name="nombre" id="nombre" className="form-control" aria-describedby="helpId" required/>
                                    <small id="helpId" className="text-muted">Digita el nombre de la categoria</small>
                                </div>
                                <br></br>
                                <div className="btn-group" role="group" aria-label="">
                                    <button type="submit" className="btn btn-warning">Editar</button>
                                    {categoriaEdit && <Navigate replace to="/categoria" />}
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
}
 
export default withRouter(EditarCategoria);