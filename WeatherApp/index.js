const countrySearch = document.getElementById('countrySearch');
const amountDays = document.getElementById('amountDays');
const submitBtn = document.getElementById('submitBtn');

const getForecast = async (location, date1, date2) => {
    try {
        // date -> yyyy-MM-dd
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date1}/${date2}?key=V7B48VNZEDRLA5PQD9228JWUJ`);

        const responseJSON = await response.json();
        return responseJSON.days;
    } catch (error) {
        console.log(error);
    }
}

const parseDate = (date) => {
    const isoFormat = date.toISOString();
    return isoFormat.slice(0,10);
}

const getDateInterval = (days) => {
    const currentDateObj = new Date();
    const numberOfMlSeconds = currentDateObj.getTime();
    const newDateObj = new Date(numberOfMlSeconds + 
                                (days * 86400000));
    
    const date1 = parseDate(currentDateObj);
    const date2 = parseDate(newDateObj);

    return {date1, date2};
}

const getData = () => {
    const days = parseInt(amountDays.value);
    if (days < 0 || days > 5) {
        alert('El valor debe pertenecer a [0,4]')
        return {status: false, days, region: ''}
    }

    let region = countrySearch.value;
    if (region === '') {
        region = 'Argentina, Buenos Aires';
    }

    return {status: true ,days, region};
}

const clearInputs = () => {
    countrySearch.value = '';
    amountDays.value = 0;
}

const createElements = (lenElements, weatherArray) => {
    const weatherSection = document.getElementById('weather-section');

    for (let index = 0; index < lenElements; index++) {
        const element = weatherArray[index];
        const newElement = `<div class="weather-item">
                                <div class="data">
                                    <h3>${element.temp}</h3>
                                    <p>Máxima de ${element.tempmax} </p>
                                    <p>Mínima de ${element.tempmin} </p>
                                <div>
                                    <h5>${element.datetime}</h2>
                                    <p class="bold">${element.conditions } </p>
                                    <p>Sensación térmica: ${element.feelslike} </p>
                                </div>
                                </div>
                                    <p class="description">${element.description} </p>
                                <div class="comp-elements">
                                    <div>
                                        <p class="bold">Wind</p>
                                        <p>${element.windspeed } </p>
                                    </div>
                                    <div>
                                        <p class="bold">Humidity </p>
                                        <p>${element.humidity} </p>
                                    </div>
                                    <div>
                                        <p class="bold">Pressure</p>
                                        <p>${element.pressure} </p>
                                    </div>
                                </div>
                            </div>`
        weatherSection.innerHTML += newElement;    
    }
}

const clearPrevRequest = () => {
    const weatherSection = document.getElementById('weather-section');
    weatherSection.innerHTML = '';
}

submitBtn.addEventListener('click', () => {
    clearPrevRequest();
    const {status, days, region} = getData();
    console.log(status,region, days)
    if(!status) {
        clearInputs();
    }
    const {date1, date2} = getDateInterval(days);
    const result = getForecast(region, date1, date2);
    result.then((resp) => createElements(resp));
    clearInputs();
});