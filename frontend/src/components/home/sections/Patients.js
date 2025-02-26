import React, { useState } from "react";
import styled from "styled-components";
import {
  Search,
  Plus,
  Edit,
  Trash,
  Download,
  User,
  Calendar,
  FileText,
  ArrowUpDown,
  Filter,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  ChevronRight,
  ChevronLeft,
  MoreVertical,
  Activity,
  AlertCircle,
  FileIcon,
  Heart,
  X,
} from "lucide-react";
import AddPatientModal from "../AddPatientModal";
import { initialPatients } from "./Data/patientsData";

// Styled Components
const Container = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 1.875rem;
    font-weight: bold;
    color: #2f8f9d;
    margin-bottom: 0.5rem;
  }

  p {
    color: #6c757d;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const FiltersPanel = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  gap: 2rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
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

const MainContent = styled.div`
  display: flex;
  gap: 2rem;
`;

const PatientList = styled.div`
  flex: 1;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ListHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
  flex: 1;
  max-width: 400px;
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  margin-left: 0.5rem;
  flex: 1;
  &:focus {
    outline: none;
  }
`;

const ListActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    padding: 1rem;
    text-align: left;
    font-weight: 500;
    color: #4a5568;
    border-bottom: 2px solid #e2e8f0;
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid #e2e8f0;
  }
`;

const SortableHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    color: #2f8f9d;
  }
`;

const TableRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${(props) => (props.selected ? "#f8f9fa" : "transparent")};

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;

  ${(props) => {
    switch (props.status.toLowerCase()) {
      case "active":
        return `
          background-color: #def7ec;
          color: #03543f;
        `;
      case "discharged":
        return `
          background-color: #fde8e8;
          color: #9b1c1c;
        `;
      default:
        return `
          background-color: #e5e7eb;
          color: #374151;
        `;
    }
  }}
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionIcon = styled.button`
  padding: 0.5rem;
  border: none;
  background: none;
  border-radius: 0.375rem;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8f9fa;
    color: #2f8f9d;
  }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
`;

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background: white;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: #f8f9fa;
  }
`;

const PaginationInfo = styled.span`
  color: #4a5568;
  font-size: 0.875rem;
`;

const PatientDetails = styled.div`
  width: 400px;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const DetailsHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2f8f9d;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #4a5568;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  line-height: 1;

  &:hover {
    background: #f8f9fa;
  }
`;

const TabsContainer = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 1rem;
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: none;
  background: none;
  color: ${(props) => (props.active ? "#2f8f9d" : "#4a5568")};
  font-weight: 500;
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${(props) => (props.active ? "#2f8f9d" : "transparent")};
  }

  &:hover {
    color: #2f8f9d;
  }
`;

const TabContent = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
`;

const PersonalInfoCard = styled.div`
  background: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ProfilePicLarge = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2f8f9d;
    margin: 0;
  }

  span {
    color: #4a5568;
    font-size: 0.875rem;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InfoLabel = styled.span`
  font-size: 0.75rem;
  color: #6c757d;
  text-transform: uppercase;
`;

const InfoValue = styled.span`
  color: #2d3748;
  font-weight: 500;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const QuickActionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  color: #4a5568;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8f9fa;
    border-color: #2f8f9d;
    color: #2f8f9d;
  }
`;

const VitalsCard = styled.div`
  background: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const VitalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const VitalItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const VitalLabel = styled.span`
  font-size: 0.75rem;
  color: #6c757d;
  text-transform: uppercase;
`;

const VitalValue = styled.span`
  color: #2d3748;
  font-weight: 500;
`;

const AppointmentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const AppointmentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AppointmentCard = styled.div`
  background: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1.5rem;
`;

const AppointmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const AppointmentDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
`;

const AppointmentStatus = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.status === "Completed" ? "#def7ec" : "#fde8e8"};
  color: ${(props) => (props.status === "Completed" ? "#03543f" : "#9b1c1c")};
`;

const AppointmentDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

const AppointmentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const AppointmentNotes = styled.div`
  color: #4a5568;
  font-size: 0.875rem;
`;

const MedicalHistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TimelineItem = styled.div`
  display: flex;
  gap: 1rem;
`;

const TimelineDate = styled.div`
  width: 100px;
  color: #4a5568;
  font-size: 0.875rem;
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const MedicalRecordCard = styled.div`
  background: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1.5rem;
`;

const RecordHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const RecordDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PrescriptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PrescriptionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #4a5568;
  font-size: 0.875rem;
`;

const RecordNotes = styled.div`
  color: #4a5568;
  font-size: 0.875rem;
`;

const AttachmentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AttachmentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  font-size: 0.875rem;
`;

const InsuranceCard = styled.div`
  background: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1.5rem;
`;

const InsuranceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const InsuranceStatus = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${(props) => (props.active ? "#def7ec" : "#fde8e8")};
  color: ${(props) => (props.active ? "#03543f" : "#9b1c1c")};
`;

const InsuranceDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showFilters, setShowFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    age: "all",
    gender: "all",
    status: "all",
  });
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [patientsData, setPatientsData] = useState(initialPatients);

  const itemsPerPage = 10;

  // Add New Patient
  const handleAddPatient = (newPatient) => {
    const id = `P${String(patientsData.length + 1).padStart(3, "0")}`;
    const patientWithId = { ...newPatient, id };
    setPatientsData([...patientsData, patientWithId]);
  };

  // Sorting function
  const sortedPatients = [...patientsData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const direction = sortConfig.direction === "asc" ? 1 : -1;
    return a[sortConfig.key].localeCompare(b[sortConfig.key]) * direction;
  });

  // Filtering function
  const filteredPatients = sortedPatients.filter((patient) => {
    const matchesSearch =
      patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === "All" || patient.status.toLowerCase() === filter.toLowerCase();

    const matchesAdvancedFilters =
      (advancedFilters.age === "all" ||
        (advancedFilters.age === "under30" && patient.age < 30) ||
        (advancedFilters.age === "30to50" &&
          patient.age >= 30 &&
          patient.age <= 50) ||
        (advancedFilters.age === "over50" && patient.age > 50)) &&
      (advancedFilters.gender === "all" ||
        patient.gender.toLowerCase() ===
          advancedFilters.gender.toLowerCase()) &&
      (advancedFilters.status === "all" ||
        patient.status.toLowerCase() === advancedFilters.status.toLowerCase());

    return matchesSearch && matchesFilter && matchesAdvancedFilters;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setActiveTab("overview");
  };

  const handleExport = (format) => {
    alert(`Exporting patient data as ${format}`);
  };

  const renderPatientDetails = () => {
    if (!selectedPatient) return null;

    switch (activeTab) {
      case "overview":
        return (
          <TabContent>
            <PersonalInfoCard>
              <ProfileHeader>
                <ProfilePicLarge
                  src={selectedPatient.profilePic}
                  alt={selectedPatient.firstName}
                />
                <ProfileInfo>
                  <h3>
                    {selectedPatient.firstName} {selectedPatient.surname}
                  </h3>
                  <span>ID: {selectedPatient.id}</span>
                  <StatusBadge status={selectedPatient.status}>
                    {selectedPatient.status}
                  </StatusBadge>
                </ProfileInfo>
              </ProfileHeader>
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>Date of Birth</InfoLabel>
                  <InfoValue>{selectedPatient.dateOfBirth}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Age</InfoLabel>
                  <InfoValue>{selectedPatient.age} years</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Gender</InfoLabel>
                  <InfoValue>{selectedPatient.gender}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Phone</InfoLabel>
                  <InfoValue>{selectedPatient.contact.phone}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Email</InfoLabel>
                  <InfoValue>{selectedPatient.contact.email}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Address</InfoLabel>
                  <InfoValue>{selectedPatient.contact.address}</InfoValue>
                </InfoItem>
              </InfoGrid>
            </PersonalInfoCard>

            <QuickActions>
              <QuickActionButton>
                <Calendar size={16} />
                Schedule Appointment
              </QuickActionButton>
              <QuickActionButton>
                <MessageSquare size={16} />
                Send Message
              </QuickActionButton>
              <QuickActionButton>
                <FileText size={16} />
                View Documents
              </QuickActionButton>
            </QuickActions>

            <VitalsCard>
              <h4>Latest Vitals</h4>
              <VitalsGrid>
                {selectedPatient.vitals[0] &&
                  Object.entries(selectedPatient.vitals[0])
                    .filter(([key]) => key !== "date")
                    .map(([key, value]) => (
                      <VitalItem key={key}>
                        <VitalLabel>
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </VitalLabel>
                        <VitalValue>{value}</VitalValue>
                      </VitalItem>
                    ))}
              </VitalsGrid>
            </VitalsCard>
          </TabContent>
        );

      case "appointments":
        return (
          <TabContent>
            <AppointmentsHeader>
              <h4>Appointments History</h4>
              <ActionButton>
                <Plus size={16} />
                New Appointment
              </ActionButton>
            </AppointmentsHeader>
            <AppointmentsList>
              {selectedPatient.appointments.map((appointment) => (
                <AppointmentCard key={appointment.id}>
                  <AppointmentHeader>
                    <AppointmentDate>
                      <Calendar size={16} />
                      {appointment.date} at {appointment.time}
                    </AppointmentDate>
                    <AppointmentStatus status={appointment.status}>
                      {appointment.status}
                    </AppointmentStatus>
                  </AppointmentHeader>
                  <AppointmentDetails>
                    <AppointmentInfo>
                      <InfoLabel>Doctor</InfoLabel>
                      <InfoValue>{appointment.doctor}</InfoValue>
                    </AppointmentInfo>
                    <AppointmentInfo>
                      <InfoLabel>Department</InfoLabel>
                      <InfoValue>{appointment.department}</InfoValue>
                    </AppointmentInfo>
                    <AppointmentInfo>
                      <InfoLabel>Reason</InfoLabel>
                      <InfoValue>{appointment.reason}</InfoValue>
                    </AppointmentInfo>
                  </AppointmentDetails>
                  <AppointmentNotes>{appointment.notes}</AppointmentNotes>
                </AppointmentCard>
              ))}
            </AppointmentsList>
          </TabContent>
        );

      case "medical-history":
        return (
          <TabContent>
            <MedicalHistoryHeader>
              <h4>Medical History</h4>
              <FilterButton>
                <Filter size={16} />
                Filter Records
              </FilterButton>
            </MedicalHistoryHeader>
            <Timeline>
              {selectedPatient.medicalHistory.map((record, index) => (
                <TimelineItem key={index}>
                  <TimelineDate>{record.date}</TimelineDate>
                  <TimelineContent>
                    <MedicalRecordCard>
                      <RecordHeader>
                        <h5>{record.diagnosis}</h5>
                        <span>Dr. {record.doctor}</span>
                      </RecordHeader>
                      <RecordDetails>
                        <PrescriptionList>
                          {record.prescription.map((med, idx) => (
                            <PrescriptionItem key={idx}>
                              <span>{med.medicine}</span>
                              <span>{med.dosage}</span>
                              <span>{med.frequency}</span>
                            </PrescriptionItem>
                          ))}
                        </PrescriptionList>
                        <RecordNotes>{record.notes}</RecordNotes>
                        {record.attachments && (
                          <AttachmentsList>
                            {record.attachments.map((file, idx) => (
                              <AttachmentItem key={idx}>
                                <FileIcon size={16} />
                                {file}
                              </AttachmentItem>
                            ))}
                          </AttachmentsList>
                        )}
                      </RecordDetails>
                    </MedicalRecordCard>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </TabContent>
        );

      case "insurance":
        return (
          <TabContent>
            <InsuranceCard>
              <InsuranceHeader>
                <h4>Insurance Information</h4>
                <InsuranceStatus active={true}>Active</InsuranceStatus>
              </InsuranceHeader>
              <InsuranceDetails>
                <InfoItem>
                  <InfoLabel>Provider</InfoLabel>
                  <InfoValue>{selectedPatient.insurance.provider}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Policy Number</InfoLabel>
                  <InfoValue>
                    {selectedPatient.insurance.policyNumber}
                  </InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Valid Until</InfoLabel>
                  <InfoValue>{selectedPatient.insurance.validUntil}</InfoValue>
                </InfoItem>
              </InsuranceDetails>
            </InsuranceCard>
          </TabContent>
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      {/* Header */}
      <Header>
        <HeaderContent>
          <div>
            <h1>Patients</h1>
            <p>Manage patient records and appointments</p>
          </div>
          <HeaderActions>
            <ActionButton onClick={() => setShowFilters(!showFilters)}>
              <Filter size={16} />
              Advanced Filters
            </ActionButton>
            <ActionButton
              primary
              onClick={() => setIsAddPatientModalOpen(true)}
            >
              <Plus size={16} />
              Add Patient
            </ActionButton>
          </HeaderActions>
        </HeaderContent>
      </Header>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <FiltersPanel>
          <FilterGroup>
            <FilterLabel>Age Range</FilterLabel>
            <Select
              value={advancedFilters.age}
              onChange={(e) =>
                setAdvancedFilters({ ...advancedFilters, age: e.target.value })
              }
            >
              <option value="all">All Ages</option>
              <option value="under30">Under 30</option>
              <option value="30to50">30-50</option>
              <option value="over50">Over 50</option>
            </Select>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>Gender</FilterLabel>
            <Select
              value={advancedFilters.gender}
              onChange={(e) =>
                setAdvancedFilters({
                  ...advancedFilters,
                  gender: e.target.value,
                })
              }
            >
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FilterGroup>
          <FilterGroup>
            <FilterLabel>Status</FilterLabel>
            <Select
              value={advancedFilters.status}
              onChange={(e) =>
                setAdvancedFilters({
                  ...advancedFilters,
                  status: e.target.value,
                })
              }
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="discharged">Discharged</option>
            </Select>
          </FilterGroup>
        </FiltersPanel>
      )}

      {/* Main Content */}
      <MainContent>
        <PatientList>
          <ListHeader>
            <SearchBar>
              <Search size={20} />
              <SearchInput
                placeholder="Search patients by name, ID, or contact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchBar>
            <ListActions>
              <ActionButton onClick={() => handleExport("CSV")}>
                <Download size={16} />
                Export CSV
              </ActionButton>
              <ActionButton onClick={() => handleExport("PDF")}>
                <Download size={16} />
                Export PDF
              </ActionButton>
            </ListActions>
          </ListHeader>

          <Table>
            <thead>
              <tr>
                <th>Profile</th>
                <th onClick={() => handleSort("firstName")}>
                  <SortableHeader>
                    First Name
                    <ArrowUpDown size={14} />
                  </SortableHeader>
                </th>
                <th onClick={() => handleSort("surname")}>
                  <SortableHeader>
                    Surname
                    <ArrowUpDown size={14} />
                  </SortableHeader>
                </th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th onClick={() => handleSort("age")}>
                  <SortableHeader>
                    Age
                    <ArrowUpDown size={14} />
                  </SortableHeader>
                </th>
                <th>Patient ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPatients.map((patient) => (
                <TableRow
                  key={patient.id}
                  onClick={() => handlePatientClick(patient)}
                  selected={selectedPatient?.id === patient.id}
                >
                  <td>
                    <ProfilePic
                      src={patient.profilePic}
                      alt={patient.firstName}
                    />
                  </td>
                  <td>{patient.firstName}</td>
                  <td>{patient.surname}</td>
                  <td>{patient.dateOfBirth}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.age}</td>
                  <td>{patient.id}</td>
                  <td>
                    <StatusBadge status={patient.status}>
                      {patient.status}
                    </StatusBadge>
                  </td>
                  <td>
                    <ActionButtons>
                      <ActionIcon title="Edit">
                        <Edit size={16} />
                      </ActionIcon>
                      <ActionIcon title="Delete">
                        <Trash size={16} />
                      </ActionIcon>
                      <ActionIcon title="More">
                        <MoreVertical size={16} />
                      </ActionIcon>
                    </ActionButtons>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <PaginationButton
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
              Previous
            </PaginationButton>
            <PaginationInfo>
              Page {currentPage} of {totalPages}
            </PaginationInfo>
            <PaginationButton
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight size={16} />
            </PaginationButton>
          </Pagination>
        </PatientList>

        {/* Patient Details Sidebar */}
        {selectedPatient && (
          <PatientDetails>
            <DetailsHeader>
              <h2>Patient Details</h2>
              <CloseButton onClick={() => setSelectedPatient(null)}>
                ×
              </CloseButton>
            </DetailsHeader>

            <TabsContainer>
              <TabList>
                <Tab
                  active={activeTab === "overview"}
                  onClick={() => setActiveTab("overview")}
                >
                  <User size={16} />
                  Overview
                </Tab>
                <Tab
                  active={activeTab === "appointments"}
                  onClick={() => setActiveTab("appointments")}
                >
                  <Calendar size={16} />
                  Appointments
                </Tab>
                <Tab
                  active={activeTab === "medical-history"}
                  onClick={() => setActiveTab("medical-history")}
                >
                  <Activity size={16} />
                  Medical History
                </Tab>
                <Tab
                  active={activeTab === "insurance"}
                  onClick={() => setActiveTab("insurance")}
                >
                  <Heart size={16} />
                  Insurance
                </Tab>
              </TabList>
              {renderPatientDetails()}
            </TabsContainer>
          </PatientDetails>
        )}
      </MainContent>

      {/* Add Patient Modal */}
      <AddPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
        onAddPatient={handleAddPatient}
      />
    </Container>
  );
};

export default Patients;
