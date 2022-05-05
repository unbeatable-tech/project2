const express = require('express');
const router = express.Router();

const intern = require("../controller/internController")
const college = require("../controller/collegeController")
router.post("/functionup/colleges", college.createCollege)
router.post("/functionup/interns", intern.createIntern)
router.get("/functionup/collegeDetails", college.getIntern)


module.exports = router;