const dotenv = require('dotenv')
dotenv.config()
var path = require('path')
const express = require('express')
const app = express()
//const port = process.env.DEV_APP_PORT || 1515;
const port = 1515;
const cors = require('cors')
app.use(cors());
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static('dist'))
//app.use('/',express.static(path.join(__dirname, "dist")))
app.use(express.json())
console.log(__dirname)

app.listen(port, () => {
  console.log(`TRAVELLO app listening on port ${port}!`)
})

app.get('/', function (req, res){
     res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

const UserData = {
  UserGeo: process.env.API_GEO,
  UserWeather: process.env.API_WEATHER,
  UserPixa: process.env.API_PIXABAY
}
// send the 3 keys to the client side
app.get('/allkeys',function (req, res) {
    //res.send(UserGeo)
      res.json(UserData)
})

module.exports = app; //https://medium.com/@irfandyjip/for-anyone-who-found-typeerror-app-address-is-not-a-function-8928783defc4

//export default app;
