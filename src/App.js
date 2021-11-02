import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
//Importar para container
import * as React from 'react';
import Container from '@mui/material/Container';

import Login from './Components/Login';
import Carrousel from './Components/Carrousel';
import CargarDatos from './Components/CargarDatos';
import Coordinador from './Components/Coordinador'
import Revisor from './Components/Revisor'
import Aplicante from './Components/Aplicante'
import PrivateRoute from './Routers/PrivateRoute';
import AuthProvider from './Auth/AuthProvider';

//8366440

function App() {
  return (

    <Container fixed>
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/CargarDatos" component={CargarDatos} />
            <PrivateRoute exact path="/Revisor" component={Revisor} />
            <PrivateRoute exact path="/Coordinador" component={Coordinador} />
            <PrivateRoute exact path="/Aplicante" component={Aplicante} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/" component={Carrousel} />
          </Switch>
        </Router>
      </AuthProvider>

    </Container>
  );
}

export default App;
