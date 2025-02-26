import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { User, Lock, ArrowLeft, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f4f8;
`;

const LoginCard = styled(motion.div)`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LoginTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #0f4c4c;
  margin-bottom: 0.5rem;
`;

const LoginSubtitle = styled.p`
  color: #6b7280;
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #0f4c4c;
  }
`;

const ForgotPassword = styled.a`
  text-align: right;
  color: #0f4c4c;
  font-size: 0.875rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  background-color: #0f4c4c;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0d3b3b;
  }
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #0f4c4c;
  text-decoration: none;
  font-size: 0.875rem;
  margin-top: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        "http://localhost:8000/api/auth/login",
        formData
      );
      console.log("Login successful:", response.data);

      // Save token and user details to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/main");
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  return (
    <LoginContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <LoginCard
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <LoginHeader>
          <Star size={40} color="#0f4c4c" />
          <LoginTitle>Welcome Back</LoginTitle>
          <LoginSubtitle>Log in to access your account</LoginSubtitle>
        </LoginHeader>
        <LoginForm onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon>
              <User size={20} />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputIcon>
              <Lock size={20} />
            </InputIcon>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <ForgotPassword href="#">Forgot password?</ForgotPassword>
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Log In
          </SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </LoginForm>
        <BackLink to="/">
          <ArrowLeft size={16} style={{ marginRight: "0.5rem" }} />
          Back to Home
        </BackLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
