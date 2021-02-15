const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vaccinationByCitySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    firstDose: {
        type: Number,
        require: true
    },
    secoundDose: {
        type: Number,
        require: true
    },
    activePatients: {
        type: Number,
        require: true
    },
    activePatientsFor10K: {
        type: Number,
        require: true
    },
    CalDailyScore: {
        type: Number,
        require: true
    }
}, {
    timestamps: true
})


const vaccinationByCity = mongoose.model('vaccinationByCity', vaccinationByCitySchema)

module.exports = vaccinationByCity