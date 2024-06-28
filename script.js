const apiKey = 'c5a38e7541msh68428aa2c406427p1fc11ajsn7d01a1fdfd38';
const apiHost = 'weatherapi-com.p.rapidapi.com';

const weatherImages = {
    'Sunny': 'https://res.cloudinary.com/dybktfmor/image/upload/v1719156369/sunny.svg',
    'Cloudy': 'https://res.cloudinary.com/dybktfmor/image/upload/v1719156366/mist.svg',
    'Rainy': 'https://res.cloudinary.com/dybktfmor/image/upload/v1719156367/heavy%20rain.svg',
    'Clear': 'https://res.cloudinary.com/dybktfmor/image/upload/v1719156366/cloudy.svg',
    'Partly Cloudy': 'https://res.cloudinary.com/dybktfmor/image/upload/v1719156366/partly%20cloud.svg'
};

function determineCondition(temp, cloud, precip) {
    if (temp > 30) {
        return 'Sunny';
    } else if (precip > 1) {
        return 'Rainy';
    } else if (cloud > 50) {
        return 'Cloudy';
    } else if (cloud > 20) {
        return 'Partly Cloudy';
    } else {
        return 'Clear';
    }
}

function formatTime(localTime) {
    const date = new Date(localTime);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return `${hours}:${minutes.substr(-2)}`;
}

async function getWeather(city) {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const current = result.current;
        const location = result.location;

        const conditionText = determineCondition(current.temp_c, current.cloud);

        document.getElementById('location').innerHTML = `${location.name}, ${location.region}, ${location.country}`;
        document.getElementById('temp').innerHTML = current.temp_c;
        document.getElementById('wind_speed').innerHTML = current.wind_kph;
        document.getElementById('humidity').innerHTML = current.humidity;
        document.getElementById('cloud_pct').innerHTML = current.cloud;
        document.getElementById('feels_like').innerHTML = current.feelslike_c;
        document.getElementById('condition').innerHTML = conditionText;

        const weatherImage = weatherImages[conditionText] || 'path/to/default_image.jpg';
        document.getElementById('weather_image').src = weatherImage;

        console.log(result);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

document.getElementById('find').addEventListener('click', () => {
    const city = document.getElementById('city_input').value;
    getWeather(city);
});

getWeather('Bhubaneswar');