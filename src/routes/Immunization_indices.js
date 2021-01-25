const express = require('express')
const ImmunizationIndices = require('../models/immunization_indices')
const router = new express.Router()

router.post('/immunization-indices', async (req, res) => {
    const immunizationIndices = new ImmunizationIndices(req.body)
    
    try {
        await immunizationIndices.save()
        res.status(201).send({ immunizationIndices })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/immunization-indices', async (req, res) => {
    ImmunizationIndices.find({}, (err, immunizationIndices)=>{
        if (err) {
            console.log(err);
          } else {
            res.json(immunizationIndices);
          }
    })
})

router.get('/immunization-indices/city/:cityCode', async (req, res) => {
    const immunizationIndicesPerCity = await ImmunizationIndices.find({cityCode: req.params.cityCode })
    
    try{
        if(!immunizationIndicesPerCity){
            res.status(400).send()
        }
        res.send(immunizationIndicesPerCity)
    } catch (e) {
        res.status(404).send()
    }
})

router.get('/immunization-indices/date/:date', async (req, res) => {
    const immunizationIndicesPerDate = await ImmunizationIndices.find({date: req.params.date })
    
    try{
        if(!immunizationIndicesPerDate){
            res.status(400).send()
        }
        res.send(immunizationIndicesPerDate)
    } catch (e) {
        res.status(404).send()
    }
})

// edit 
// router.patch('/immunization-indices/?city=city&date=date', async (req, res) => {
    
//     const updates = Object.keys(req.body)

//     try {
//         const book = await Book.findOne({_id: req.params.id})
//         if(!book){
//             return res.status(404).send()
//         }

//         updates.forEach((update)=> book[update] = req.body[update])
//         await book.save()

//         res.send(book)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })
  

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