const mongoose = require('mongoose')
const Schema = mongoose.Schema

const infectedAndDeceasedSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    newInfecteds: {
        type: Number,
        required: true
    }, 
    newInfectedsFromMidNight: {
        type: Number,
        required: true
    },
    totalInfecteds: {
        type: Number,
        required: true
    },
    activePatients: {
        type: Number,
        required: true
    }, 
    activePatientsFromMidNight: {
        type: Number,
        required: true
    },
    activePatientsAtHoma: {
        type: Number,
        required: true
    },
    activePatientsAtHotel: {
        type: Number,
        required: true
    },
    activePatientsAtHospital: {
        type: Number,
        required: true
    },
    seriouslyIll: {
        type: Number,
        required: true
    },
    seriouslyIllFromMidNight: {
        type: Number,
        required: true
    },
    criticalIll: {
        type: Number,
        required: true
    },
    respiratoryPatients: {
        type: Number,
        required: true
    },
    deceased: {
        type: Number,
        required: true
    }, 
    positiveLabTests: {
        type: Number,
        required: true
    },  
    totalLabTest: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
})


const infectedAndDeceased = mongoose.model('infectedAndDeceased', infectedAndDeceasedSchema)

module.exports = infectedAndDeceased