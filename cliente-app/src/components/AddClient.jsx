import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

export const AddClient = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    celular: '',
    direccion: '',
    correo: '',
    descripcion: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  };

  const validateForm = async () => {
  const { nombres, apellidos, celular, direccion, correo, descripcion } = formData;

  if (!nombres || !apellidos || !celular || !direccion || !correo || !descripcion) {
    alert("Todos los campos son obligatorios")
    return false
  }

  if (!/^\d{8,12}$/.test(celular)) {
    alert("El celular debe tener entre 8 y 12 dígitos numéricos")
    return false;
  }

  if (descripcion.length > 25) {
    alert("La descripción no debe tener más de 25 caracteres")
    return false
  }

  try {
    const res = await axios.get('http://localhost:5298/api/cliente')
    const existing = res.data

    const emailExists = existing.some(c => c.correo === correo && c.id !== formData.id);
    const phoneExists = existing.some(c => c.celular === celular && c.id !== formData.id);

    if (emailExists) {
      alert("Ya existe un cliente con este correo")
      return false
    }

    if (phoneExists) {
      alert("Ya existe un cliente con este número de celular")
      return false
    }
  } catch (err) {
    console.error("Error validando duplicados", err)
    return false;
  }

  return true
}


  const handleSubmit = async (e) => {
  e.preventDefault();
  const isValid = await validateForm()
  if (!isValid) return

  try {
    await axios.post('http://localhost:5298/api/cliente', formData)
    navigate('/');
  } catch (err) {
    alert('Error al guardar')
  }
}

  return (
    <FormContainer>
    <Form onSubmit={handleSubmit}>
      <Input name="nombres" value={formData.nombres} onChange={handleChange} placeholder="Nombres" />
      <Input name="apellidos" value={formData.apellidos} onChange={handleChange} placeholder="Apellidos" />
      <Input name="celular" value={formData.celular} onChange={handleChange} placeholder="Celular" />
      <Input name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Dirección" />
      <Input name="correo" type="email" value={formData.correo} onChange={handleChange} placeholder="Correo" />
      <TextArea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" rows={4} />
      <SubmitButton type="submit">Guardar</SubmitButton>
    </Form>
  </FormContainer>
  )

}

const FormContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  box-sizing: border-box;
`

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 500px;

  @media (max-width: 500px) {
    padding: 1.2rem;
  }
`

const Input = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
`

const TextArea = styled.textarea`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  resize: vertical;
  box-sizing: border-box;
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #28a745;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #218838;
  }
`