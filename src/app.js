const express = require('express') 
require('./db/mongoose')
const vaccineIndicesRouter = require('./routes/vaccine_indices')
const infectedAndDeceased = require('./routes/infected_and_deceased')
const trafficLightPlan = require('./routes/traffic_light_plan')
const hospitalStatus = require('./routes/hospital_status')
const vaccinePopulation = require('./routes/vaccine_all_population')
const path = require('path')
const hbs = require('hbs')
const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hendlebars engine and views location
app.set('view engine','hbs') // set up heandle bar on express 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index') //render heandle bar templates
})

app.get('/login',(req, res) => {
    res.render('login')
})

app.get('/admin-view',(req, res) => {
    res.render('admin-view')
})

app.use(express.json())
app.use(vaccineIndicesRouter)
app.use(infectedAndDeceased)
app.use(trafficLightPlan)
app.use(hospitalStatus)
app.use(vaccinePopulation)

module.exports = app
