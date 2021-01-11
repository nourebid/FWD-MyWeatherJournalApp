// Setup empty JS object to act as endpoint for all routes
let appData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
// Callback to debug 
app.listen(8000, ()=> {console.log('App is running') });
// Initialize all route with a callback function
app.get('/all', (req, res) =>  sendData(req, res));
// Callback function to complete GET '/all'
const sendData = (req, res) => {
    res.send(appData).status(200);
    appData = {};
}
// Post Route
app.post('/add', (req, res) => addData(req, res));

//AddData Callback function

const addData = (req, res) => {
    appData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }
    res.send(appData).status(200);
    console.log(appData);
};
