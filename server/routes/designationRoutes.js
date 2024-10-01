const express = require("express");
const {
  getDesignations,
  getSkills,
} = require("../controllers/designationController");

const router = express.Router();

router.get("/", getDesignations);
router.get("/skills", getSkills);
module.exports = router;
