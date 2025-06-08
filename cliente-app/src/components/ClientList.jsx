import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ClientCard } from './ClientCard';

export const ListClients = () => {
  const [clientes, setClientes] = useState([]);

  const navigate = useNavigate()

  const getClientes = async () => {
    try {
      const res = await axios.get('http://localhost:5298/api/cliente')
      console.log('Clientes recibidos:', res.data)
      setClientes(res.data)
    } catch (error) {
      console.error('Error al obtener clientes', error)
    }
  }

  useEffect(() => {
    getClientes();
  }, [])

  const abrirModalCrear = () => {
    navigate('/crear')
  }

  const abrirModalEditar = (cliente) => {
    navigate(`/editar/${cliente.id}`)
  }

  const handleDelete = async (id) => {
  const confirmar = window.confirm('¿Estás seguro de eliminar este cliente?')
  if (!confirmar) return

  try {
    await axios.delete(`http://localhost:5298/api/cliente/${id}`)
    getClientes()
  } catch (error) {
    alert('Error al eliminar el cliente')
    console.error(error)
  }
}

  return (
    <Container>
    <Title>Lista de Clientes</Title>
    <Button onClick={abrirModalCrear}>Crear Cliente</Button>

    <CardGrid>
      {clientes.map(cliente => (
        <ClientCard
          key={cliente.id}
          cliente={cliente}
          onDelete={handleDelete}
          onEdit={abrirModalEditar}
        />
      ))}
    </CardGrid>
  </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 2rem;
`

const Button = styled.button`
  align-self: center;
  margin-bottom: 2rem;
  padding: 0.8rem 1.6rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  flex: 1;
`