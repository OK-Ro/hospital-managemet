import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import {
  Search,
  Filter,
  Calendar,
  Star,
  MessageSquare,
  Video,
  Book,
  Award,
  BarChart2,
  FileText,
  Users,
  Clock,
  PlusCircle,
  Edit,
  Trash,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Mail,
  Briefcase,
  Globe,
  Zap,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { doctorsData } from "./Data/doctorsData";

// Sample doctor data (expa

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(12);

  useEffect(() => {
    // Simulating API call to fetch doctors data
    const fetchDoctors = async () => {
      // In a real application, you would fetch data from your backend here
      setDoctors(doctorsData);
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors
      .filter(
        (doctor) =>
          (doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.specialty
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) &&
          (filterSpecialty === "All" || doctor.specialty === filterSpecialty)
      )
      .sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [doctors, searchQuery, filterSpecialty, sortBy, sortOrder]);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const specialties = useMemo(
    () => ["All", ...new Set(doctors.map((doctor) => doctor.specialty))],
    [doctors]
  );

  const handleSort = (key) => {
    setSortBy(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Container>
      <Header>
        <h1>Doctors Management</h1>
        <HeaderActions>
          <ActionButton
            onClick={() =>
              setViewMode(viewMode === "grid" ? "calendar" : "grid")
            }
          >
            {viewMode === "grid" ? <Calendar size={16} /> : <Users size={16} />}
            {viewMode === "grid" ? "Calendar View" : "Grid View"}
          </ActionButton>
          <ActionButton primary>
            <PlusCircle size={16} />
            Add New Doctor
          </ActionButton>
        </HeaderActions>
      </Header>

      <ControlPanel>
        <SearchBar>
          <Search size={20} />
          <input
            type="text"
            placeholder="Search doctors by name or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>
        <FilterDropdown>
          <Filter size={16} />
          <select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
          >
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </FilterDropdown>
        <SortDropdown>
          <BarChart2 size={16} />
          <select value={sortBy} onChange={(e) => handleSort(e.target.value)}>
            <option value="name">Name</option>
            <option value="specialty">Specialty</option>
            <option value="rating">Rating</option>
            <option value="experience">Experience</option>
          </select>
          <button onClick={() => handleSort(sortBy)}>
            {sortOrder === "asc" ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
        </SortDropdown>
      </ControlPanel>

      {viewMode === "grid" ? (
        <>
          <DoctorsGrid>
            {currentDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
              >
                <DoctorImageContainer>
                  <DoctorImage src={doctor.imageUrl} alt={doctor.name} />
                  <DoctorStatus status={doctor.onCallStatus}>
                    {doctor.onCallStatus}
                  </DoctorStatus>
                </DoctorImageContainer>
                <DoctorInfo>
                  <h3>{doctor.name}</h3>
                  <p>{doctor.specialty}</p>
                  <Qualifications>
                    <Award size={14} />
                    <span>{doctor.qualifications}</span>
                  </Qualifications>
                  <Rating>
                    <Star size={14} fill="#FFD700" stroke="#FFD700" />
                    <span>
                      {doctor.rating} ({doctor.totalRatings} reviews)
                    </span>
                  </Rating>
                  <Experience>
                    <Briefcase size={14} />
                    <span>{doctor.experience} years experience</span>
                  </Experience>
                </DoctorInfo>
                <DoctorActions>
                  <ActionIcon title="Schedule Appointment">
                    <Book size={20} />
                  </ActionIcon>
                  <ActionIcon title="Send Message">
                    <MessageSquare size={20} />
                  </ActionIcon>
                  <ActionIcon
                    title="Video Consultation"
                    disabled={!doctor.telemedicineEnabled}
                  >
                    <Video size={20} />
                  </ActionIcon>
                </DoctorActions>
              </DoctorCard>
            ))}
          </DoctorsGrid>
          <Pagination>
            {Array.from(
              { length: Math.ceil(filteredDoctors.length / doctorsPerPage) },
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
        </>
      ) : (
        <CalendarView>
          {/* Implement a calendar view here */}
          <p>Calendar view not implemented in this example</p>
        </CalendarView>
      )}

      {selectedDoctor && (
        <DoctorDetailsModal>
          <ModalContent>
            <CloseButton onClick={() => setSelectedDoctor(null)}>
              &times;
            </CloseButton>
            <ModalHeader>
              <DoctorImage
                src={selectedDoctor.imageUrl}
                alt={selectedDoctor.name}
              />
              <div>
                <h2>{selectedDoctor.name}</h2>
                <p>{selectedDoctor.specialty}</p>
                <Rating>
                  <Star size={16} fill="#FFD700" stroke="#FFD700" />
                  <span>
                    {selectedDoctor.rating} ({selectedDoctor.totalRatings}{" "}
                    reviews)
                  </span>
                </Rating>
              </div>
            </ModalHeader>
            <ModalBody>
              <ModalSection>
                <h3>Overview</h3>
                <OverviewGrid>
                  <OverviewItem>
                    <Briefcase size={20} />
                    <div>
                      <h4>Experience</h4>
                      <p>{selectedDoctor.experience} years</p>
                    </div>
                  </OverviewItem>
                  <OverviewItem>
                    <Users size={20} />
                    <div>
                      <h4>Patients</h4>
                      <p>{selectedDoctor.totalRatings}+</p>
                    </div>
                  </OverviewItem>
                  <OverviewItem>
                    <Globe size={20} />
                    <div>
                      <h4>Languages</h4>
                      <p>{selectedDoctor.languages.join(", ")}</p>
                    </div>
                  </OverviewItem>
                  <OverviewItem>
                    <FileText size={20} />
                    <div>
                      <h4>Publications</h4>
                      <p>{selectedDoctor.publications}</p>
                    </div>
                  </OverviewItem>
                </OverviewGrid>
              </ModalSection>

              <ModalSection>
                <h3>Specializations</h3>
                <TagContainer>
                  {selectedDoctor.specializations.map((spec, index) => (
                    <Tag key={index}>{spec}</Tag>
                  ))}
                </TagContainer>
              </ModalSection>

              <ModalSection>
                <h3>Education & Credentials</h3>
                <Timeline>
                  {selectedDoctor.education
                    .concat(selectedDoctor.credentials)
                    .sort((a, b) => b.year - a.year)
                    .map((item, index) => (
                      <TimelineItem key={index}>
                        <TimelinePoint />
                        <TimelineContent>
                          <h4>{item.degree || item.title}</h4>
                          <p>{item.institution || ""}</p>
                          <span>{item.year}</span>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                </Timeline>
              </ModalSection>

              <ModalSection>
                <h3>Awards & Recognitions</h3>
                <AwardsList>
                  {selectedDoctor.awards.map((award, index) => (
                    <AwardItem key={index}>
                      <Award size={20} />
                      <span>{award}</span>
                    </AwardItem>
                  ))}
                </AwardsList>
              </ModalSection>

              <ModalSection>
                <h3>Performance Metrics</h3>
                <MetricsGrid>
                  <Metric>
                    <Activity size={24} />
                    <h4>Patient Satisfaction</h4>
                    <p>
                      {selectedDoctor.performanceMetrics.patientSatisfaction}%
                    </p>
                  </Metric>
                  <Metric>
                    <Clock size={24} />
                    <h4>Avg. Consultation Time</h4>
                    <p>
                      {selectedDoctor.performanceMetrics.avgConsultationTime}{" "}
                      min
                    </p>
                  </Metric>
                  <Metric>
                    <Zap size={24} />
                    <h4>Successful Treatments</h4>
                    <p>
                      {selectedDoctor.performanceMetrics.successfulTreatments}%
                    </p>
                  </Metric>
                </MetricsGrid>
              </ModalSection>

              <ModalSection>
                <h3>Recent Performance</h3>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={selectedDoctor.recentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="patients"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </ModalSection>

              <ModalSection>
                <h3>Availability</h3>
                <AvailabilityGrid>
                  {Object.entries(selectedDoctor.availability).map(
                    ([day, hours]) => (
                      <AvailabilityItem key={day}>
                        <h4>{day}</h4>
                        <p>{hours}</p>
                      </AvailabilityItem>
                    )
                  )}
                </AvailabilityGrid>
              </ModalSection>
            </ModalBody>
            <ModalFooter>
              <ActionButton>
                <Edit size={16} />
                Edit Profile
              </ActionButton>
              <ActionButton>
                <Book size={16} />
                Schedule Appointment
              </ActionButton>
              <ActionButton>
                <MessageSquare size={16} />
                Send Message
              </ActionButton>
            </ModalFooter>
          </ModalContent>
        </DoctorDetailsModal>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 2rem;
  background-color: #f0f4f8;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    font-weight: 700;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
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
    border: 1px solid #3498db;

    &:hover {
      background-color: #ecf0f1;
    }
  `}
`;

const ControlPanel = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  flex: 1;
  min-width: 200px;

  input {
    border: none;
    outline: none;
    font-size: 1rem;
    margin-left: 0.5rem;
    width: 100%;
  }
`;

const FilterDropdown = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;

  select {
    border: none;
    outline: none;
    font-size: 1rem;
    margin-left: 0.5rem;
    background: transparent;
  }
`;

const SortDropdown = styled(FilterDropdown)`
  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-left: 0.5rem;
  }
`;

const DoctorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const DoctorCard = styled.div`
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const DoctorImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const DoctorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DoctorInfo = styled.div`
  padding: 1.5rem;

  h3 {
    margin: 0;
    font-size: 1.25rem;
    color: #2c3e50;
  }

  p {
    margin: 0.5rem 0;
    color: #7f8c8d;
  }
`;

const Qualifications = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #34495e;
  margin-top: 0.5rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f39c12;
  margin-top: 0.5rem;
`;

const Experience = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #16a085;
  margin-top: 0.5rem;
`;

const DoctorActions = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  border-top: 1px solid #ecf0f1;
`;

const ActionIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #3498db;
  transition: all 0.3s ease;

  &:hover {
    color: #2980b9;
  }

  ${(props) =>
    props.disabled &&
    `
    color: #bdc3c7;
    cursor: not-allowed;
  `}
`;

const DoctorStatus = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;

  ${(props) =>
    props.status === "Available"
      ? `
    background-color: #2ecc71;
    color: white;
  `
      : `
    background-color: #e74c3c;
    color: white;
  `}
`;

const CalendarView = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #3498db;
  background-color: ${(props) => (props.active ? "#3498db" : "white")};
  color: ${(props) => (props.active ? "white" : "#3498db")};
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3498db;
    color: white;
  }
`;

const DoctorDetailsModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 1rem;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  border-bottom: 1px solid #ecf0f1;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #2c3e50;
  }

  p {
    margin: 0.5rem 0;
    color: #7f8c8d;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const ModalSection = styled.section`
  margin-bottom: 2rem;

  h3 {
    font-size: 1.25rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }
`;

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const OverviewItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;

  h4 {
    margin: 0;
    font-size: 0.875rem;
    color: #7f8c8d;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #2c3e50;
    font-weight: 600;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background-color: #3498db;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
`;

const Timeline = styled.div`
  position: relative;
  padding-left: 2rem;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #3498db;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const TimelinePoint = styled.div`
  position: absolute;
  left: -2.4rem;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: #3498db;
`;

const TimelineContent = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;

  h4 {
    margin: 0;
    font-size: 1rem;
    color: #2c3e50;
  }

  p {
    margin: 0.25rem 0;
    font-size: 0.875rem;
    color: #7f8c8d;
  }

  span {
    font-size: 0.75rem;
    color: #95a5a6;
  }
`;

const AwardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AwardItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;

  span {
    font-size: 1rem;
    color: #2c3e50;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const Metric = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;

  h4 {
    margin: 0.5rem 0;
    font-size: 0.875rem;
    color: #7f8c8d;
  }

  p {
    margin: 0;
    font-size: 1.25rem;
    color: #2c3e50;
    font-weight: 600;
  }
`;

const ChartContainer = styled.div`
  height: 200px;
  width: 100%;
`;

const AvailabilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const AvailabilityItem = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;

  h4 {
    margin: 0;
    font-size: 0.875rem;
    color: #7f8c8d;
    text-transform: capitalize;
  }

  p {
    margin: 0.5rem 0 0;
    font-size: 0.875rem;
    color: #2c3e50;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 2rem;
  border-top: 1px solid #ecf0f1;
`;

export default Doctors;
