import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import {
  FaHeartbeat,
  FaHome,
  FaCalendarAlt,
  FaUserInjured,
  FaUserMd,
  FaUserNurse,
  FaPills,
  FaFlask,
  FaBed,
  FaAmbulance,
  FaFileInvoiceDollar,
  FaMicroscope,
  FaComments,
  FaChalkboardTeacher,
  FaVideo,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import Dashboard from "./sections/Dashboard";
import Settings from "./sections/Settings";
import Reports from "./sections/Reports";
import ResearchDevelopment from "./sections/ResearchDevelopment";
import Telemedicine from "./sections/Telemedicine";
import StaffTraining from "./sections/StaffTraining";
import PatientEngagement from "./sections/PatientEngagement";
import MedicalEquipment from "./sections/MedicalEquipment";
import BillingInvoices from "./sections/BillingInvoices";
import EmergencyServices from "./sections/EmergencyServices";
import BedManagement from "./sections/BedManagement";
import Laboratory from "./sections/Laboratory";
import Pharmacy from "./sections/Pharmacy";
import Nurses from "./sections/Nurses";
import Doctors from "./sections/Doctors";
import Patients from "./sections/Patients";
import Appointments from "./sections/Apointments";
import Chat from "./Chat";

// Blinking animation for online status
const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; box-shadow: 0 0 10px #00ff00; }
  100% { opacity: 1; }
`;

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);
`;

const Sidebar = styled.aside`
  width: 205px;
  background: linear-gradient(145deg, #2c3e50, #34495e);
  color: #fff;
  padding: 20px;
  padding-top: 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  position: fixed;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SidebarTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  color: #48dbfb;
  text-shadow: 0 0 10px rgba(72, 219, 251, 0.7);
  transition: all 0.3s ease;
  border-radius: 8px;

  &:hover {
    text-shadow: 0 0 20px rgba(72, 219, 251, 1);
    transform: scale(1.05);
  }
`;

const ScrollableContainer = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding-right: 22px;
  height: 75vh;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #48dbfb;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const SidebarMenu = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SidebarMenuItem = styled.li`
  margin: 7px 0;
  position: relative;
`;

const SidebarLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${({ active }) =>
    active ? "rgba(72, 219, 251, 0.1)" : "transparent"};
  border-left: ${({ active }) => (active ? "4px solid #48dbfb" : "none")};

  &:hover {
    background: rgba(72, 219, 251, 0.1);
    transform: translateX(5px);
  }

  svg {
    font-size: 1.2rem;
    color: ${({ active }) => (active ? "#48dbfb" : "#fff")};
  }
`;

const SidebarFooter = styled.div`
  margin-top: 2px;
`;

const SidebarLogoutButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  color: #fff;
  background-color: #ff6b6b;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: #ff4757;
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(255, 107, 107, 0.7);
  }
`;

const Separator = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 20px 0;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 240px;
  width: calc(100% - 240px);
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: calc(100% - 240px);
  z-index: 2;
`;

const NavbarTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NavbarUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 3rem;
  border: 2px solid #48dbfb;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    border-color: #ff6b6b;
  }
`;

const NavbarText = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #e0e0e0;
  background: linear-gradient(90deg, #ff8a00, #da1b60);
  padding: 8px 16px;
  border-radius: 20px;
  letter-spacing: 1px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(90deg, #da1b60, #ff8a00);
    transform: scale(1.1);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const OnlineIndicator = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #00ff00;
  animation: ${blink} 1.5s ease-in-out infinite;
  box-shadow: 0 0 5px #00ff00;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  margin-top: 60px;
  overflow-y: auto;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #48dbfb;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f8f9fa;
  }
`;

const Main = () => {
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (token && storedUser) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setRole(decodedToken.role);
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/auth/logout", {
        userId: user._id,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  const handleSidebarClick = (section) => {
    setActiveSection(section);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "appointments":
        return <Appointments />;
      case "patients":
        return <Patients />;
      case "doctors":
        return <Doctors />;
      case "nurses":
        return <Nurses />;
      case "pharmacy":
        return <Pharmacy />;
      case "laboratory":
        return <Laboratory />;
      case "bedManagement":
        return <BedManagement />;
      case "emergencyServices":
        return <EmergencyServices />;
      case "billingInvoices":
        return <BillingInvoices />;
      case "medicalEquipment":
        return <MedicalEquipment />;
      case "patientEngagement":
        return <PatientEngagement />;
      case "staffTraining":
        return <StaffTraining />;
      case "telemedicine":
        return <Telemedicine />;
      case "researchDevelopment":
        return <ResearchDevelopment />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <div>
          <SidebarTitle>
            Health <FaHeartbeat size={30} color="red" /> Care
          </SidebarTitle>
          <ScrollableContainer>
            <SidebarMenu>
              {/* Sidebar menu items */}
              <SidebarMenuItem>
                <SidebarLink
                  onClick={() => handleSidebarClick("dashboard")}
                  active={activeSection === "dashboard"}
                >
                  <FaHome /> Dashboard
                </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink
                  onClick={() => handleSidebarClick("appointments")}
                  active={activeSection === "appointments"}
                >
                  <FaCalendarAlt /> Appointments
                </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink
                  onClick={() => handleSidebarClick("patients")}
                  active={activeSection === "patients"}
                >
                  <FaUserInjured /> Patients
                </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink
                  onClick={() => handleSidebarClick("doctors")}
                  active={activeSection === "doctors"}
                >
                  <FaUserMd /> Doctors
                </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink
                  onClick={() => handleSidebarClick("nurses")}
                  active={activeSection === "nurses"}
                >
                  <FaUserNurse /> Nurses
                </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink
                  onClick={() => handleSidebarClick("pharmacy")}
                  active={activeSection === "pharmacy"}
                >
                  <FaPills /> Pharmacy
                </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink
                  onClick={() => handleSidebarClick("laboratory")}
                  active={activeSection === "laboratory"}
                >
                  <FaFlask /> Laboratory
                </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink
                  onClick={() => handleSidebarClick("bedManagement")}
                  active={activeSection === "bedManagement"}
                >
                  <FaBed /> Bed Management
                </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink
                  onClick={() => handleSidebarClick("emergencyServices")}
                  active={activeSection === "emergencyServices"}
                >
                  <FaAmbulance /> Emergency Services
                </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink
                  onClick={() => handleSidebarClick("billingInvoices")}
                  active={activeSection === "billingInvoices"}
                >
                  <FaFileInvoiceDollar /> Billing & Invoices
                </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink
                  onClick={() => handleSidebarClick("medicalEquipment")}
                  active={activeSection === "medicalEquipment"}
                >
                  <FaMicroscope /> Medical Equipment
                </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink
                  onClick={() => handleSidebarClick("patientEngagement")}
                  active={activeSection === "patientEngagement"}
                >
                  <FaComments /> Patient Engagement
                </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink
                  onClick={() => handleSidebarClick("staffTraining")}
                  active={activeSection === "staffTraining"}
                >
                  <FaChalkboardTeacher /> Staff Training
                </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink
                  onClick={() => handleSidebarClick("telemedicine")}
                  active={activeSection === "telemedicine"}
                >
                  <FaVideo /> Telemedicine
                </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink
                  onClick={() => handleSidebarClick("researchDevelopment")}
                  active={activeSection === "researchDevelopment"}
                >
                  <FaChartLine /> Research & Development
                </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink
                  onClick={() => handleSidebarClick("reports")}
                  active={activeSection === "reports"}
                >
                  <FaChartLine /> Reports
                </SidebarLink>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarLink
                  onClick={() => handleSidebarClick("settings")}
                  active={activeSection === "settings"}
                >
                  <FaCog /> Settings
                </SidebarLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </ScrollableContainer>
        </div>
        <SidebarFooter>
          <Separator />
          <SidebarLogoutButton onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </SidebarLogoutButton>
        </SidebarFooter>
      </Sidebar>

      <MainContent>
        <Navbar>
          <NavbarTitle>
            Welcome, {user ? `${user.firstName} ${user.surName}` : "Guest"}
            {user?.online && <OnlineIndicator />}
          </NavbarTitle>
          <NavbarUser>
            <button onClick={toggleDarkMode}>
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
            <FaBell size={20} style={{ cursor: "pointer" }} />
            <FaSearch size={20} style={{ cursor: "pointer" }} />
            <NavbarText>{role}</NavbarText>
            <ProfilePicture
              src={
                user?.profilePicture ||
                "https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png"
              }
              alt="Profile"
            />
          </NavbarUser>
        </Navbar>

        <ContentArea>{renderActiveSection()}</ContentArea>
      </MainContent>

      {/* Add the Chat component here */}
      <Chat />
    </DashboardContainer>
  );
};

export default Main;
