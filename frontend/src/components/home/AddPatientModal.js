import React, { useState } from "react";
import styled from "styled-components";
import { Plus, X } from "lucide-react";

const AddPatientModal = ({ isOpen, onClose, onAddPatient }) => {
  const [newPatient, setNewPatient] = useState({
    firstName: "",
    surname: "",
    dateOfBirth: "",
    gender: "",
    age: "",
    profilePic: "https://i.pravatar.cc/150?img=1",
    status: "Active",
    contact: {
      email: "",
      phone: "",
      address: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setNewPatient({
        ...newPatient,
        [parent]: {
          ...newPatient[parent],
          [child]: value,
        },
      });
    } else {
      setNewPatient({
        ...newPatient,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPatient(newPatient);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h3>Add New Patient</h3>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>First Name</Label>
            <Input
              type="text"
              name="firstName"
              value={newPatient.firstName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Surname</Label>
            <Input
              type="text"
              name="surname"
              value={newPatient.surname}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              name="dateOfBirth"
              value={newPatient.dateOfBirth}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Gender</Label>
            <Select
              name="gender"
              value={newPatient.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Age</Label>
            <Input
              type="number"
              name="age"
              value={newPatient.age}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="contact.email"
              value={newPatient.contact.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Phone</Label>
            <Input
              type="tel"
              name="contact.phone"
              value={newPatient.contact.phone}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Address</Label>
            <Input
              type="text"
              name="contact.address"
              value={newPatient.contact.address}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormActions>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" primary>
              Add Patient
            </Button>
          </FormActions>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 500px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2f8f9d;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #4a5568;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  line-height: 1;

  &:hover {
    background: #f8f9fa;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background: white;

  &:focus {
    outline: none;
    border-color: #2f8f9d;
    box-shadow: 0 0 0 1px #2f8f9d;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background: white;

  &:focus {
    outline: none;
    border-color: #2f8f9d;
    box-shadow: 0 0 0 1px #2f8f9d;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.primary
      ? `
    background: #2f8f9d;
    color: white;
    border: none;
    
    &:hover {
      background: #268391;
    }
  `
      : `
    background: white;
    color: #4a5568;
    border: 1px solid #e2e8f0;
    
    &:hover {
      background: #f8f9fa;
    }
  `}
`;

export default AddPatientModal;
