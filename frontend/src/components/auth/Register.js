import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components for Register
const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9fafb;
`;

const RegisterForm = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const RegisterTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: #0f4c4c;
  margin-bottom: 1.5rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  &:focus {
    outline: none;
    border-color: #0f4c4c;
  }
`;

const SelectField = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  &:focus {
    outline: none;
    border-color: #0f4c4c;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #0f4c4c;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background-color: #0f4c4c90;
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  margin-bottom: 1rem;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    surName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "patient",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData
      );
      console.log("Registration successful:", response); // Log the full response
      navigate("/login");
    } catch (err) {
      console.error("Error during registration:", err); // Log the full error
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <RegisterTitle>Register</RegisterTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <InputField
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <InputField
          type="text"
          name="surName"
          placeholder="Surname"
          value={formData.surName}
          onChange={handleChange}
          required
        />
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <InputField
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <InputField
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <SelectField name="role" value={formData.role} onChange={handleChange}>
          <option value="patient">Patient</option>
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
          <option value="staff">Staff</option>
        </SelectField>
        <SubmitButton type="submit">Register</SubmitButton>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;
