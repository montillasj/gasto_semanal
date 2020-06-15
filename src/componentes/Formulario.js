import React, {Component} from 'react';
import PropTypes from 'prop-types';

class FormularioGasto extends Component {
    //refs para los campos de el formulario
    nombreGasto = React.createRef();
    cantidadGasto = React.createRef();

    crearGasto = (e) => {
        e.preventDefault();//evita que se pueda ir en cero o en default
        const gasto = { //se crea el objeto con los datos
            nombreGasto : this.nombreGasto.current.value,// se toma el valor de los refs
            cantidadGasto : this.cantidadGasto.current.value
        }
        //console.log(gasto);
        this.props.agregarGasto(gasto);//agregar y enviar por props
        e.currentTarget.reset(); //se resetea el formulario
    }

    render(){
        return(
            <form onSubmit={this.crearGasto}>
                <h2>Agrega tus gastos aqui</h2>
                <div className="campo">
                    <label>Nombre Gasto</label>
                    <input ref={this.nombreGasto} className="u-full-width" type="text" placeholder="Ej. Transporte" />
                </div>
                <div className="campo">
                    <label>Cantidad</label>
                    <input ref={this.cantidadGasto} className="u-full-width" type="text" placeholder="Ej. 300" />
                </div>
                <input className="button-primary u-full-width" type="submit" value="Agregar" />
            </form>
        )
    }
}

FormularioGasto.propTypes = {
    agregarGasto: PropTypes.func.isRequired
}

export default FormularioGasto;