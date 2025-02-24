const Patient = require("../models/Patient");
const User = require("../models/User");

// Create a new patient
exports.createPatient = async (req, res) => {
  try {
    // Extract patient data from the request body
    const {
      userId, // logged in user
      firstName,
      surName,
      dateOfBirth,
      gender,
      bloodType,
      contactInfo,
      medicalHistory,
      allergies,
      currentMedications,
      emergencyContact,
      insuranceDetails,
    } = req.body;

    // Fetch the user who is creating the patient
    const createdByUser = await User.findById(userId);
    if (!createdByUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingPatient = await Patient.findOne({
      firstName,
      surName,
      dateOfBirth,
    });

    if (existingPatient)
      return res.status(401).json({ error: "Patient already exists" });

    // Create the patient object
    const newPatient = new Patient({
      userId,
      firstName,
      surName,
      dateOfBirth,
      gender,
      bloodType,
      contactInfo,
      medicalHistory,
      allergies,
      currentMedications,
      emergencyContact,
      insuranceDetails,
    });

    // Save the patient to the database
    const savedPatient = await newPatient.save();

    res.status(201).json({
      message: "Patient created successfully",
      patient: savedPatient,
      creatorsId: createdByUser.id,
      role: createdByUser.role,
      name: createdByUser.surName,
    });
  } catch (error) {
    console.error("Error creating patient:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();

    if (patients.length === 0) {
      return res.status(404).json({
        message: "No patients found",
        details:
          "We could not find any patients in the system. Please check your request or try again later.",
      });
    }

    res.status(200).json({
      message: "Patients retrieved successfully",
      patients,
    });
  } catch (error) {
    console.error("Error retrieving patients:", error);
    res.status(500).json({
      message: "An unexpected error occurred while retrieving patients.",
      error: error.message,
      details:
        "Please try again later or contact support if the issue persists.",
    });
  }
};

exports.getPatient = async (req, res) => {
  try {
    const { firstName, surName, dateOfBirth } = req.query;

    const patient = await Patient.findOne({
      firstName,
      surName,
      dateOfBirth,
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
        details: `No patient found with the name ${firstName} ${surName} and the date of birth ${dateOfBirth}. Please verify the details and try again.`,
      });
    }

    res.status(200).json({
      message: "Patient details retrieved successfully",
      patient,
    });
  } catch (error) {
    console.error("Error retrieving patient:", error);
    res.status(500).json({
      message: "An unexpected error occurred while retrieving the patient.",
      error: error.message,
      details:
        "Please try again later or contact support if the issue persists.",
    });
  }
};
