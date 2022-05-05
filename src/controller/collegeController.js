const { cookie } = require('express/lib/response')
const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

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


            ///***********************************************logo link validation**************** */
            if (!(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(logoLink))) {
                res.status(400).send({ status: false, message: `logoLink is not a valid URL` })
                return
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
module.exports.createCollege = createCollege



const getIntern = async function (req, res) {

    try {

        let body = req.query
        if (!validator.isValidRequestBody(body)) {
            return res.status(400).send({ status: false, msg: "pls provide valid query to fetch details" })

        }

        else {
            let collegeName = req.query.collegeName
            if (!validator.isValid(collegeName)) {
                return res.status(400).send({ status: false, msg: "pls provide the college name" })
            }



            let college = await collegeModel.findOne({ name: collegeName, isDeletd: false })
            console.log(college)
            if (!college) {
                return res.status(400).send({ status: false, msg: `${collegeName} is not a valid name . pleaase provide a valid college name` })
            }

            else {
                let checkId = college._id
                let name = college.name
                let fullName = college.fullName
                let logoLink = college.logoLink


                let interns = await internModel.find({ collegeId: checkId, isDeletd: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })

                if (!interns.length > 0) {



                    let data = {
                        name: name,
                        fullName: fullName,
                        logoLink: logoLink,
                        interests: `No interns applied for ${fullName}`

                    }
                    return res.status(200).send({ status: true, data: data })
                }
                else {
                    let data = {
                        name: name,
                        fullName: fullName,
                        logoLink: logoLink,
                        interests: interns,
                    }
                    res.status(200).send({
                        status: true, message: "Succesfully fetched all interns details of ${fullName}", data: data
                    })
                }
            }

        }

        }
    catch (error) {
            console.log(error)
            res.status(400).send({ status: false, msg: error.message })
        }
    }



module.exports.getIntern = getIntern