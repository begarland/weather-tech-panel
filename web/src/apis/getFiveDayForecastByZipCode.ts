import axios from 'axios'
import { imperial } from '../content/ constants'
const API_KEY = process.env.WEATHER_API_KEY

// docs https://openweathermap.org/forecast5

export function getFiveDayForecastByZipCode(
    zipCode: number,
    units: string = imperial
): Promise<any> {
    return axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&units=${units}&appid=${API_KEY}`
    )
}
