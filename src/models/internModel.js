const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({



    name: { type: String, required: "name is required" },
    email: {
        type: String,
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
            message: "please Add valid email id ",
            required: "pls add email id ",
            unique: true,
            isAsync: false
        }
    },
    mobile: {
        type: Number,
        validate: {
            validator: function (mobile) {
                return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)
            },
            message: "pls add valid mobile number",
            required: "pls add number",
            unique: true,
            isAsync: false
        },
    },
    collegeId: {
        type: ObjectId,
        ref: "College",
    },
    isDeleted: { type: Boolean, default: false }








}, { timestamps: true });


module.exports=mongoose.model("Intern",internSchema)