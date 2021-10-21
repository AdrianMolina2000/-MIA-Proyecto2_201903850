import './App.css';

//Importar para container
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


import CargarDatos from './Components/CargarDatos';


function App() {
  return (

    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <CargarDatos/>
      </Container>
    </React.Fragment>
  );
}

export default App;
