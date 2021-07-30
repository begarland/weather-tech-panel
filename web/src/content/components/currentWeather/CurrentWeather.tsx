import * as React from 'react'

export interface ICurrentWeather {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
}

const CurrentWeather: React.FC<ICurrentWeather> = ({
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
}) => {
    return (
        <div>
            <h3>{temp}</h3>
            <p>{feels_like}</p>
            <p>{temp_min}</p>
            <p>{temp_max}</p>
            <p>{pressure}</p>
            <p>{humidity}</p>
        </div>
    )
}

export default CurrentWeather
