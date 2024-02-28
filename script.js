//DOM get element from HTML
const temSunTime = document.getElementById('temperature-sun-time')
// const temperature = document.getElementById('temperature')
// const sunrise = document.getElementById('sunrise-time')
// const sunset = document.getElementById('sunset-time')
const remindImgText = document.getElementById('remind-img-text')
const sevenDaysTemperature = document.getElementById('even-days-temperature')

//DOM create in JS
// 1- left corner 





//fetch API, weather in Helsinki
const weatherInfo = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Helsinki,Finland&units=metric&appid=0a3f5beba05e6db2d5da18ddf3283c92')
    .then(response => response.json())
    .then(data => {
        remindTestCityName(data)
        console.log (data.sys)
        console.log(data.sys.sunrise * 1000)
    })
}
weatherInfo()



const remindTestCityName = (param) => {
    let dayWeather = param.weather[0].main
    let description = param.weather[0].description
    let temperature = Math.round(param.main.temp)
    let cityName = param.name

    const sunriseTime = param.sys.sunrise * 1000
    const sunsetTime = param.sys.sunset * 1000
    const finlandUct = 2 * 60 * 60 * 1000 //EET = UCT + 2h
    const finlandSunriseTime = new Date(sunriseTime + finlandUct)
    const finlandSunsetTIme = new Date(sunsetTime + finlandUct)
    
    if (dayWeather === 'clear') {
        temSunTime.innerHTML = `
        <P> ${description} | ${temperature}</p>
        <p> Sunrise ${localeTimeString}</p>
        <p> Sunset ${finlandSunsetTIme}</p>`
        remindImgText.innerHTML = `
        <h3 id="remind-text">Get your sunnies on. ${cityName} is looking rather great today.</h3>`
    } else if (dayWeather === 'Rain' || dayWeather === 'Drizzle') {
        temSunTime.innerHTML = `
        <P> ${description} | ${temperature}</p>
        <p> Sunrise ${finlandSunriseTime}</p>
        <p> Sunset ${finlandSunsetTIme}</p>`
        remindImgText.innerHTML = `
        <h3 id="remind-text">Don't forget your umbrella. It's wet in ${cityName} today.</h3>`
    } else if (dayWeather === 'Clouds') {
        temSunTime.innerHTML = `
        <P> ${description} | ${temperature}</p>
        <p> Sunrise ${finlandSunriseTime}</p>
        <p> Sunset ${finlandSunsetTIme}</p>`
        remindImgText.innerHTML = `
        <h3 id="remind-text">Light a fire and get cosy. ${cityName} is looking grey today.</h3>`
    } else {
        remindImgText.innerHTML = `
        <h3 id="remind-text">Oops... Something went wrong</h3>`
    }  
}

