const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vaccinePopulationSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    dailyFirstDose: {
        type: Number,
        required: true
    },
    dailySecDose: {
        type: Number,
        require: true
    },
    totalFirstDose: {
        type: Number,
        required: true
    },
    totalSecDose: {
        type: Number,
        require: true
    },
    percentFirstDose: {
        type: Number,
        required: true
    },
    percentSecDose: {
        type: Number,
        require: true
    }
}, {
    timestamps: true
})


const vaccinePopulation = mongoose.model('vaccinePopulation', vaccinePopulationSchema)

module.exports = vaccinePopulation