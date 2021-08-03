import {
    ICurrentWeatherAndForecastByLatLon,
    ICurrentWeatherByZipCode,
    IForecastByZipCode,
} from '../../../apis/responseInterfaces'
import { imperial } from '../../../content/constants'

export const appState: IAppState = {
    zipCode: null,
    units: imperial,
    currentWeatherDataByZipCode: null,
    forecastDataByZipCode: null,
    currentWeatherAndForecastDataByLatLon: null,
}

export interface IAppState {
    zipCode: number | null
    units: 'imperial' | 'metric'
    currentWeatherDataByZipCode: ICurrentWeatherByZipCode | null
    forecastDataByZipCode: IForecastByZipCode | null
    currentWeatherAndForecastDataByLatLon: ICurrentWeatherAndForecastByLatLon | null
}
