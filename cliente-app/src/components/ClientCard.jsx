// ClientCard.jsx
import React from 'react';
import styled from 'styled-components'

export const ClientCard = ({ cliente, onEdit, onDelete }) => {
  return (
    <Card>
      <Title>{cliente.nombres} {cliente.apellidos}</Title>
      <Detail><strong>📱 Celular:</strong> {cliente.celular}</Detail>
      <Detail><strong>🏠 Dirección:</strong> {cliente.direccion}</Detail>
      <Detail><strong>📧 Correo:</strong> {cliente.correo}</Detail>
      <Detail><strong>📝 Descripción:</strong> {cliente.descripcion}</Detail>
      <ButtonGroup>
        <ButtonEdit onClick={() => onEdit(cliente)}>Editar</ButtonEdit>
        <ButtonDelete onClick={() => onDelete(cliente.id)}>Eliminar</ButtonDelete>
      </ButtonGroup>
    </Card>
  )
}

const Card = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Title = styled.h2`
  margin: 0;
  font-size: 1.2rem;
`

const Detail = styled.p`
  margin: 0;
  font-size: 0.95rem;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`

const ButtonEdit = styled.button`
  background-color: #007bff;
  border: none;
  padding: 0.5rem;
  color: white;
  border-radius: 0.4rem;
  cursor: pointer;
`

const ButtonDelete = styled.button`
  background-color: #dc3545;
  border: none;
  padding: 0.5rem;
  color: white;
  border-radius: 0.4rem;
  cursor: pointer;
`
