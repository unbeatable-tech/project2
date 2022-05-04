const collegeModel = require('../models/collegeModel')

const validator = require('../validators/validator')

//  ist api -- POST /functionup/colleges


const createCollege = async function (req, res) {

    try {

        let data = req.body
        if (!validator.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, msg: "No college details given" })
        }
        else {
            // Using object destruction method here

            const { name, fullName, logoLink } = data

            if (!validator.isValid(name)) {
                return res.status(400).send({ status: false, msg: "please enter a  name" })
            }



            if (!validator.isValid(fullName)) {
                return res.status(400).send({ status: false, msg: "please enter a  fullname" })
            }

            if (!validator.isValid(logoLink)) {
                return res.status(400).send({ status: false, msg: "logo link is not found. please provide the logo link" })
            }
            const isNameAlready = await collegeModel.findOne({ name, isDeletd: false })
            if (isNameAlready) {
                return res.status(400).send({ status: false, msg: `${name} is already used` })
            }

            let saveData = await collegeModel.create(data)
            return res.status(200).send({ status: false, msg: "Data created sucessfully", data: saveData })
        }

    }
    catch (error) {
        console.log("this is the error", error)
        res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports.createCollege=createCollege