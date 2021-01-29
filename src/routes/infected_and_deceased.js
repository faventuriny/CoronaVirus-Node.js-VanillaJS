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

module.exports = router