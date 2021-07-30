import axios from 'axios'
const API_KEY = process.env.WEATHER_API_KEY

export function getCurrentWeatherByZipCode(zipCode: number): void {
    axios.get(
        `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${API_KEY}`
    )
}
