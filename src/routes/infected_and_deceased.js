const express = require('express')
const InfectedAndDeceased = require('../models/infected_and_deceased')
const router = new express.Router()

// post new data
router.post('/infected-and-deceased', async (req, res) => {
    const data = new InfectedAndDeceased(req.body)
    
    try {
        await data.save()
        res.status(201).send({ data })
    } catch (e) {
        res.status(400).send(e)
    }
})

// get all data
router.get('/infected-and-deceased', async (req, res) => {
    InfectedAndDeceased.find({}, (err, data)=>{
        if (err) {
            console.log(err);
          } else {
            res.json(data);
          }
    })
})

// get specific date
router.get('/infected-and-deceased/date/:date', async (req, res) => {
    const date = await InfectedAndDeceased.find({date: req.params.date })
    
    try{
        if(!date){
            res.status(400).send()
        }
        res.send(date)
    } catch (e) {
        res.status(404).send()
    }
})

// edit infected data
router.patch('/infected-and-deceased/edit', async (req, res) => {
    
    try {
        let data = await InfectedAndDeceased.findOne({
            date: req.body.date 
        })

        if(!data){
            return res.status(404).send()
        }

        data.newInfecteds = req.body.newInfecteds
        data.newInfectedsFromMidNight = req.body.newInfectedsFromMidNight
        data.totalInfecteds = req.body.totalInfecteds

        data.activePatients = req.body.activePatients
        data.activePatientsFromMidNight = req.body.activePatientsFromMidNight
        data.activePatientsAtHoma = req.body.activePatientsAtHoma
        data.activePatientsAtHotel = req.body.activePatientsAtHotel
        data.activePatientsAtHospital = req.body.activePatientsAtHospital

        data.seriouslyIll = req.body.seriouslyIll
        data.seriouslyIllFromMidNight = req.body.seriouslyIllFromMidNight
        data.criticalIll = req.body.criticalIll
        data.respiratoryPatients = req.body.respiratoryPatients

        data.deceased = req.body.deceased

        data.positiveLabTests = req.body.positiveLabTests
        data.totalLabTest = req.body.totalLabTest

        await data.save()

        res.send(data)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router