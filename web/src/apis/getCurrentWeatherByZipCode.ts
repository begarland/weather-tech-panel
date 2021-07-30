import axios from 'axios'
const API_KEY = process.env.WEATHER_API_KEY

// docs: https://openweathermap.org/current#data

export function getCurrentWeatherByZipCode(
    zipCode: number,
    units: string = 'imperial'
): Promise<any> {
    return axios.get(
        `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=${units}&appid=${API_KEY}`
    )
}
