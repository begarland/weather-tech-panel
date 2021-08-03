import axios from 'axios'
import { imperial } from '../content/constants'
const API_KEY = process.env.WEATHER_API_KEY

// docs: https://openweathermap.org/api/one-call-api

export function getCurrentWeatherAndForecastByLatLong(
    lat: number,
    long: number,
    units: string = imperial
): Promise<any> {
    return axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=${units}&appid=${API_KEY}`
    )
}
