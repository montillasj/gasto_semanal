import React, { Component } from 'react';
import '../css/App.css';
import Header from './Header';
import Formulario from './Formulario';
import Listado from './Listado';
import ControlPresupuesto from './ControlPresupuesto';
import {validarPresupuesto} from '../helper';

class App extends Component {
  
  state = {
    presupuesto : '',
    restante: '',
    gastos: {}
  }
  
  //al inicio de la app esto se realiza primero
  componentDidMount(){
    this.obtenerPresupuesto();
  }

  obtenerPresupuesto = () =>{
    let presupuesto = prompt('Cual es el presupuesto');

    let resultado = validarPresupuesto(presupuesto);
    if (resultado) {
      this.setState({
        presupuesto:presupuesto,
        restante: presupuesto
      })
    }else{
      console.log('Presupuesto no valido');
      this.obtenerPresupuesto();
    }
  }

  //se agrega un nuevo gasto al state y se toma una copia del state actual
  agregarGasto = gasto => {
    const gastos = {...this.state.gastos};
    gastos[`gastos${Date.now()}`] = gasto; //agregar el gasto al objeto de el state
    this.restarPresupuesto(gasto.cantidadGasto);//le paso el valor de la variable cantidadgasto que le paso desde el formulario y se lo paso a la funcion restar
    this.setState({ //ponerlo en el state
      gastos
    })
  }

  //restar de el presupuesto cuando un gasto se crea
  restarPresupuesto = cantidad =>{
    let restar = Number(cantidad);//convierto la cantidad que es de el tipo string a un number
    let restante = this.state.restante;//sacamos una copia de el state actual asi como esta, no es necesario el operador de spreed (...) porque no necesitamos que venga separado, si no queda claro proba y genera un log para ver diferencias
    restante -= restar;//lo restamos
    restante = String(restante); //lo convertimos a sting nuevamente para poder validar con el Proptypes
    this.setState({//agregamos el nuevo restate al state
      restante
    })
  }

   



  render() {
    return (
      <div className="App container">
        <Header
          titulo = 'Gasto Semanal'
        />
        <div className="contenido-principal contenido">
          <div className="row">
            <div className="one-half column">
              <Formulario
                agregarGasto ={this.agregarGasto}
              />
            </div>
            <div className="one-half column">
              <Listado
                gastos={this.state.gastos}
              />
              <ControlPresupuesto
                presupuesto = {this.state.presupuesto}
                restante = {this.state.restante}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
