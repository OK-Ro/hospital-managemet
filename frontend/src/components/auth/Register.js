import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  UserPlus,
  ArrowLeft,
  Star,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const RegisterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f4f8;
  padding: 2rem;
`;

const RegisterCard = styled(motion.div)`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const RegisterTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #0f4c4c;
  margin-bottom: 0.5rem;
`;

const RegisterSubtitle = styled.p`
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
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: #0f4c4c;
    box-shadow: 0 0 0 3px rgba(15, 76, 76, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;

  &:focus {
    outline: none;
    border-color: #0f4c4c;
    box-shadow: 0 0 0 3px rgba(15, 76, 76, 0.1);
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

const ErrorMessage = styled(motion.p)`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled(motion.div)`
  background-color: #10b981;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  margin-top: 1rem;
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
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Corrected from useRouter

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      console.log("Registration attempt with:", formData);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);

      setTimeout(() => {
        navigate("/login"); // Corrected from router.push
      }, 2000);
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <RegisterContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <RegisterCard
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <RegisterHeader>
          <Star size={40} color="#0f4c4c" />
          <RegisterTitle>Join DeltaCare</RegisterTitle>
          <RegisterSubtitle>
            Create your account to get started
          </RegisterSubtitle>
        </RegisterHeader>
        <RegisterForm onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon>
              <User size={20} />
            </InputIcon>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputIcon>
              <User size={20} />
            </InputIcon>
            <Input
              type="text"
              name="surName"
              placeholder="Surname"
              value={formData.surName}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputIcon>
              <Mail size={20} />
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
          <SubmitButton type="submit" whileHover={{ scale: 1.05 }}>
            Register
          </SubmitButton>
        </RegisterForm>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;
