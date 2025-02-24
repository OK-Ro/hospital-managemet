const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    surName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    contactInfo: {
      phone: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
      },
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
      },
    },
    medicalHistory: [
      {
        diagnosis: {
          type: String,
          required: true,
        },
        treatment: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        doctor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Doctor",
        },
        notes: String,
      },
    ],
    allergies: {
      type: [String],
      default: [],
    },
    currentMedications: [
      {
        name: String,
        dosage: String,
        frequency: String,
        prescribedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Doctor",
        },
      },
    ],
    emergencyContact: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      relation: {
        type: String,
        required: true,
      },
    },
    insuranceDetails: {
      provider: {
        type: String,
        required: true,
      },
      policyNumber: {
        type: String,
        required: true,
      },
      validUntil: {
        type: Date,
        required: true,
      },
    },
    appointments: [
      {
        appointmentDate: {
          type: Date,
          required: true,
        },
        appointmentType: {
          type: String,
          enum: ["Consultation", "Follow-up", "Emergency", "Routine Checkup"],
          required: true,
        },
        doctor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Doctor",
          required: true,
        },
        notes: String,
        status: {
          type: String,
          enum: ["Scheduled", "Completed", "Canceled", "No-show"],
          default: "Scheduled",
        },
      },
    ],
    createdBy: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: String,
      role: String,
    },
    updatedBy: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: String,
      role: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", PatientSchema);
