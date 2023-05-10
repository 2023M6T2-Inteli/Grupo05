import React from  'react';
import './main.css';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom';
import {Dados} from './components/Dados';
import {Camera} from './components/Dados';
import {Virtual} from './components/Dados';



function App(){
  return(
    <div className='App'>
      <div className='retangule'>
         <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="link-1">Dados</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="link-2">Câmera</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="link-3">Virtual</Nav.Link>
          </Nav.Item>
        </Nav>
        
      </div>
     
    </div>
  )
}

export default App;

