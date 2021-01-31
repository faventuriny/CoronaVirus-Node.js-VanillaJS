const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trafficLightPlanSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        require: true
    },
    newInfectedsFor10KPeople: {
        type: Number,
        required: true
    },
    positiveTestPercentage: {
        type: Number,
        require: true
    },
    verifiedChangeRate: {
        type: Number,
        require: true
    },
    activePatients: {
        type: Number,
        require: true
    }
}, {
    timestamps: true
})


const trafficLightPlan = mongoose.model('trafficLightPlan', trafficLightPlanSchema)

module.exports = trafficLightPlan