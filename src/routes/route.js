const express = require('express');
const router = express.Router();


const college=require("../controller/collegeController")
router.post("/functionup/colleges",college.createCollege)


module.exports = router;