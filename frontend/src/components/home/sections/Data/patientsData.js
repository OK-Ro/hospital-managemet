exports.initialPatients = [
  {
    id: "P001",
    firstName: "John",
    surname: "Doe",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    age: 33,
    profilePic: "https://i.pravatar.cc/150?img=1",
    status: "Active",
    contact: {
      email: "john.doe@email.com",
      phone: "+1 234 567 890",
      address: "123 Medical St, Health City, HC 12345",
    },
    appointments: [
      {
        id: "A001",
        date: "2023-10-15",
        time: "09:00 AM",
        doctor: "Dr. Smith",
        department: "Cardiology",
        reason: "Annual Checkup",
        status: "Completed",
        notes: "Patient reported chest pain, ECG performed",
      },
      {
        id: "A002",
        date: "2023-09-20",
        time: "02:30 PM",
        doctor: "Dr. Brown",
        department: "Internal Medicine",
        reason: "Follow-up",
        status: "Scheduled",
        notes: "Review of previous treatment",
      },
    ],
    medicalHistory: [
      {
        date: "2023-08-10",
        diagnosis: "Hypertension",
        doctor: "Dr. Smith",
        prescription: [
          { medicine: "Lisinopril", dosage: "10mg", frequency: "Daily" },
        ],
        notes: "Blood pressure: 140/90",
        attachments: ["bp_report.pdf"],
      },
      {
        date: "2023-07-05",
        diagnosis: "Influenza",
        doctor: "Dr. Brown",
        prescription: [
          { medicine: "Tamiflu", dosage: "75mg", frequency: "Twice daily" },
          { medicine: "Paracetamol", dosage: "500mg", frequency: "As needed" },
        ],
        notes: "Fever and body aches",
        attachments: ["blood_test.pdf"],
      },
    ],
    vitals: [
      {
        date: "2023-10-15",
        bloodPressure: "120/80",
        heartRate: "72",
        temperature: "98.6",
        weight: "70kg",
        height: "175cm",
      },
    ],
    allergies: ["Penicillin", "Peanuts"],
    insurance: {
      provider: "HealthCare Plus",
      policyNumber: "HC123456789",
      validUntil: "2024-12-31",
    },
  },
  {
    id: "P002",
    firstName: "Jane",
    surname: "Smith",
    dateOfBirth: "1985-08-22",
    gender: "Female",
    age: 38,
    profilePic: "https://i.pravatar.cc/150?img=2",
    status: "Active",
    contact: {
      email: "jane.smith@email.com",
      phone: "+1 345 678 901",
      address: "456 Wellness Ave, Care City, CC 67890",
    },
    appointments: [
      {
        id: "A003",
        date: "2023-11-10",
        time: "10:00 AM",
        doctor: "Dr. Green",
        department: "Dermatology",
        reason: "Skin Check",
        status: "Scheduled",
        notes: "Annual skin examination",
      },
    ],
    medicalHistory: [
      {
        date: "2023-09-01",
        diagnosis: "Eczema",
        doctor: "Dr. Green",
        prescription: [
          {
            medicine: "Hydrocortisone",
            dosage: "1%",
            frequency: "Twice daily",
          },
        ],
        notes: "Mild eczema on arms",
        attachments: ["skin_report.pdf"],
      },
    ],
    vitals: [
      {
        date: "2023-10-20",
        bloodPressure: "110/70",
        heartRate: "68",
        temperature: "98.4",
        weight: "65kg",
        height: "170cm",
      },
    ],
    allergies: ["Latex"],
    insurance: {
      provider: "Wellness First",
      policyNumber: "WF987654321",
      validUntil: "2025-06-30",
    },
  },
  {
    id: "P003",
    firstName: "Michael",
    surname: "Johnson",
    dateOfBirth: "1975-03-12",
    gender: "Male",
    age: 48,
    profilePic: "https://i.pravatar.cc/150?img=3",
    status: "Active",
    contact: {
      email: "michael.johnson@email.com",
      phone: "+1 456 789 012",
      address: "789 Health Blvd, Care City, CC 54321",
    },
    appointments: [
      {
        id: "A004",
        date: "2023-12-05",
        time: "11:00 AM",
        doctor: "Dr. White",
        department: "Orthopedics",
        reason: "Knee Pain",
        status: "Scheduled",
        notes: "Persistent knee pain, possible arthritis",
      },
    ],
    medicalHistory: [
      {
        date: "2023-10-01",
        diagnosis: "Arthritis",
        doctor: "Dr. White",
        prescription: [
          { medicine: "Ibuprofen", dosage: "400mg", frequency: "As needed" },
        ],
        notes: "Mild arthritis in left knee",
        attachments: ["knee_xray.pdf"],
      },
    ],
    vitals: [
      {
        date: "2023-10-25",
        bloodPressure: "130/85",
        heartRate: "75",
        temperature: "98.7",
        weight: "85kg",
        height: "180cm",
      },
    ],
    allergies: ["Aspirin"],
    insurance: {
      provider: "CarePlus",
      policyNumber: "CP123987456",
      validUntil: "2024-09-15",
    },
  },
  {
    id: "P004",
    firstName: "Emily",
    surname: "Brown",
    dateOfBirth: "1995-11-30",
    gender: "Female",
    age: 28,
    profilePic: "https://i.pravatar.cc/150?img=4",
    status: "Active",
    contact: {
      email: "emily.brown@email.com",
      phone: "+1 567 890 123",
      address: "321 Wellness Rd, Health City, HC 98765",
    },
    appointments: [
      {
        id: "A005",
        date: "2023-11-15",
        time: "03:00 PM",
        doctor: "Dr. Lee",
        department: "Pediatrics",
        reason: "Vaccination",
        status: "Scheduled",
        notes: "Annual flu shot",
      },
    ],
    medicalHistory: [
      {
        date: "2023-10-10",
        diagnosis: "Common Cold",
        doctor: "Dr. Lee",
        prescription: [
          {
            medicine: "Acetaminophen",
            dosage: "500mg",
            frequency: "As needed",
          },
        ],
        notes: "Mild cold symptoms",
        attachments: [],
      },
    ],
    vitals: [
      {
        date: "2023-10-30",
        bloodPressure: "115/75",
        heartRate: "70",
        temperature: "98.5",
        weight: "60kg",
        height: "165cm",
      },
    ],
    allergies: [],
    insurance: {
      provider: "HealthCare Plus",
      policyNumber: "HC456789123",
      validUntil: "2024-12-31",
    },
  },
  {
    id: "P005",
    firstName: "David",
    surname: "Wilson",
    dateOfBirth: "1980-07-18",
    gender: "Male",
    age: 43,
    profilePic: "https://i.pravatar.cc/150?img=5",
    status: "Discharged",
    contact: {
      email: "david.wilson@email.com",
      phone: "+1 678 901 234",
      address: "654 Care Lane, Wellness City, WC 12345",
    },
    appointments: [],
    medicalHistory: [
      {
        date: "2023-09-25",
        diagnosis: "Hypertension",
        doctor: "Dr. Smith",
        prescription: [
          { medicine: "Lisinopril", dosage: "10mg", frequency: "Daily" },
        ],
        notes: "Blood pressure: 145/95",
        attachments: ["bp_report.pdf"],
      },
    ],
    vitals: [
      {
        date: "2023-10-05",
        bloodPressure: "140/90",
        heartRate: "80",
        temperature: "98.6",
        weight: "90kg",
        height: "185cm",
      },
    ],
    allergies: ["Shellfish"],
    insurance: {
      provider: "Wellness First",
      policyNumber: "WF789123456",
      validUntil: "2025-03-31",
    },
  },
  {
    id: "P006",
    firstName: "Sarah",
    surname: "Taylor",
    dateOfBirth: "1992-04-25",
    gender: "Female",
    age: 31,
    profilePic: "https://i.pravatar.cc/150?img=6",
    status: "Active",
    contact: {
      email: "sarah.taylor@email.com",
      phone: "+1 789 012 345",
      address: "987 Health St, Care City, CC 54321",
    },
    appointments: [
      {
        id: "A006",
        date: "2023-12-20",
        time: "09:30 AM",
        doctor: "Dr. Brown",
        department: "Internal Medicine",
        reason: "Follow-up",
        status: "Scheduled",
        notes: "Review of blood test results",
      },
    ],
    medicalHistory: [
      {
        date: "2023-10-15",
        diagnosis: "Anemia",
        doctor: "Dr. Brown",
        prescription: [
          { medicine: "Iron Supplement", dosage: "65mg", frequency: "Daily" },
        ],
        notes: "Low iron levels",
        attachments: ["blood_test.pdf"],
      },
    ],
    vitals: [
      {
        date: "2023-11-01",
        bloodPressure: "120/80",
        heartRate: "72",
        temperature: "98.6",
        weight: "70kg",
        height: "175cm",
      },
    ],
    allergies: [],
    insurance: {
      provider: "HealthCare Plus",
      policyNumber: "HC321654987",
      validUntil: "2024-12-31",
    },
  },
  {
    id: "P007",
    firstName: "James",
    surname: "Anderson",
    dateOfBirth: "1978-12-10",
    gender: "Male",
    age: 45,
    profilePic: "https://i.pravatar.cc/150?img=7",
    status: "Active",
    contact: {
      email: "james.anderson@email.com",
      phone: "+1 890 123 456",
      address: "123 Wellness Ave, Health City, HC 12345",
    },
    appointments: [
      {
        id: "A007",
        date: "2023-11-25",
        time: "02:00 PM",
        doctor: "Dr. Green",
        department: "Dermatology",
        reason: "Skin Rash",
        status: "Scheduled",
        notes: "Persistent rash on arms",
      },
    ],
    medicalHistory: [
      {
        date: "2023-10-20",
        diagnosis: "Contact Dermatitis",
        doctor: "Dr. Green",
        prescription: [
          {
            medicine: "Hydrocortisone",
            dosage: "1%",
            frequency: "Twice daily",
          },
        ],
        notes: "Rash caused by allergic reaction",
        attachments: ["skin_report.pdf"],
      },
    ],
    vitals: [
      {
        date: "2023-11-05",
        bloodPressure: "130/85",
        heartRate: "75",
        temperature: "98.7",
        weight: "85kg",
        height: "180cm",
      },
    ],
    allergies: ["Nickel"],
    insurance: {
      provider: "CarePlus",
      policyNumber: "CP456789123",
      validUntil: "2024-09-15",
    },
  },
  {
    id: "P008",
    firstName: "Olivia",
    surname: "Martinez",
    dateOfBirth: "1987-06-15",
    gender: "Female",
    age: 36,
    profilePic: "https://i.pravatar.cc/150?img=8",
    status: "Active",
    contact: {
      email: "olivia.martinez@email.com",
      phone: "+1 901 234 567",
      address: "456 Care Blvd, Wellness City, WC 67890",
    },
    appointments: [
      {
        id: "A008",
        date: "2023-12-10",
        time: "10:30 AM",
        doctor: "Dr. Lee",
        department: "Pediatrics",
        reason: "Child Vaccination",
        status: "Scheduled",
        notes: "Routine vaccination for child",
      },
    ],
    medicalHistory: [
      {
        date: "2023-10-25",
        diagnosis: "Common Cold",
        doctor: "Dr. Lee",
        prescription: [
          {
            medicine: "Acetaminophen",
            dosage: "500mg",
            frequency: "As needed",
          },
        ],
        notes: "Mild cold symptoms",
        attachments: [],
      },
    ],
    vitals: [
      {
        date: "2023-11-10",
        bloodPressure: "115/75",
        heartRate: "70",
        temperature: "98.5",
        weight: "60kg",
        height: "165cm",
      },
    ],
    allergies: [],
    insurance: {
      provider: "HealthCare Plus",
      policyNumber: "HC789123456",
      validUntil: "2024-12-31",
    },
  },
  {
    id: "P009",
    firstName: "Daniel",
    surname: "Garcia",
    dateOfBirth: "1982-09-20",
    gender: "Male",
    age: 41,
    profilePic: "https://i.pravatar.cc/150?img=9",
    status: "Discharged",
    contact: {
      email: "daniel.garcia@email.com",
      phone: "+1 012 345 678",
      address: "789 Wellness Rd, Care City, CC 54321",
    },
    appointments: [],
    medicalHistory: [
      {
        date: "2023-10-30",
        diagnosis: "Hypertension",
        doctor: "Dr. Smith",
        prescription: [
          { medicine: "Lisinopril", dosage: "10mg", frequency: "Daily" },
        ],
        notes: "Blood pressure: 150/95",
        attachments: ["bp_report.pdf"],
      },
    ],
    vitals: [
      {
        date: "2023-11-15",
        bloodPressure: "145/90",
        heartRate: "80",
        temperature: "98.6",
        weight: "90kg",
        height: "185cm",
      },
    ],
    allergies: ["Shellfish"],
    insurance: {
      provider: "Wellness First",
      policyNumber: "WF123456789",
      validUntil: "2025-03-31",
    },
  },
  {
    id: "P010",
    firstName: "Sophia",
    surname: "Lopez",
    dateOfBirth: "1998-02-28",
    gender: "Female",
    age: 25,
    profilePic: "https://i.pravatar.cc/150?img=10",
    status: "Active",
    contact: {
      email: "sophia.lopez@email.com",
      phone: "+1 123 456 789",
      address: "321 Health St, Wellness City, WC 12345",
    },
    appointments: [
      {
        id: "A009",
        date: "2023-12-15",
        time: "11:30 AM",
        doctor: "Dr. Brown",
        department: "Internal Medicine",
        reason: "Annual Checkup",
        status: "Scheduled",
        notes: "Routine health check",
      },
    ],
    medicalHistory: [
      {
        date: "2023-11-01",
        diagnosis: "Anemia",
        doctor: "Dr. Brown",
        prescription: [
          { medicine: "Iron Supplement", dosage: "65mg", frequency: "Daily" },
        ],
        notes: "Low iron levels",
        attachments: ["blood_test.pdf"],
      },
    ],
    vitals: [
      {
        date: "2023-11-20",
        bloodPressure: "120/80",
        heartRate: "72",
        temperature: "98.6",
        weight: "70kg",
        height: "175cm",
      },
    ],
    allergies: [],
    insurance: {
      provider: "HealthCare Plus",
      policyNumber: "HC654321987",
      validUntil: "2024-12-31",
    },
  },
];
