const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Defining paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Set up for handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Set up static directory for serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=> {
    res.render('index', {
        title : 'Weather App',
        name : 'Ansh'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title : 'About Me',
        name : 'Ansh'
    })
})


app.get('/help', (req, res)=> {
    res.render('help', {
        message : 'This is help page from hbs',
        title : 'Help',
        name : 'Ansh'
    })
})

// app.get('/about', (req, res)=> {
//     res.send(path.join(__dirname,'../public/index.html'))
// })

app.get('/weather', (req, res)=> {
    if(!req.query.address) {
       return res.send({
            error : 'Enter address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=> {
        if(error){
            return res.send({error})
        }
    
        forecast(latitude,longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({ 
                forecast: forecastData,
                location,
                address: req.query.address
            })
          })
    })
    // res.send({
    //     location : 'Tokyo',
    //     weather_description : 'overcast',
    //     temperature : 58,
    //     feelslike : 55,
    //     address : req.query.address
    // })
})

// app.get('/products', (req, res)=> {
//     if(!req.query.search) {
//         return res.send({
//             error : 'You must provide a search term'
//         })

//     }
//     // console.log(req.query.search)
//     res.send({
//         products : []
//     })
// })

app.get('/help/*', (req, res)=> {
    res.render('404', {
        title : '404',
        name : 'Ansh',
        errorMessage : 'Help article not found'
    })
})


app.get('*', (req, res)=> {
    res.render('404', {
        title : '404',
        name : 'Ansh',
        errorMessage : 'Page not found'
    })
})


app.listen(port, ()=> {
    console.log('Server Running')
})
