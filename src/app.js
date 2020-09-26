const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./api/geocode')
const forecast = require('./api/forecast')

const app = express()
const port = process.env.PORT || 3000

const staticPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

app.use(express.static(staticPath));

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)


app.get('' , (req,res) => {
    res.render('index' , {
        title : 'weather',
        name : 'jasmine'
    });
})

app.get('/about' , (req,res) => {
    res.render('about' , {
        title : 'About me',
        name : 'jasmine'
    });
})

app.get('/help' , (req,res) => {
    res.render('help' , {
        title : 'help',
        name : 'jasmine'
    });
})

//get weather API
app.get('/weather' , (req,res) => {
    if(!req.query.address) {
         return res.json({
             error : 'you must provide address'
         });
    }

    geocode(req.query.address , (error , geoData) => {
        if(error) {
            return  res.json({error : error});
        }
        
        forecast(geoData.longitude , geoData.latitude , (error , forecastData) => {
            if(error) {
                return  res.json({error : error});
            }
            res.json({
                location : geoData.place_name,
                weather : forecastData
            })
        })
    })

})

app.get('/help/*' , (req,res) => {
    res.render('404' , {
        errorMessage : 'help article not found!',
        title : 404
    })
})

app.get('*' , (req,res) => {
    res.render('404' , {
        errorMessage : 'this page not found!',
        title : 404
    })
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});