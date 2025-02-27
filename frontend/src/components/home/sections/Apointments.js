import React, { useState } from "react";
import styled from "styled-components";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  LayoutGrid,
  Calendar as CalendarIcon,
} from "lucide-react";

const Appointments = () => {
  const [currentMonth, setCurrentMonth] = useState("May");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("Week");

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const appointments = [
    {
      date: "3",
      time: "10:00 am - 11:00 am",
      patient: "Isagi Yoichi",
      avatar: "https://i.pravatar.cc/40?img=1",
      status: ["PO", "VN"],
    },
    {
      date: "4",
      time: "10:00 am - 11:00 am",
      patient: "Nagi Seishiro",
      avatar: "https://i.pravatar.cc/40?img=2",
      status: ["PO"],
    },
    {
      date: "6",
      time: "10:00 am - 11:00 am",
      patient: "Kaiser Brown",
      avatar: "https://i.pravatar.cc/40?img=3",
      status: ["VN"],
    },
  ];

  return (
    <Container>
      {/* Main Content */}
      <Content>
        <ContentHeader>
          <div>
            <h1>Appointments</h1>
          </div>
          <NewAppointmentButton>
            <Plus size={16} />
            New Appointment
          </NewAppointmentButton>
        </ContentHeader>

        <AppointmentTools>
          <FilterSection>
            <AllAppointments>
              <CalendarIcon size={16} />
              All Appointments
            </AllAppointments>
            <SearchBar>
              <Search size={16} />
              <SearchInput placeholder="Search anything here" />
            </SearchBar>
          </FilterSection>

          <ViewControls>
            <ViewSelector>
              <option>Week</option>
              <option>Month</option>
            </ViewSelector>
            <ViewIcons>
              <IconButton>
                <LayoutGrid size={16} />
              </IconButton>
              <IconButton active>
                <CalendarIcon size={16} />
              </IconButton>
            </ViewIcons>
          </ViewControls>
        </AppointmentTools>

        <CalendarSection>
          <CalendarHeader>
            <MonthNavigation>
              <ChevronButton>
                <ChevronLeft size={20} />
              </ChevronButton>
              <span>{currentMonth}</span>
              <ChevronButton>
                <ChevronRight size={20} />
              </ChevronButton>
            </MonthNavigation>
            <DateRange>Showing 26 Apr - 5 June 2023</DateRange>
          </CalendarHeader>

          <Calendar>
            <WeekDays>
              {daysOfWeek.map((day) => (
                <WeekDay key={day}>{day}</WeekDay>
              ))}
            </WeekDays>

            <CalendarGrid>
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 5; // Offset to start from previous month
                const appointment = appointments.find(
                  (a) => a.date === String(day)
                );

                return (
                  <CalendarCell key={i} isCurrentMonth={day > 0 && day <= 31}>
                    <CellDate>{day > 0 ? day : ""}</CellDate>
                    {appointment && (
                      <AppointmentCard>
                        <AppointmentTime>{appointment.time}</AppointmentTime>
                        <AppointmentPatient>
                          <Avatar
                            src={appointment.avatar}
                            alt={appointment.patient}
                          />
                          <span>{appointment.patient}</span>
                        </AppointmentPatient>
                        {appointment.status && (
                          <StatusTags>
                            {appointment.status.map((status) => (
                              <StatusTag
                                key={status}
                                type={status.toLowerCase()}
                              >
                                {status}
                              </StatusTag>
                            ))}
                          </StatusTags>
                        )}
                      </AppointmentCard>
                    )}
                  </CalendarCell>
                );
              })}
            </CalendarGrid>
          </Calendar>
        </CalendarSection>
      </Content>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f9fa;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
  margin: 0 2rem;
  flex: 1;
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

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const Content = styled.main`
  padding: 2rem;
  flex: 1;
  overflow-y: auto;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p {
    color: #6c757d;
  }
`;

const NewAppointmentButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const AppointmentTools = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AllAppointments = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #e9ecef;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const ViewControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ViewSelector = styled.select`
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  background: white;
`;

const ViewIcons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  background: ${(props) => (props.active ? "#2F8F9D" : "white")};
  color: ${(props) => (props.active ? "white" : "#6c757d")};
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.active ? "#268391" : "#f8f9fa")};
  }
`;

const CalendarSection = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
`;

const ChevronButton = styled.button`
  padding: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background: #f8f9fa;
  }
`;

const DateRange = styled.span`
  color: #6c757d;
  font-size: 0.875rem;
`;

const Calendar = styled.div`
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid #dee2e6;
`;

const WeekDay = styled.div`
  padding: 1rem;
  text-align: center;
  font-weight: 500;
  color: #6c757d;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const CalendarCell = styled.div`
  min-height: 120px;
  padding: 0.5rem;
  border-right: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  background: ${(props) => (props.isCurrentMonth ? "white" : "#f8f9fa")};

  &:nth-child(7n) {
    border-right: none;
  }
`;

const CellDate = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const AppointmentCard = styled.div`
  background: #f8f9fa;
  padding: 0.5rem;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
`;

const AppointmentTime = styled.div`
  font-size: 0.75rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
`;

const AppointmentPatient = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
`;

const StatusTags = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.25rem;
`;

const StatusTag = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${(props) => {
    switch (props.type) {
      case "po":
        return "#ffd43b";
      case "vn":
        return "#69db7c";
      default:
        return "#e9ecef";
    }
  }};
  color: ${(props) => {
    switch (props.type) {
      case "po":
        return "#664d03";
      case "vn":
        return "#064e3b";
      default:
        return "#495057";
    }
  }};
`;

export default Appointments;
