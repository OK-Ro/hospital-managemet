import React, { useState } from "react";
import styled from "styled-components";
import {
  User,
  Lock,
  Bell,
  Globe,
  Shield,
  Database,
  CreditCard,
  Settings as SettingsIcon,
  Palette,
  LifeBuoy,
} from "lucide-react";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("account");

  const renderSection = () => {
    switch (activeSection) {
      case "account":
        return <AccountSettings />;
      case "roles":
        return <RolePermissions />;
      case "hospital":
        return <HospitalPreferences />;
      case "notifications":
        return <NotificationSettings />;
      case "integrations":
        return <IntegrationSettings />;
      case "security":
        return <SecuritySettings />;
      case "data":
        return <DataPrivacySettings />;
      case "system":
        return <SystemPreferences />;
      case "billing":
        return <BillingSettings />;
      case "updates":
        return <SystemUpdates />;
      case "appearance":
        return <AppearanceSettings />;
      case "support":
        return <HelpSupport />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <Container>
      <Sidebar>
        <SidebarTitle>
          <SettingsIcon size={24} />
          <span>Settings</span>
        </SidebarTitle>
        <SidebarMenu>
          <MenuItem
            active={activeSection === "account"}
            onClick={() => setActiveSection("account")}
          >
            <User size={16} />
            <span>Account</span>
          </MenuItem>
          <MenuItem
            active={activeSection === "roles"}
            onClick={() => setActiveSection("roles")}
          >
            <Shield size={16} />
            <span>Roles & Permissions</span>
          </MenuItem>
          <MenuItem
            active={activeSection === "hospital"}
            onClick={() => setActiveSection("hospital")}
          >
            <Globe size={16} />
            <span>Hospital Preferences</span>
          </MenuItem>
          <MenuItem
            active={activeSection === "notifications"}
            onClick={() => setActiveSection("notifications")}
          >
            <Bell size={16} />
            <span>Notifications</span>
          </MenuItem>
          <MenuItem
            active={activeSection === "integrations"}
            onClick={() => setActiveSection("integrations")}
          >
            <Database size={16} />
            <span>Integrations</span>
          </MenuItem>
          <MenuItem
            active={activeSection === "security"}
            onClick={() => setActiveSection("security")}
          >
            <Shield size={16} />
            <span>Security</span>
          </MenuItem>
          <MenuItem
            active={activeSection === "data"}
            onClick={() => setActiveSection("data")}
          >
            <Database size={16} />
            <span>Data & Privacy</span>
          </MenuItem>
          <MenuItem
            active={activeSection === "system"}
            onClick={() => setActiveSection("system")}
          >
            <SettingsIcon size={16} />
            <span>System Preferences</span>
          </MenuItem>
          <MenuItem
            active={activeSection === "billing"}
            onClick={() => setActiveSection("billing")}
          >
            <CreditCard size={16} />
            <span>Billing & Payments</span>
          </MenuItem>
          <MenuItem
            active={activeSection === "updates"}
            onClick={() => setActiveSection("updates")}
          >
            <SettingsIcon size={16} />
            <span>System Updates</span>
          </MenuItem>
          <MenuItem
            active={activeSection === "appearance"}
            onClick={() => setActiveSection("appearance")}
          >
            <Palette size={16} />
            <span>Appearance</span>
          </MenuItem>
          <MenuItem
            active={activeSection === "support"}
            onClick={() => setActiveSection("support")}
          >
            <LifeBuoy size={16} />
            <span>Help & Support</span>
          </MenuItem>
        </SidebarMenu>
      </Sidebar>

      <MainContent>{renderSection()}</MainContent>
    </Container>
  );
};

// Sub-Components for Each Section
const AccountSettings = () => (
  <Section>
    <h2>Account Settings</h2>
    <Form>
      <FormGroup>
        <label>Name</label>
        <input type="text" placeholder="Enter your name" />
      </FormGroup>
      <FormGroup>
        <label>Email</label>
        <input type="email" placeholder="Enter your email" />
      </FormGroup>
      <FormGroup>
        <label>Profile Picture</label>
        <input type="file" />
      </FormGroup>
      <FormGroup>
        <label>Change Password</label>
        <input type="password" placeholder="New password" />
      </FormGroup>
      <FormGroup>
        <label>Notification Preferences</label>
        <select>
          <option>Email</option>
          <option>SMS</option>
          <option>In-App Alerts</option>
        </select>
      </FormGroup>
      <FormGroup>
        <label>Language</label>
        <select>
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </FormGroup>
      <SaveButton>Save Changes</SaveButton>
    </Form>
  </Section>
);

const RolePermissions = () => (
  <Section>
    <h2>Roles & Permissions</h2>
    <p>Manage user roles and permissions here.</p>
  </Section>
);

const HospitalPreferences = () => (
  <Section>
    <h2>Hospital Preferences</h2>
    <p>Update hospital details, departments, and doctor availability.</p>
  </Section>
);

const NotificationSettings = () => (
  <Section>
    <h2>Notification Settings</h2>
    <p>Configure alerts and reminders.</p>
  </Section>
);

const IntegrationSettings = () => (
  <Section>
    <h2>Integration Settings</h2>
    <p>Manage external integrations and API keys.</p>
  </Section>
);

const SecuritySettings = () => (
  <Section>
    <h2>Security Settings</h2>
    <p>Enable 2FA, session timeouts, and IP whitelisting.</p>
  </Section>
);

const DataPrivacySettings = () => (
  <Section>
    <h2>Data & Privacy Settings</h2>
    <p>Set data retention policies and privacy controls.</p>
  </Section>
);

const SystemPreferences = () => (
  <Section>
    <h2>System Preferences</h2>
    <p>Configure time zones, operating hours, and backups.</p>
  </Section>
);

const BillingSettings = () => (
  <Section>
    <h2>Billing & Payment Settings</h2>
    <p>Set up insurance details and payment gateways.</p>
  </Section>
);

const SystemUpdates = () => (
  <Section>
    <h2>System Updates</h2>
    <p>Manage software updates and maintenance schedules.</p>
  </Section>
);

const AppearanceSettings = () => (
  <Section>
    <h2>Appearance Settings</h2>
    <p>Customize themes and dashboard layouts.</p>
  </Section>
);

const HelpSupport = () => (
  <Section>
    <h2>Help & Support</h2>
    <p>Access the knowledge base and contact support.</p>
  </Section>
);

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f8f9fa;
`;

const Sidebar = styled.aside`
  width: 250px;
  background: white;
  padding: 1.5rem;
  border-right: 1px solid #e9ecef;
`;

const SidebarTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  background: ${(props) => (props.active ? "#2f8f9d" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#6c757d")};

  &:hover {
    background: ${(props) => (props.active ? "#268391" : "#f8f9fa")};
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const Section = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

  label {
    font-weight: 500;
  }

  input,
  select {
    padding: 0.75rem;
    border: 1px solid #e9ecef;
    border-radius: 0.5rem;
  }
`;

const SaveButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #2f8f9d;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #268391;
  }
`;

export default Settings;
