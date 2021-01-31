const express = require('express')
const TrafficLightPlan = require('../models/traffic_light_plan')
const router = new express.Router()

// post new data
router.post('/traffic-light-plan', async (req, res) => {
    const data = new TrafficLightPlan(req.body)
    
    try {
        await data.save()
        res.status(201).send({ data })
    } catch (e) {
        res.status(400).send(e)
    }
})

// get all data
router.get('/traffic-light-plan', async (req, res) => {
    TrafficLightPlan.find({}, (err, data)=>{
        if (err) {
            console.log(err);
          } else {
            res.json(data);
          }
    })
})

// get a specific city and date
router.get('/traffic-light-plan/search/:city', async (req, res) => {
    let city = req.params.city

    let data = await TrafficLightPlan.find({city: city})
    
    try{
        if(!data){
            res.status(400).send()
        }
        res.send(data)
    } catch (e) {
        res.status(404).send()
    }
})

// edit city
router.patch('/traffic-light-plan/edit', async (req, res) => {
    
    try {
        let data = await TrafficLightPlan.findOne({
            city: req.body.city 
        })

        if(!data){
            return res.status(404).send()
        }

        data.score = req.body.score
        data.newInfectedsFor10KPeople = req.body.newInfectedsFor10KPeople
        data.positiveTestPercentage = req.body.positiveTestPercentage
        data.verifiedChangeRate = req.body.verifiedChangeRate
        data.activePatients = req.body.activePatients

        await data.save()

        res.send(data)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router