import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import {
  Building,
  Phone,
  Star,
  Activity,
  Brain,
  Heart,
  Microscope,
  User,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

// Locally Created Components
const Button = styled(motion.button)`
  background-color: ${(props) =>
    props.variant === "ghost" ? "transparent" : "#FFB088"};
  color: ${(props) => (props.variant === "ghost" ? "white" : "#0F4C4C")};
  border: ${(props) =>
    props.variant === "ghost" ? "1px solid white" : "none"};
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.variant === "ghost" ? "rgba(255, 255, 255, 0.1)" : "#FF9566"};
  }
`;

const Card = styled(motion.div)`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  &:focus {
    outline: none;
    border-color: #0f4c4c;
  }
`;

// Styled Components for Layout
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled(motion.header)`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  background-color: #0f4c4c;
  color: white;
  padding: 0 1rem;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
`;

const NavLinks = styled.nav`
  display: none;
  gap: 2rem;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  font-size: 0.875rem;
  color: white;
  &:hover {
    color: #ffb088;
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HeroSection = styled(motion.section)`
  padding-top: 6rem;
  background-color: #0f4c4c;
  color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: grid;
  gap: 3rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  color: #ffb088;
  line-height: 1.2;
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.125rem;
  color: #d1d5db;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const HeroImage = styled(motion.div)`
  position: relative;
  img {
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const StatsSection = styled(motion.section)`
  padding: 4rem 1rem;
  background-color: white;
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  div:first-child {
    font-size: 2.25rem;
    font-weight: bold;
    color: #0f4c4c;
  }
  div:last-child {
    color: #6b7280;
  }
`;

const ServicesSection = styled(motion.section)`
  padding: 4rem 1rem;
  background-color: #f9fafb;
`;

const ServicesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const ServicesTitle = styled(motion.h2)`
  font-size: 1.875rem;
  font-weight: bold;
  color: #0f4c4c;
`;

const ServicesDescription = styled(motion.p)`
  color: #6b7280;
  margin-top: 0.5rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ServiceCard = styled(Card)`
  text-align: center;
  padding: 1.5rem;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const ServiceIcon = styled.div`
  background-color: rgba(15, 76, 76, 0.1);
  border-radius: 9999px;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;

const ServiceTitle = styled.h3`
  font-weight: 600;
  color: #0f4c4c;
`;

const AboutSection = styled(motion.section)`
  padding: 4rem 1rem;
  background-color: #f9fafb;
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const AboutTitle = styled(motion.h2)`
  font-size: 1.875rem;
  font-weight: bold;
  color: #0f4c4c;
`;

const AboutDescription = styled(motion.p)`
  color: #6b7280;
  margin-top: 0.5rem;
`;

const DoctorsSection = styled(motion.section)`
  padding: 4rem 1rem;
  background-color: white;
`;

const DoctorsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const DoctorsTitle = styled(motion.h2)`
  font-size: 1.875rem;
  font-weight: bold;
  color: #0f4c4c;
`;

const DoctorsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const DoctorCard = styled(Card)`
  text-align: center;
  padding: 1.5rem;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const DoctorIcon = styled.div`
  background-color: rgba(15, 76, 76, 0.1);
  border-radius: 9999px;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;

const DoctorName = styled.h3`
  font-weight: 600;
  color: #0f4c4c;
`;

const TestimonialsSection = styled(motion.section)`
  padding: 4rem 1rem;
  background-color: #f9fafb;
`;

const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const TestimonialsTitle = styled(motion.h2)`
  font-size: 1.875rem;
  font-weight: bold;
  color: #0f4c4c;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TestimonialCard = styled(Card)`
  text-align: center;
  padding: 1.5rem;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const TestimonialIcon = styled.div`
  background-color: rgba(15, 76, 76, 0.1);
  border-radius: 9999px;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;

const TestimonialText = styled.p`
  color: #6b7280;
`;

const Footer = styled(motion.footer)`
  background-color: #0f4c4c;
  color: white;
  padding: 3rem 1rem;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const FooterLinks = styled.div`
  h3 {
    font-weight: 600;
    margin-bottom: 1rem;
  }
  ul {
    list-style: none;
    padding: 0;
    li {
      margin-bottom: 0.5rem;
      a {
        color: #d1d5db;
        &:hover {
          color: #ffb088;
        }
      }
    }
  }
`;

const FooterContact = styled.div`
  h3 {
    font-weight: 600;
    margin-bottom: 1rem;
  }
  ul {
    list-style: none;
    padding: 0;
    li {
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #d1d5db;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  text-align: center;
  color: #d1d5db;
`;

const LandingPage = () => {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        controls.start({ backgroundColor: "#0F4C4C90" });
      } else {
        controls.start({ backgroundColor: "#0F4C4C" });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <Container>
      <Header animate={controls}>
        <NavContainer>
          <NavLogo>
            <Star size={24} color="#FFB088" />
            <span>DeltaCare</span>
          </NavLogo>
          <NavLinks>
            <NavLink to="#">Appointment</NavLink>
            <NavLink to="#">Services</NavLink>
            <NavLink to="#">Departments</NavLink>
            <NavLink to="#">About us</NavLink>
            <NavLink to="#">Doctors</NavLink>
            <NavLink to="#">Branches</NavLink>
          </NavLinks>
          <NavButtons>
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </NavButtons>
        </NavContainer>
      </Header>

      <HeroSection>
        <HeroContainer>
          <HeroContent>
            <HeroTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              The trusted & friendly professionals are for you
            </HeroTitle>
            <HeroDescription
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Experience world-class healthcare with our team of dedicated
              medical professionals.
            </HeroDescription>
            <HeroButtons>
              <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Call for appointment
              </Button>
              <Button
                variant="ghost"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Find Branches Near You
              </Button>
            </HeroButtons>
          </HeroContent>
          <HeroImage
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hospital-HVCqJ56S5Nf08Sssx9kGx0eBRXEoLd.webp"
              alt="Medical professionals in surgery"
              width={600}
              height={400}
            />
          </HeroImage>
        </HeroContainer>
      </HeroSection>

      <StatsSection>
        <StatsContainer>
          <StatItem
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>29</div>
            <div>Years Experience</div>
          </StatItem>
          <StatItem
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>300+</div>
            <div>Doctors</div>
          </StatItem>
          <StatItem
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div>150+</div>
            <div>Staff Members</div>
          </StatItem>
          <StatItem
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div>80</div>
            <div>Branches</div>
          </StatItem>
        </StatsContainer>
      </StatsSection>

      <ServicesSection>
        <ServicesContainer>
          <ServicesTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </ServicesTitle>
          <ServicesDescription
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Comprehensive healthcare solutions for you and your family
          </ServicesDescription>
          <ServicesGrid>
            {[
              { icon: Heart, title: "Cardiology" },
              { icon: Brain, title: "Neurology" },
              { icon: Activity, title: "General Care" },
              { icon: Microscope, title: "Laboratory" },
            ].map((service, index) => (
              <ServiceCard
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CardContent>
                  <ServiceIcon>
                    <service.icon size={24} color="#0F4C4C" />
                  </ServiceIcon>
                  <ServiceTitle>{service.title}</ServiceTitle>
                </CardContent>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </ServicesContainer>
      </ServicesSection>

      <AboutSection>
        <AboutContainer>
          <AboutTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Us
          </AboutTitle>
          <AboutDescription
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            DeltaCare has been providing exceptional healthcare services for
            over 29 years. Our mission is to deliver compassionate,
            patient-centered care with a focus on innovation and excellence.
          </AboutDescription>
        </AboutContainer>
      </AboutSection>

      <DoctorsSection>
        <DoctorsContainer>
          <DoctorsTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Doctors
          </DoctorsTitle>
          <DoctorsGrid>
            {[
              { name: "Dr. John Doe", specialty: "Cardiology" },
              { name: "Dr. Jane Smith", specialty: "Neurology" },
              { name: "Dr. Emily Brown", specialty: "Pediatrics" },
            ].map((doctor, index) => (
              <DoctorCard
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CardContent>
                  <DoctorIcon>
                    <User size={24} color="#0F4C4C" />
                  </DoctorIcon>
                  <DoctorName>{doctor.name}</DoctorName>
                  <p>{doctor.specialty}</p>
                </CardContent>
              </DoctorCard>
            ))}
          </DoctorsGrid>
        </DoctorsContainer>
      </DoctorsSection>

      <TestimonialsSection>
        <TestimonialsContainer>
          <TestimonialsTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            What Our Patients Say
          </TestimonialsTitle>
          <TestimonialsGrid>
            {[
              {
                text: "The care I received was exceptional. Highly recommend!",
                author: "John Doe",
              },
              {
                text: "Friendly staff and world-class facilities.",
                author: "Jane Smith",
              },
              {
                text: "DeltaCare changed my life. Thank you!",
                author: "Emily Brown",
              },
            ].map((testimonial, index) => (
              <TestimonialCard
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CardContent>
                  <TestimonialIcon>
                    <MessageCircle size={24} color="#0F4C4C" />
                  </TestimonialIcon>
                  <TestimonialText>{testimonial.text}</TestimonialText>
                  <p>- {testimonial.author}</p>
                </CardContent>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </TestimonialsContainer>
      </TestimonialsSection>

      <Footer>
        <FooterContainer>
          <div>
            <FooterLogo>
              <Star size={24} color="#FFB088" />
              <span>DeltaCare</span>
            </FooterLogo>
            <p className="text-sm text-gray-300">
              Providing quality healthcare services for over 29 years.
            </p>
          </div>
          <FooterLinks>
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="#">About Us</Link>
              </li>
              <li>
                <Link to="#">Our Services</Link>
              </li>
              <li>
                <Link to="#">Find a Doctor</Link>
              </li>
              <li>
                <Link to="#">Book Appointment</Link>
              </li>
            </ul>
          </FooterLinks>
          <FooterLinks>
            <h3>Departments</h3>
            <ul>
              <li>
                <Link to="#">Cardiology</Link>
              </li>
              <li>
                <Link to="#">Neurology</Link>
              </li>
              <li>
                <Link to="#">Pediatrics</Link>
              </li>
              <li>
                <Link to="#">Orthopedics</Link>
              </li>
            </ul>
          </FooterLinks>
          <FooterContact>
            <h3>Contact</h3>
            <ul>
              <li>
                <Phone size={16} />
                <span>+1 234 567 890</span>
              </li>
              <li>
                <Building size={16} />
                <span>123 Healthcare St, Medical City</span>
              </li>
            </ul>
          </FooterContact>
        </FooterContainer>
        <FooterBottom>
          <p>© 2024 DeltaCare. All rights reserved.</p>
        </FooterBottom>
      </Footer>

      {/* Chatbot */}
    </Container>
  );
};

export default LandingPage;
