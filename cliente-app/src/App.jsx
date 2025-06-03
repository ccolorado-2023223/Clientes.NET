import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components'
import { ListClients } from './components/ClientList'
import { AddClient } from './components/AddClient';
import { EditClient } from './components/EditClient';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListClients />} />
        <Route path="/crear" element={<AddClient />} />
        <Route path="/editar/:id" element={<EditClient />} />
      </Routes>
    </Router>
  );
}

export default App;
