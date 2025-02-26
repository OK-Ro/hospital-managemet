"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Search,
  Calendar,
  Star,
  MessageSquare,
  Phone,
  Award,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  Clock,
  Book,
  AlertCircle,
} from "lucide-react";
import { nursesData } from "./Data/nursesData";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f0f4f8;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  ${(props) =>
    props.primary
      ? `
    background-color: #3498db;
    color: white;
    border: none;
    &:hover {
      background-color: #2980b9;
    }
  `
      : `
    background-color: white;
    color: #3498db;
    border: 2px solid #3498db;
    &:hover {
      background-color: #3498db;
      color: white;
    }
  `}
`;

const ControlPanel = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SearchBar = styled.div`
  position: relative;
  flex-grow: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #3498db;
  border-radius: 25px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.3);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #3498db;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #3498db;
  border-radius: 25px;
  background-color: white;
  color: #2c3e50;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.3);
  }
`;

const NursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const NurseCard = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const NurseCardContent = styled.div`
  padding: 1.5rem;
`;

const NurseInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const NurseImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #3498db;
`;

const NurseName = styled.h3`
  font-weight: 600;
  margin: 0;
  color: #2c3e50;
  font-size: 1.2rem;
`;

const NurseSpecialty = styled.p`
  color: #7f8c8d;
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
`;

const NurseDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #34495e;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 0.75rem;

  ${(props) =>
    props.status === "On Duty"
      ? `
    background-color: #e6f7ed;
    color: #1d9f5f;
  `
      : `
    background-color: #fde8e8;
    color: #e02424;
  `}
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border-radius: 50%;
  background-color: #e9ecef;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3498db;
    color: white;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid #3498db;
  background-color: ${(props) => (props.active ? "#3498db" : "white")};
  color: ${(props) => (props.active ? "white" : "#3498db")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:first-child {
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }

  &:last-child {
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }

  &:not(:last-child) {
    border-right: none;
  }

  &:hover {
    background-color: #3498db;
    color: white;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const EmergencyButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: #c0392b;
    transform: scale(1.1);
  }
`;

const Nurses = () => {
  const [nurses, setNurses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [filterShift, setFilterShift] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [nursesPerPage] = useState(12);
  const [selectedNurse, setSelectedNurse] = useState(null);

  useEffect(() => {
    // Simulating API call to fetch nurses data
    setNurses(nursesData);
  }, []);

  const filteredNurses = React.useMemo(() => {
    return nurses
      .filter(
        (nurse) =>
          (nurse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            nurse.specialty
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) &&
          (filterDepartment === "All" ||
            nurse.department === filterDepartment) &&
          (filterShift === "All" || nurse.shift === filterShift)
      )
      .sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [nurses, searchQuery, filterDepartment, filterShift, sortBy, sortOrder]);

  const indexOfLastNurse = currentPage * nursesPerPage;
  const indexOfFirstNurse = indexOfLastNurse - nursesPerPage;
  const currentNurses = filteredNurses.slice(
    indexOfFirstNurse,
    indexOfLastNurse
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const departments = React.useMemo(
    () => ["All", ...new Set(nurses.map((nurse) => nurse.department))],
    [nurses]
  );

  const shifts = ["All", "Day", "Night", "Weekend"];

  const handleSort = (key) => {
    setSortBy(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Container>
      <Header>
        <Title>Nurses Management</Title>
        <ButtonGroup>
          <Button>
            <Calendar size={16} /> Shift Calendar
          </Button>
          <Button primary>
            <PlusCircle size={16} /> Add New Nurse
          </Button>
        </ButtonGroup>
      </Header>

      <ControlPanel>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search nurses by name or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon size={20} />
        </SearchBar>
        <Select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </Select>
        <Select
          value={filterShift}
          onChange={(e) => setFilterShift(e.target.value)}
        >
          {shifts.map((shift) => (
            <option key={shift} value={shift}>
              {shift}
            </option>
          ))}
        </Select>
        <Select value={sortBy} onChange={(e) => handleSort(e.target.value)}>
          <option value="name">Name</option>
          <option value="specialty">Specialty</option>
          <option value="rating">Rating</option>
          <option value="experience">Experience</option>
        </Select>
        <Button onClick={() => handleSort(sortBy)}>
          {sortOrder === "asc" ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </Button>
      </ControlPanel>

      <NursesGrid>
        {currentNurses.map((nurse) => (
          <NurseCard key={nurse.id}>
            <NurseCardContent>
              <NurseInfo>
                <NurseImage
                  src={nurse.imageUrl || "/placeholder.svg"}
                  alt={nurse.name}
                />
                <div>
                  <NurseName>{nurse.name}</NurseName>
                  <NurseSpecialty>{nurse.specialty}</NurseSpecialty>
                </div>
              </NurseInfo>
              <NurseDetails>
                <DetailItem>
                  <Award size={16} color="#3498db" />
                  <span>{nurse.experience} years experience</span>
                </DetailItem>
                <DetailItem>
                  <Star size={16} color="#f1c40f" />
                  <span>
                    {nurse.rating} ({nurse.totalRatings} reviews)
                  </span>
                </DetailItem>
                <DetailItem>
                  <Clock size={16} color="#2ecc71" />
                  <span>{nurse.shift} Shift</span>
                </DetailItem>
              </NurseDetails>
              <StatusBadge status={nurse.status}>{nurse.status}</StatusBadge>
            </NurseCardContent>
            <CardActions>
              <Button onClick={() => setSelectedNurse(nurse)}>
                View Profile
              </Button>
              <ButtonGroup>
                <ActionButton>
                  <MessageSquare size={16} />
                </ActionButton>
                <ActionButton>
                  <Phone size={16} />
                </ActionButton>
                <ActionButton>
                  <Book size={16} />
                </ActionButton>
              </ButtonGroup>
            </CardActions>
          </NurseCard>
        ))}
      </NursesGrid>

      <Pagination>
        {Array.from(
          { length: Math.ceil(filteredNurses.length / nursesPerPage) },
          (_, i) => (
            <PaginationButton
              key={i}
              onClick={() => paginate(i + 1)}
              active={currentPage === i + 1}
            >
              {i + 1}
            </PaginationButton>
          )
        )}
      </Pagination>

      {selectedNurse && (
        <Modal>
          <ModalContent>
            <Button onClick={() => setSelectedNurse(null)}>Close</Button>
            <NurseDetailsContent nurse={selectedNurse} />
          </ModalContent>
        </Modal>
      )}

      <EmergencyButton title="Request Emergency Assistance">
        <AlertCircle size={24} />
      </EmergencyButton>
    </Container>
  );
};

const TabContainer = styled.div`
  margin-top: 1rem;
`;

const TabButtons = styled.div`
  display: flex;
  border-bottom: 2px solid #e5e7eb;
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 600;
  color: #7f8c8d;
  transition: all 0.3s ease;

  ${(props) =>
    props.active &&
    `
    border-bottom: 2px solid #3498db;
    color: #3498db;
  `}

  &:hover {
    color: #3498db;
  }
`;

const TabContent = styled.div`
  margin-top: 1.5rem;
`;

function NurseDetailsContent({ nurse }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <h2
        style={{ fontSize: "1.5rem", color: "#2c3e50", marginBottom: "1rem" }}
      >
        {nurse.name}
      </h2>
      <p style={{ color: "#7f8c8d", marginBottom: "1.5rem" }}>
        {nurse.specialty}
      </p>
      <TabContainer>
        <TabButtons>
          {["overview", "schedule", "performance", "reviews"].map((tab) => (
            <TabButton
              key={tab}
              onClick={() => setActiveTab(tab)}
              active={activeTab === tab}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabButton>
          ))}
        </TabButtons>
        <TabContent>
          {activeTab === "overview" && (
            <div>
              <h3 style={{ color: "#3498db", marginBottom: "0.75rem" }}>
                Qualifications & Certifications
              </h3>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {nurse.certifications.map((cert, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <Award
                      size={16}
                      style={{ marginRight: "0.5rem", color: "#3498db" }}
                    />
                    {cert}
                  </li>
                ))}
              </ul>
              <h3
                style={{
                  color: "#3498db",
                  marginTop: "1.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                Experience & Specialization
              </h3>
              <p style={{ color: "#34495e" }}>
                {nurse.experience} years of experience in {nurse.specialty}
              </p>
              <h3
                style={{
                  color: "#3498db",
                  marginTop: "1.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                Languages Spoken
              </h3>
              <p style={{ color: "#34495e" }}>{nurse.languages.join(", ")}</p>
              <h3
                style={{
                  color: "#3498db",
                  marginTop: "1.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                Awards & Recognitions
              </h3>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {nurse.awards.map((award, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <Star
                      size={16}
                      style={{ marginRight: "0.5rem", color: "#f1c40f" }}
                    />
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "schedule" && (
            <div>
              <h3 style={{ color: "#3498db", marginBottom: "1rem" }}>
                Availability Schedule
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8f9fa" }}>
                    <th
                      style={{
                        padding: "0.75rem",
                        borderBottom: "2px solid #e9ecef",
                        textAlign: "left",
                      }}
                    >
                      Day
                    </th>
                    <th
                      style={{
                        padding: "0.75rem",
                        borderBottom: "2px solid #e9ecef",
                        textAlign: "left",
                      }}
                    >
                      Shift
                    </th>
                    <th
                      style={{
                        padding: "0.75rem",
                        borderBottom: "2px solid #e9ecef",
                        textAlign: "left",
                      }}
                    >
                      Hours
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nurse.schedule.map((day, index) => (
                    <tr
                      key={index}
                      style={{ borderBottom: "1px solid #e9ecef" }}
                    >
                      <td style={{ padding: "0.75rem" }}>{day.day}</td>
                      <td style={{ padding: "0.75rem" }}>{day.shift}</td>
                      <td style={{ padding: "0.75rem" }}>{day.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "performance" && (
            <div>
              <h3 style={{ color: "#3498db", marginBottom: "1rem" }}>
                Performance Metrics
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#e6f7ed",
                    padding: "1rem",
                    borderRadius: "8px",
                  }}
                >
                  <p
                    style={{
                      color: "#1d9f5f",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Patient Satisfaction
                  </p>
                  <p style={{ fontSize: "1.5rem", color: "#2c3e50" }}>
                    {nurse.performanceMetrics.patientSatisfaction}%
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "#e6f7ff",
                    padding: "1rem",
                    borderRadius: "8px",
                  }}
                >
                  <p
                    style={{
                      color: "#3498db",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Average Response Time
                  </p>
                  <p style={{ fontSize: "1.5rem", color: "#2c3e50" }}>
                    {nurse.performanceMetrics.avgResponseTime} mins
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "#fff5e6",
                    padding: "1rem",
                    borderRadius: "8px",
                  }}
                >
                  <p
                    style={{
                      color: "#f39c12",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Total Procedures Done
                  </p>
                  <p style={{ fontSize: "1.5rem", color: "#2c3e50" }}>
                    {nurse.performanceMetrics.totalProcedures}
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "#f0f4f8",
                    padding: "1rem",
                    borderRadius: "8px",
                  }}
                >
                  <p
                    style={{
                      color: "#34495e",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Patients Assisted (per month)
                  </p>
                  <p style={{ fontSize: "1.5rem", color: "#2c3e50" }}>
                    {nurse.performanceMetrics.patientsPerMonth}
                  </p>
                </div>
              </div>
            </div>
          )}
          {activeTab === "reviews" && (
            <div>
              <h3 style={{ color: "#3498db", marginBottom: "1rem" }}>
                Patient Reviews
              </h3>
              {nurse.reviews.map((review, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "1.5rem",
                    padding: "1rem",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Star
                      size={16}
                      style={{ color: "#f1c40f", marginRight: "0.5rem" }}
                    />
                    <p style={{ fontWeight: "bold", color: "#2c3e50" }}>
                      Rating: {review.rating}/5
                    </p>
                  </div>
                  <p style={{ color: "#34495e" }}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </TabContent>
      </TabContainer>
    </div>
  );
}

export default Nurses;
