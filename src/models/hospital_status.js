const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hospitalStatusSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true
    },
    occupancy: {
        type: Number,
        require: true
    },
    coronaOccupancy: {
        type: Number,
        required: true
    },
    staffInIsolation: {
        type: Number,
        require: true
    }
}, {
    timestamps: true
})


const hospitalStatus = mongoose.model('hospitalStatus', hospitalStatusSchema)

module.exports = hospitalStatus