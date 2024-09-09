const apiKey = "4931adcac229815b1907f0c3700bbeb9";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;

// Function to find the user's location
async function findUserLocation() {
    fadeOutWeatherData(); // Trigger fade-out before loading new data
    const userLocation = document.getElementById('userLocation').value;
    
    if (!userLocation) {
        alert('Please enter a location.');
        return;
    }

    const response = await fetch(`${apiUrl}${userLocation}&appid=${apiKey}&units=metric`);

    if (response.status === 404) {
        document.querySelector(".error").classList.add("show");
        return;
    }
    
    const data = await response.json();
    
    // Save weather data to localStorage
    localStorage.setItem('weatherData', JSON.stringify(data));

    setTimeout(() => {
        updateWeatherData(data); // Update weather data after fade-out completes
    }, 500); // Delay the update until after the fade-out
}

// Function to fade out existing weather data
function fadeOutWeatherData() {
    const weatherContainer = document.querySelector(".weather");
    const highlightContainer = document.querySelector(".heighlight");
    
    weatherContainer.style.animation = "fadeOut 0.5s forwards";
    highlightContainer.style.animation = "fadeOut 0.5s forwards";

    setTimeout(() => {
        weatherContainer.style.display = "none";
        highlightContainer.style.opacity = "0";
    }, 500); // Hide the weather container after fade-out
}

// Function to update weather data
function updateWeatherData(data) {
    const weatherContainer = document.querySelector(".weather");
    const highlightContainer = document.querySelector(".heighlight");
    
    weatherContainer.style.display = "block";
    weatherContainer.style.animation = "fadeIn 1s forwards";
    highlightContainer.style.opacity = "1";
    highlightContainer.style.animation = "fadeIn 1.5s forwards";

    document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}`;
    document.querySelector(".weather-icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="Weather Icon">`;
    document.querySelector(".temperature").innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".feelslike").innerHTML = `Feels Like: ${Math.round(data.main.feels_like)}°C`;
    document.querySelector(".description").innerHTML = `<i class="fa-brands fa-cloudversify"></i> ${data.weather[0].description}`;
    document.querySelector(".date").innerHTML = `Date: ${new Date(data.dt * 1000).toLocaleDateString()}`;
    document.getElementById("HValue").innerHTML = `${data.main.humidity}%`;
    document.getElementById("WValue").innerHTML = `${Math.round(data.wind.speed)} m/s`;
    document.getElementById("WDValue").innerHTML = `${data.wind.deg}°`;
    document.getElementById("CValue").innerHTML = `${data.clouds.all}%`;
    document.getElementById("PValue").innerHTML = `${data.main.pressure} hPa`;
    document.getElementById("SRValue").innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById("SSValue").innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}



// const apiKey = "4931adcac229815b1907f0c3700bbeb9";
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;

// // Function to find the user's location and fetch weather data
// async function findUserLocation() {
//     fadeOutWeatherData(); // Trigger fade out before loading new data
//     const userLocation = document.getElementById('userLocation').value;
//     const response = await fetch(`${apiUrl}${userLocation}&appid=${apiKey}&units=metric`);

//     if (response.status === 404) {
//         document.querySelector(".error").classList.add("show");
//         return;
//     }

//     const data = await response.json();
//     setTimeout(() => {
//         updateWeatherData(data); // Update weather data after fade-out completes
//         getForecast(data.coord.lat, data.coord.lon); // Pass correct latitude and longitude
//     }, 500); // Delay the update until after the fade out
// }

// // Function to fade out existing weather data
// function fadeOutWeatherData() {
//     const weatherContainer = document.querySelector(".weather");
//     const highlightContainer = document.querySelector(".heighlight");
//     const forecastContainer = document.querySelector(".forecast");

//     weatherContainer.style.animation = "fadeOut 0.5s forwards";
//     highlightContainer.style.animation = "fadeOut 0.5s forwards";
//     forecastContainer.style.animation = "fadeOut 0.5s forwards";

//     setTimeout(() => {
//         weatherContainer.style.display = "none";
//         highlightContainer.style.opacity = "0";
//         forecastContainer.style.opacity = "0";
//     }, 500); // Hide the weather container after fade out
// }

// // Function to fetch the forecast data using latitude and longitude
// async function getForecast(lat, lon) {
//     const forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;
    
//     try {
//         const response = await fetch(forecastApiUrl);
//         if (!response.ok) {
//             throw new Error(`Failed to fetch forecast data: ${response.status}`);
//         }

//         const data = await response.json();
//         updateForecast(data.daily); 
//         renderTemperatureChart(data.daily); // Render the chart after fetching forecast

//     } catch (error) {
//         console.error("Error fetching forecast data:", error);
//     }
// }

// // Function to update weather data on the UI
// function updateWeatherData(data) {
//     const weatherContainer = document.querySelector(".weather");
//     const highlightContainer = document.querySelector(".heighlight");
//     const forecastContainer = document.querySelector(".forecast");

//     weatherContainer.style.display = "block";
//     weatherContainer.style.animation = "fadeIn 1s forwards";
//     highlightContainer.style.opacity = "1";
//     highlightContainer.style.animation = "fadeIn 1.5s forwards";
//     forecastContainer.style.opacity = "1";
//     forecastContainer.style.animation = "fadeIn 1.5s forwards";

//     document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}`;
//     document.querySelector(".weather-icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="Weather Icon">`;
//     document.querySelector(".temperature").innerHTML = `${Math.round(data.main.temp)}°C`;
//     document.querySelector(".feelslike").innerHTML = `Feels Like: ${Math.round(data.main.feels_like)}°C`;
//     document.querySelector(".description").innerHTML = `<i class="fa-brands fa-cloudversify"></i> ${data.weather[0].description}`;
//     document.querySelector(".date").innerHTML = `Date: ${new Date(data.dt * 1000).toLocaleDateString()}`;
//     document.getElementById("HValue").innerHTML = `${data.main.humidity}%`;
//     document.getElementById("WValue").innerHTML = `${Math.round(data.wind.speed)} m/s`;
//     document.getElementById("WDValue").innerHTML = `${data.wind.deg}°`;
//     document.getElementById("CValue").innerHTML = `${data.clouds.all}%`;
//     document.getElementById("PValue").innerHTML = `${data.main.pressure} hPa`;
//     document.getElementById("SRValue").innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     document.getElementById("SSValue").innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// }

// // Function to update the forecast data on the UI
// function updateForecast(dailyForecast) {
//     const forecastContainer = document.querySelector(".forecast");
//     forecastContainer.innerHTML = ""; // Clear the existing forecast data

//     dailyForecast.forEach(day => {
//         const date = new Date(day.dt * 1000).toLocaleDateString();
//         const icon = day.weather[0].icon;
//         const temp = `${Math.round(day.temp.day)}°C`;

//         const forecastItem = `
//             <div class="forecast-item">
//                 <div class="forecast-date">${date}</div>
//                 <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Forecast Icon">
//                 <div class="forecast-temp">${temp}</div>
//             </div>
//         `;
//         forecastContainer.innerHTML += forecastItem;
//     });
// }

// // Function to render the temperature chart
// function renderTemperatureChart(dailyForecast) {
//     // Your chart rendering logic with Chart.js goes here
// }



const sky = document.getElementById('sky');
let timeOfDay = 0; // 0: night, 1: day

const skyColors = [
    'linear-gradient(to bottom, #001F3F, #0A6E9E)',  // Night

];

function updateSky() {
    sky.style.background = skyColors[timeOfDay];

    // Clear existing stars
    document.querySelectorAll('.star').forEach(star => star.remove());

    // Add stars at night
    if (timeOfDay === 0) {
        for (let i = 0; i < 100; i++) {
            createStar();
        }
    }

    timeOfDay = (timeOfDay + 1) % 2; // Toggle between night (0) and day (1)
}

function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.width = Math.random() * 2 + 1 + 'px'; // Random size for star
    star.style.height = star.style.width; // Ensure star is circular
    star.style.top = Math.random() * 100 + '%'; // Random position
    star.style.left = Math.random() * 100 + '%'; // Random position
    sky.appendChild(star); // Append star to sky
}

// Initial setup
updateSky();
setInterval(updateSky, 30000); // Change between day and night every 30 seconds
