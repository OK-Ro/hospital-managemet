import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  RiCalendarLine,
  RiUserAddLine,
  RiGroupLine,
  RiFileTextLine,
  RiChat1Line,
} from "react-icons/ri";

const Dashboard = () => {
  const statsCards = [
    {
      icon: <RiCalendarLine />,
      title: "Appointments",
      count: 46,
      color: "#4A6CF7",
    },
    {
      icon: <RiUserAddLine />,
      title: "New Patients",
      count: 129,
      color: "#F96B6B",
    },
    {
      icon: <RiGroupLine />,
      title: "Follow-Up Patients",
      count: 92,
      color: "#FFB648",
    },
    {
      icon: <RiFileTextLine />,
      title: "Review Reports",
      count: 118,
      color: "#4ADE80",
    },
    { icon: <RiChat1Line />, title: "Feedback", count: 167, color: "#4A6CF7" },
  ];

  const appointments = [
    {
      time: "08:00",
      name: "Kristin Watson",
      issue: "Stomach Pain",
      status: "completed",
    },
    {
      time: "09:00",
      name: "Jerome Bell",
      issue: "Headache",
      status: "completed",
    },
    {
      time: "10:00",
      name: "Dianne Russell",
      issue: "Card",
      status: "completed",
    },
    {
      time: "11:00",
      name: "Brooklyn Simmons",
      issue: "On Consultation",
      status: "active",
    },
    {
      time: "13:00",
      name: "Marvin McKinney",
      issue: "Stomach Pain",
      status: "pending",
    },
    {
      time: "14:00",
      name: "Ralph Edwards",
      issue: "Headache",
      status: "pending",
    },
    {
      time: "15:00",
      name: "Guy Hawkins",
      issue: "Headache",
      status: "pending",
    },
  ];

  const followUpPatients = [
    { name: "Esther Howard", date: "August, 26 2023", condition: "Diabetes" },
    {
      name: "Brooklyn Simmons",
      date: "August, 26 2023",
      condition: "Diabetes",
    },
    { name: "Cody Fisher", date: "August, 26 2023", condition: "Diabetes" },
  ];

  const reviewReports = [
    { name: "Georgette Strobel", date: "August, 26 2023" },
    { name: "Freida Varnes", date: "August, 26 2023" },
    { name: "Chantal Shelburne", date: "August, 26 2023" },
    { name: "Maryland Winkles", date: "August, 26 2023" },
    { name: "Phyllis Godley", date: "August, 26 2023" },
  ];

  const appointmentTrends = [
    { day: "Mon", appointments: 40 },
    { day: "Tue", appointments: 30 },
    { day: "Wed", appointments: 50 },
    { day: "Thu", appointments: 45 },
    { day: "Fri", appointments: 55 },
    { day: "Sat", appointments: 35 },
    { day: "Sun", appointments: 25 },
  ];

  return (
    <DashboardContainer>
      <StatsGrid>
        {statsCards.map((card, index) => (
          <StatsCard
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <StatsIconWrapper color={card.color}>{card.icon}</StatsIconWrapper>
            <StatsContent>
              <StatsCount>{card.count}</StatsCount>
              <StatsTitle>{card.title}</StatsTitle>
              <MiniGraph>
                <GraphBar height="60%" />
                <GraphBar height="40%" />
                <GraphBar height="80%" />
                <GraphBar height="50%" active />
              </MiniGraph>
            </StatsContent>
          </StatsCard>
        ))}
      </StatsGrid>

      <MainContent>
        <AppointmentsSection>
          <SectionHeader>
            <h2>Today Appointments</h2>
            <RiCalendarLine size={20} />
          </SectionHeader>

          <AppointmentsList>
            {appointments.map((apt, index) => (
              <AppointmentItem
                key={index}
                status={apt.status}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <TimeColumn>{apt.time}</TimeColumn>
                <AppointmentDetails>
                  <Avatar
                    src={`https://i.pravatar.cc/40?img=${index}`}
                    alt={apt.name}
                  />
                  <div>
                    <PatientName>{apt.name}</PatientName>
                    <PatientIssue>{apt.issue}</PatientIssue>
                  </div>
                  <StatusDot status={apt.status} />
                </AppointmentDetails>
              </AppointmentItem>
            ))}
          </AppointmentsList>
        </AppointmentsSection>

        <ConsultationSection>
          <SectionHeader>
            <h2>On Going Appointments</h2>
          </SectionHeader>

          <ConsultationCard
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <PatientHeader>
              <Avatar
                src="https://i.pravatar.cc/48?img=10"
                alt="Brooklyn Simmons"
              />
              <div>
                <PatientName>Brooklyn Simmons</PatientName>
                <PatientType>Regular Patient • On Consultation</PatientType>
              </div>
              <ConsultationTime>11:00 - 12:00</ConsultationTime>
            </PatientHeader>

            <ConsultationDetails>
              <DetailColumn>
                <DetailLabel>REFERRING DOCTOR</DetailLabel>
                <DetailValue>Dr. Joseph Carla</DetailValue>

                <DetailLabel>PHONE</DetailLabel>
                <DetailValue>STESS 3455 6665</DetailValue>

                <DetailLabel>EXPIRED DATE</DetailLabel>
                <DetailValue>12/07/2023</DetailValue>
              </DetailColumn>

              <DetailColumn>
                <DetailLabel>ASSIGNED DOCTOR</DetailLabel>
                <DetailValue>Dr. Kim Lee</DetailValue>

                <DetailLabel>OCCUPATION</DetailLabel>
                <DetailValue>Designer</DetailValue>

                <DetailLabel>DETAILS</DetailLabel>
                <DetailValue>Male, 29 Yrs</DetailValue>
              </DetailColumn>
            </ConsultationDetails>

            <ConsultationNotes>
              <DetailLabel>Consultation Notes</DetailLabel>
              <NotesTextarea placeholder="Type..." />
            </ConsultationNotes>

            <ButtonGroup>
              <Button variant="outline">Reschedule</Button>
              <Button variant="primary">Finish consultation</Button>
            </ButtonGroup>
          </ConsultationCard>

          <SubSection>
            <SectionHeader>
              <h3>Follow-Up Patients</h3>
            </SectionHeader>
            <PatientsList>
              {followUpPatients.map((patient, index) => (
                <PatientListItem
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar
                    src={`https://i.pravatar.cc/40?img=${index + 20}`}
                    alt={patient.name}
                  />
                  <PatientInfo>
                    <PatientName>{patient.name}</PatientName>
                    <PatientDate>{patient.date}</PatientDate>
                    <PatientCondition>{patient.condition}</PatientCondition>
                  </PatientInfo>
                </PatientListItem>
              ))}
            </PatientsList>
          </SubSection>

          <SubSection>
            <SectionHeader>
              <h3>Review Reports</h3>
            </SectionHeader>
            <PatientsList>
              {reviewReports.map((report, index) => (
                <PatientListItem
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar
                    src={`https://i.pravatar.cc/40?img=${index + 30}`}
                    alt={report.name}
                  />
                  <PatientInfo>
                    <PatientName>{report.name}</PatientName>
                    <PatientDate>{report.date}</PatientDate>
                  </PatientInfo>
                </PatientListItem>
              ))}
            </PatientsList>
          </SubSection>

          <SubSection>
            <SectionHeader>
              <h3>Appointments Overview</h3>
            </SectionHeader>
            <ProgressGrid>
              {appointmentTrends.map((trend, index) => (
                <ProgressItem key={index}>
                  <ProgressLabel>{trend.day}</ProgressLabel>
                  <ProgressBar>
                    <ProgressFill
                      width={`${(trend.appointments / 60) * 100}%`}
                    />
                  </ProgressBar>
                  <ProgressValue>{trend.appointments}</ProgressValue>
                </ProgressItem>
              ))}
            </ProgressGrid>
          </SubSection>
        </ConsultationSection>
      </MainContent>
    </DashboardContainer>
  );
};

// Styled Components
const DashboardContainer = styled.div`
  padding: 24px;
  background-color: #f8fafc;
  min-height: 100vh;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

const StatsCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StatsIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => `${props.color}10`};
  color: ${(props) => props.color};
  margin-right: 16px;
`;

const StatsContent = styled.div`
  flex: 1;
`;

const StatsCount = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
`;

const StatsTitle = styled.div`
  font-size: 14px;
  color: #64748b;
  margin-bottom: 8px;
`;

const MiniGraph = styled.div`
  display: flex;
  align-items: flex-end;
  height: 32px;
  gap: 4px;
`;

const GraphBar = styled.div`
  width: 4px;
  height: ${(props) => props.height};
  background-color: ${(props) => (props.active ? "#4A6CF7" : "#e2e8f0")};
  border-radius: 2px;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2,
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
  }
`;

const AppointmentsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const AppointmentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TimeColumn = styled.div`
  width: 60px;
  color: #64748b;
  font-size: 14px;
`;

const AppointmentItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background: ${(props) =>
    props.status === "active" ? "#4A6CF710" : "transparent"};
`;

const AppointmentDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const PatientName = styled.div`
  font-weight: 500;
  color: #1e293b;
`;

const PatientIssue = styled.div`
  font-size: 14px;
  color: #64748b;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: auto;
  background-color: ${(props) => {
    switch (props.status) {
      case "completed":
        return "#4ADE80";
      case "active":
        return "#4A6CF7";
      default:
        return "#FFB648";
    }
  }};
`;

const ConsultationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ConsultationCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const PatientHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const PatientType = styled.div`
  font-size: 14px;
  color: #64748b;
`;

const ConsultationTime = styled.div`
  margin-left: auto;
  padding: 8px 16px;
  background: #4a6cf710;
  border-radius: 20px;
  color: #4a6cf7;
  font-size: 14px;
`;

const ConsultationDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
`;

const DetailColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DetailLabel = styled.div`
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailValue = styled.div`
  color: #1e293b;
`;

const ConsultationNotes = styled.div`
  margin-bottom: 24px;
`;

const NotesTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  resize: none;
  margin-top: 8px;

  &:focus {
    outline: none;
    border-color: #4a6cf7;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;

  ${(props) =>
    props.variant === "outline"
      ? `
    border: 1px solid #e2e8f0;
    background: transparent;
    color: #64748b;
    
    &:hover {
      background: #f8fafc;
    }
  `
      : `
    background: #4A6CF7;
    color: white;
    border: none;
    
    &:hover {
      background: #3451B2;
    }
  `}
`;

const SubSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const PatientsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PatientListItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;

  &:hover {
    background: #f8fafc;
  }
`;

const PatientInfo = styled.div`
  flex: 1;
`;

const PatientDate = styled.div`
  font-size: 14px;
  color: #64748b;
`;

const PatientCondition = styled.div`
  font-size: 14px;
  color: #1e293b;
  margin-top: 4px;
`;

const ProgressGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProgressItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProgressLabel = styled.div`
  width: 40px;
  font-size: 14px;
  color: #64748b;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${(props) => props.width};
  background: #4a6cf7;
  border-radius: 4px;
`;

const ProgressValue = styled.div`
  width: 40px;
  font-size: 14px;
  color: #1e293b;
  text-align: right;
`;

export default Dashboard;
