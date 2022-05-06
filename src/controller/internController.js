


const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const validator = require('../validators/validator')
const { default: mongoose } = require("mongoose");


const createIntern = async function (req, res) {
    try {
        let data = req.body
        if (!validator.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, msg: "pls provide an intern's details" })
        }
        else {

            const { name, email, collegeName, mobile } = data

            if (!validator.isValid(name)) {
                return res.status(400).send({ status: false, msg: "name is missing" })
            }
            if (!validator.isValid(collegeName)) {
                return res.status(400).send({ status: false, msg: "college name is missing" })
            }
            if (!validator.isValid(email)) {
                return res.status(400).send({ status: false, msg: "email is missing" })

            }
            if (!validator.isValid(mobile)) {
                return res.status(400).send({ status: false, msg: "mobile number is missing" })
            }


            //eamil validations using REGEX

            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                return res.status(400).send({
                    status: false,
                    message: `${email} is not a valid email. Please provide a valid Email address to continue.`,
                });
            }

            //MOBILE NUMBER VALIDATION
            if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)) {
                return res.status(400).send({
                    status: false,
                    message: `${mobile} is not a valid mobile number, Please provide a valid mobile number to continue`,
                });
            }

            //checking email and mobile number is already exists

            const isEmailUsed = await internModel.findOne({ email, isDeleted: false })
            if (isEmailUsed) {
                return res.status(400).send({ status: false, msg: "Email is already used" })
            }
            const isNumebrUsed = await internModel.findOne({ mobile, isDeleted: false })
            if (isNumebrUsed) {
                return res.status(400).send({ status: false, msg: "MOBile number is already used" })
            }
            let internCollege = await collegeModel.findOne({ name: collegeName })
            if (!internCollege) {
                return res.status(400).send({ status: false, msg: `${collegeName}  is not exist` })
            }

            //save data in database

            let collegeId = internCollege._id
            data["collegeId"] = collegeId

            let saveData = await internModel.create(data)
            let find=await internModel.findOne({name:saveData.name,email:saveData.email}).select({name:1, email:1,mobile:1,collegeId:1,isDeleted:1,_id:0})
            
            res.status(201).send({ status: true,  data: find })
        }


    }
    catch (error) {
        console.log(error)
        res.status(400).send({ status: false, msg: error.message })
    }
}
module.exports.createIntern = createIntern