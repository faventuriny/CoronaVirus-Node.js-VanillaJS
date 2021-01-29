const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vaccineIndicesSchema = new mongoose.Schema({
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


const vaccineIndices = mongoose.model('vaccineIndices', vaccineIndicesSchema)

module.exports = vaccineIndices