// Personal API Key for OpenWeatherMap API
let apiUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=93688eacaf8ee658ccc1fb892577dc7a&units=metric';
// Global Variables
const zipCodeEntry = document.getElementById('zipCode');
const userInput = document.getElementById('feeling');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const button = document.getElementById('submit');
const d = new Date();
// Event listener to add function to existing HTML DOM element
button.addEventListener('click', generateData);
/* Function called by event listener */
function generateData() {
    let initialData = {
        zipCode: zipCodeEntry.value,
        content: userInput.value,
        date: d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear()
    };
    //call the function to get the API Data using api url + api Key+ zipcode
    getWeaterData (apiUrl, initialData.zipCode, apiKey)
    .then((result) => {
        console.log(result);
        //post the coming data to the local server endpoint
        postData('/add', {date:initialData.date, temp:result.main.temp, content: initialData.content});
        //updating the frontEnd with the new data
        showWeatherResults();
    }).catch((err) => {
        console.error(err);
    });
};
/* Function to GET Web API Data*/
const getWeaterData = async (apiUrl, zip, apiKey) => {
    const response = await fetch(apiUrl+zip+apiKey)
    try {
        const responseData = await response.json();
        return responseData;
    } catch (err){
        console.log(err);
    }
}
/* Function to POST data */
const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (err) {
        console.log(err);
        }
}

/* Function to GET Project Data */
const showWeatherResults = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        date.innerHTML = `Date: ${allData.date}`;
        temp.innerHTML = `Temp: ${allData.temp}`;
        content.innerHTML = `I feel: ${allData.content}`;
    } catch (err) {
        console.log(err);
    }
}