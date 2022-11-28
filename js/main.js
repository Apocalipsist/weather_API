// import { weatherKey } from "./myApiKey.js";

{
    let form = document.getElementById('weatherForm');
    
    async function handleSubmit(e){
        e.preventDefault();
        let cityName = e.target.city.value;
        let localWeather = await getCityweather(cityName);
        WeatherCard(localWeather)
        e.target.city.value = '';
    }

    async function getCityweather(cityName){
        let r = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherKey}`)
        let data = await r.json()
        console.log(data)
        return data
    }

    function WeatherCard(weatherObj){

        let card = document.createElement('div');
        card.className = 'card';

        let icons = document.createElement('img');
        icons.className = 'card-img-top';
        icons.src = weatherObj.weather[0].icon;
        card.append(icons);
        
        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        
        let cityName = document.createElement('h4');
        cityName.className = 'card-title'
        cityName.innerHTML = weatherObj.name;
        
        let currentWeather = document.createElement('p');
        currentWeather.className = 'card-text'
        currentWeather.innerHTML = `The current Temp is ${weatherObj.main.temp}`;
        
        let feelsLike = document.createElement('p');
        feelsLike.className = 'card-text'
        feelsLike.innerHTML = `Feels like: ${weatherObj.main.feels_like}`;
        
        
        
        let cityLow = document.createElement('p');
        cityLow.className = 'card-text'
        cityLow.innerHTML = `Low Today: ${weatherObj.main.temp_min}`;
        
        let dailyHigh = document.createElement('p');
        dailyHigh.className = 'card-text'
        dailyHigh.innerHTML = `Today's high: ${weatherObj.main.temp_max}`;

        cardBody.append(icons);
        cardBody.append(cityName);
        cardBody.append(currentWeather)
        cardBody.append(dailyHigh);
        cardBody.append(cityLow);
        cardBody.append(feelsLike);

        card.append(cardBody);

        let col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-3 mt-3'

        col.append(card)

        let display = document.getElementById('cityGallery');
        display.append(col);
    }

    form.addEventListener('submit', handleSubmit);
}