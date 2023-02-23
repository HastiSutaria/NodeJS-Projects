
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')


app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialspath)


app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hasti Sutaria'
    }) 
})


app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Hasti Sutaria'
    }) 
})


app.get('/help', (req,res) => {
    res.render('help', {
        helptext: 'This is some helpful text',
        title: 'Help',
        name: 'Hasti Sutaria'
    }) 
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide valid address'
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.status(404).send({error})
        }
        forecast(latitude,longitude, (error,forecastData) => {
            if(error){
                return res.status(404).send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide search term'
        })
    }
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Hasti Sutaria',
        errorMessage: 'Help Not Found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Hasti Sutaria',
        errorMessage: 'Page Not Found'
    })
})

app.listen(8000, () => {
    console.log('server is running on port 3000')
})