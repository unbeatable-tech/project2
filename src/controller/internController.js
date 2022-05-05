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

const{name,email,collegeName,collegeId,mobile}=data

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
            if (!validator.isValid(collegeId)) {
                return res.status(400).send({ status: false, msg: "college Id is missing" })
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

            // for college id validation
            if (!validator.isValidObjectId(collegeId)) {
                return res.status(400).send({ status: false, message: "pls enter a valid college Id" })
            }


            let intern = await internModel.findOne({ name: name, email: email, mobile: mobile })
            

            let college = await collegeModel.findById({ _id: collegeId })
            if (!college) {
                return res.status(400).send({ status: false, msg: "No such college exist" })
            }
            let internCollege=await collegeModel.findOne({name:collegeName})
            if(!internCollege){
                return res.status(400).send({status:false,msg:`${collegeName} is not exist`})
            }

            //save data in database

            let saveData = await internModel.create(data)
            console.log(saveData)
            res.status(200).send({ status: true, msg: ` internship applied suceesfully at ${collegeName}`, data: saveData })
        }


    }
    catch (error) {
        console.log(error)
        res.status(400).send({ status: false, msg: error.message })
    }
}
module.exports.createIntern = createIntern