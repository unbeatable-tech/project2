const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name: { type: String, required: "name is required" },
    email: {
        type: String, unique: true, trim: true, required: true
    },
    mobile: {
        type: String, unique: true, trim: true, required: true
    },
    collegeId: {
        type: ObjectId,
        ref: "College",
    },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });


module.exports = mongoose.model("Intern", internSchema)