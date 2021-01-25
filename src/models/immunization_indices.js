const mongoose = require('mongoose')
const Schema = mongoose.Schema

const immunizationIndicesSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    cityCode: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        required: true
    },
    firstDose: {
        type: Number,
        require: true
    },
    secoundDose: {
        type: Number,
        require: true
    }
}, {
    timestamps: true
})


const ImmunizationIndices = mongoose.model('ImmunizationIndices', immunizationIndicesSchema)

module.exports = ImmunizationIndices