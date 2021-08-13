
const path = require('path')
const express = require('express')
const { isAbsolute } = require('path')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
//const viewPath = path.join(__dirname, '../views')

app.set('view engine', 'hbs')
app.set('views', viewPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=> {
    res.render('index', {
        title : 'Weather App',
        name : 'Ansh'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title : 'Weather App',
        name : 'Ansh'
    })
})


app.get('/help', (req, res)=> {
    res.render('help', {
        message : 'This is help page from hbs'
    })
})

// app.get('/about', (req, res)=> {
//     res.send(path.join(__dirname,'../public/index.html'))
// })

app.get('/weather', (req, res)=> {
    res.send({
        location : 'Tokyo',
        weather_description : 'overcast',
        temperature : 58,
        feelslike : 55
    })
})

app.listen(3000, ()=> {
    console.log('Server Running')
})
