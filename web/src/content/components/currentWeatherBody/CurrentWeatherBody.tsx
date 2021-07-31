import * as React from 'react'
import { useSelector } from 'react-redux'
import { imperial } from '../../ constants'
import { IRootReducer } from '../../../redux/reducers'
import DegreesFOrCLabel from '../DegreesFOrCLabel/DegreesFOrCLabel'

export interface ICurrentWeatherBody {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    weather: string
    icon: string
}

const CurrentWeatherBody: React.FC<ICurrentWeatherBody> = ({
    temp,
    feels_like,
    temp_min,
    temp_max,
    weather,
    icon,
}) => {
    const units = useSelector((state: IRootReducer) => state.appState.units)

    const UnitsLabel = <DegreesFOrCLabel units={units}/>

    return (
        <div className='current-weather-body'>
            <div className='current-temp-and-feels-like-container'>
                <h3 className='current-temp'>
                    {temp?.toFixed(0)}
                    {UnitsLabel}
                </h3>
                <p className='feels-like'>
                    Feels like: {feels_like?.toFixed(0)}
                    {UnitsLabel}
                </p>
            </div>
            <div className='icon-and-weather-container'>
                <img
                    className='weather-icon'
                    src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                />
                <p className='weather-desc bold'>{weather}</p>
            </div>
            <div className='high-low-container'>
                <p className='high-low high'>
                    <span className='bold desc'>High:</span>{' '}
                    {temp_max?.toFixed(0)}
                    {UnitsLabel}
                </p>
                <p className='high-low low'>
                    <span className='bold desc'>Low:</span>{' '}
                    {temp_min?.toFixed(0)}
                    {UnitsLabel}
                </p>
            </div>
        </div>
    )
}

export default CurrentWeatherBody
