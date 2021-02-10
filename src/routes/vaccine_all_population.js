const express = require('express')
const VaccinePopulation = require('../models/vaccine_all_population')
const router = new express.Router()

// post new data
router.post('/vaccine-population', async (req, res) => {
    const data = new VaccinePopulation(req.body)
    
    try {
        await data.save()
        res.status(201).send({ vaccinePopulation: data })
    } catch (e) {
        res.status(400).send(e)
    }
})

// get all data
router.get('/vaccine-population', async (req, res) => {
    VaccinePopulation.find({}, (err, data)=>{
        if (err) {
            console.log(err);
          } else {
            res.json(data);
          }
    })
})

// get all data on specific date
router.get('/vaccine-population/date/:date', async (req, res) => {
    const date = await VaccinePopulation.find({date: req.params.date })
    
    try{
        if(!date){
            res.status(400).send()
        }
        res.send(date)
    } catch (e) {
        res.status(404).send()
    }
})

// edit 
router.patch('/vaccine-population/edit', async (req, res) => {
    
    // const updates = Object.keys(req.body)

    try {
        let data = await VaccinePopulation.findOne({
            date: req.body.date 
        })

        if(!data){
            return res.status(404).send()
        }

        data.dailyFirstDose = req.body.dailyFirstDose
        data.dailySecDose = req.body.dailySecDose
        data.totalFirstDose = req.body.totalFirstDose
        data.totalSecDose = req.body.totalSecDose
        data.percentFirstDose = req.body.percentFirstDose
        data.percentSecDose = req.body.percentSecDose

        await data.save()

        res.send(data)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router