const express = require('express')
const VaccinationByCity = require('../models/vaccinated_by_city')
const router = new express.Router()

// post new data
router.post('/vaccination-by-city', async (req, res) => {
    const data = new VaccinationByCity(req.body)
    
    try {
        await data.save()
        res.status(201).send({ data })
    } catch (e) {
        res.status(400).send(e)
    }
})

// get all data
router.get('/vaccination-by-city', async (req, res) => {
    VaccinationByCity.find({}, (err, data)=>{
        if (err) {
            console.log(err);
          } else {
            res.json(data);
          }
    })
})

// get a specific city and date
router.get('/vaccination-by-city/search/:city', async (req, res) => {
    let city = req.params.city

    let data = await VaccinationByCity.find({city: city})
    
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
router.patch('/vaccination-by-city/edit', async (req, res) => {
    
    try {
        let data = await VaccinationByCity.findOne({
            city: req.body.city 
        })

        if(!data){
            return res.status(404).send()
        }

        data.firstDose = req.body.firstDose
        data.secoundDose = req.body.secoundDose
        data.activePatients = req.body.activePatients
        data.activePatientsFor10K = req.body.activePatientsFor10K
        data.CalDailyScore = req.body.CalDailyScore

        await data.save()

        res.send(data)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router