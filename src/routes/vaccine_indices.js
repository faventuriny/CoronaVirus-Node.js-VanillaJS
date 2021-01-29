const express = require('express')
const VaccineIndices = require('../models/vaccine_indices')
const router = new express.Router()

// post new data
router.post('/vaccine-indices', async (req, res) => {
    const data = new VaccineIndices(req.body)
    
    try {
        await data.save()
        res.status(201).send({ vaccineIndices: data })
    } catch (e) {
        res.status(400).send(e)
    }
})

// get all data
router.get('/vaccine-indices', async (req, res) => {
    VaccineIndices.find({}, (err, data)=>{
        if (err) {
            console.log(err);
          } else {
            res.json(data);
          }
    })
})

// get all data on specific city
router.get('/vaccine-indices/city/:cityCode', async (req, res) => {
    const city = await VaccineIndices.find({cityCode: req.params.cityCode })
    
    try{
        if(!city){
            res.status(400).send()
        }
        res.send(city)
    } catch (e) {
        res.status(404).send()
    }
})

// get all data on specific date
router.get('/vaccine-indices/date/:date', async (req, res) => {
    const date = await VaccineIndices.find({date: req.params.date })
    
    try{
        if(!date){
            res.status(400).send()
        }
        res.send(date)
    } catch (e) {
        res.status(404).send()
    }
})

// get a specific city and date
router.get('/vaccine-indices/search/:city/:date', async (req, res) => {
    let city = req.params.city
    let date = req.params.date


    let data = await VaccineIndices.find({
        city: city,
        date: date 
    })
    
    try{
        if(!data){
            res.status(400).send()
        }
        res.send(data)
    } catch (e) {
        res.status(404).send()
    }
})
// edit 
router.patch('/vaccine-indices/edit', async (req, res) => {
    
    // const updates = Object.keys(req.body)

    try {
        let data = await VaccineIndices.findOne({
            city: req.body.city,
            date: req.body.date 
        })

        if(!data){
            return res.status(404).send()
        }

        data.city = req.body.city
        data.cityCode = req.body.cityCode
        data.date = req.body.date
        data.firstDose = req.body.firstDose
        data.secoundDose = req.body.secoundDose

        await data.save()

        res.send(data)
    } catch (e) {
        res.status(400).send(e)
    }
})
  

// router.delete('/books/:id', async (req, res) => {
//     try {
//         const book = await Book.findOneAndDelete({_id: req.params.id})

//         if (!book) {
//             res.status(404).send()
//         }

//         res.send(book)
//     } catch (e) {
//         res.status(500).send()
//     }
// })



module.exports = router