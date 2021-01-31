const express = require('express')
const HospitalStatus = require('../models/hospital_status')
const router = new express.Router()

// post new data
router.post('/hospital-status', async (req, res) => {
    const data = new HospitalStatus(req.body)
    
    try {
        await data.save()
        res.status(201).send({ data })
    } catch (e) {
        res.status(400).send(e)
    }
})

// get all data
router.get('/hospital-status', async (req, res) => {
    HospitalStatus.find({}, (err, data)=>{
        if (err) {
            console.log(err);
          } else {
            res.json(data);
          }
    })
})

// get a specific hospital
router.get('/hospital-status/search/:hospital', async (req, res) => {
    let hospital = req.params.hospital

    let data = await HospitalStatus.find({hospitalName: hospital})
    
    try{
        if(!data){
            res.status(400).send()
        }
        res.send(data)
    } catch (e) {
        res.status(404).send()
    }
})

// edit hospital
router.patch('/hospital-status/edit', async (req, res) => {
    
    try {
        let data = await HospitalStatus.findOne({
            hospital: req.body.hospital 
        })

        if(!data){
            return res.status(404).send()
        }

        data.hospitalName = req.body.hospitalName
        data.occupancy = req.body.occupancy
        data.coronaOccupancy = req.body.coronaOccupancy
        data.staffInIsolation = req.body.staffInIsolation

        await data.save()

        res.send(data)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router