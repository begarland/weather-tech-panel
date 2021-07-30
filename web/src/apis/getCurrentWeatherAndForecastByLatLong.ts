import axios from 'axios'
const API_KEY = process.env.WEATHER_API_KEY

export function getCurrentWeatherByLatLong(lat: number, long: number): void {
    console.log('this should get the weather by the zipcode ')

    axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}`
    )
}
