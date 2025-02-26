"use client";

import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FormContainer = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #2f8f9d;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #4a5568;
  transition: color 0.2s;

  &:hover {
    color: #2f8f9d;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #4a5568;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2f8f9d;
    box-shadow: 0 0 0 1px #2f8f9d;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #2f8f9d;
    box-shadow: 0 0 0 1px #2f8f9d;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: #2f8f9d;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #268391;
  }
`;

const AddPatient = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <FormContainer
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            <FormHeader>
              <Title>Add New Patient</Title>
              <CloseButton onClick={onClose}>
                <X size={24} />
              </CloseButton>
            </FormHeader>
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <SubmitButton type="submit">Add Patient</SubmitButton>
            </Form>
          </FormContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default AddPatient;
