const express = require("express");
const {
  createPatient,
  getPatients,
} = require("../controllers/patientControlers");

const router = express.Router();

router.post("/", createPatient);
router.get("/", getPatients);

module.exports = router;
