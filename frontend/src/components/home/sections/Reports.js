import React, { useState } from "react";
import styled from "styled-components";
import {
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, Filter, Printer, Calendar } from "lucide-react";

// Sample Data
const patientAdmissionsData = [
  { month: "Jan", admissions: 120 },
  { month: "Feb", admissions: 150 },
  { month: "Mar", admissions: 200 },
  { month: "Apr", admissions: 180 },
  { month: "May", admissions: 250 },
  { month: "Jun", admissions: 300 },
];

const revenueData = [
  { month: "Jan", revenue: 50000 },
  { month: "Feb", revenue: 60000 },
  { month: "Mar", revenue: 75000 },
  { month: "Apr", revenue: 80000 },
  { month: "May", revenue: 90000 },
  { month: "Jun", revenue: 100000 },
];

const departmentDistributionData = [
  { name: "Cardiology", value: 400 },
  { name: "Neurology", value: 300 },
  { name: "Pediatrics", value: 200 },
  { name: "Orthopedics", value: 150 },
  { name: "Oncology", value: 100 },
];

const Reports = () => {
  const [filter, setFilter] = useState("Last 6 Months");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleExport = (format) => {
    alert(`Exporting data as ${format}`);
  };

  return (
    <Container>
      <Header>
        <h1>Hospital Reports</h1>
        <p>Analyze real-time and historical data to make informed decisions.</p>
      </Header>

      {/* Key Metrics */}
      <MetricsSection>
        <MetricCard>
          <h3>Total Patients Admitted</h3>
          <p>1,200</p>
          <small>+10% from last month</small>
        </MetricCard>
        <MetricCard>
          <h3>Total Revenue</h3>
          <p>$450,000</p>
          <small>+15% from last month</small>
        </MetricCard>
        <MetricCard>
          <h3>Appointments</h3>
          <p>2,500</p>
          <small>+5% from last month</small>
        </MetricCard>
        <MetricCard>
          <h3>Occupancy Rate</h3>
          <p>85%</p>
          <small>+3% from last month</small>
        </MetricCard>
      </MetricsSection>

      {/* Charts and Graphs */}
      <ChartsSection>
        <ChartContainer>
          <ChartHeader>
            <h3>Patient Admissions Over Time</h3>
            <FilterSelect value={filter} onChange={handleFilterChange}>
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>Custom Range</option>
            </FilterSelect>
          </ChartHeader>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={patientAdmissionsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="admissions" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer>
          <ChartHeader>
            <h3>Revenue Over Time</h3>
          </ChartHeader>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer>
          <ChartHeader>
            <h3>Department Distribution</h3>
          </ChartHeader>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentDistributionData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartsSection>

      {/* Export and Custom Reports */}
      <ActionsSection>
        <ActionButton onClick={() => handleExport("PDF")}>
          <Printer size={16} />
          Export as PDF
        </ActionButton>
        <ActionButton onClick={() => handleExport("CSV")}>
          <Download size={16} />
          Export as CSV
        </ActionButton>
        <ActionButton onClick={() => handleExport("Excel")}>
          <Download size={16} />
          Export as Excel
        </ActionButton>
        <ActionButton>
          <Filter size={16} />
          Generate Custom Report
        </ActionButton>
      </ActionsSection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
`;

const Header = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    color: #2f8f9d;
  }

  p {
    color: #6c757d;
  }
`;

const MetricsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const MetricCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1rem;
    color: #6c757d;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2f8f9d;
  }

  small {
    color: #6c757d;
    font-size: 0.875rem;
  }
`;

const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ChartContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #2f8f9d;
  }
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  background: white;
`;

const ActionsSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ActionButton = styled.button`
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

export default Reports;