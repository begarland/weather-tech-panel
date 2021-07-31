import { ICurrentWeatherByZipCode } from '../../../apis/responseInterfaces'
import { imperial } from '../../../content/ constants'

export const appState: IAppState = {
    zipCode: null,
    units: imperial,
    currentWeatherDataByZipCode: null,
}

export interface IAppState {
    zipCode: number | null
    units: 'imperial' | 'metric'
    currentWeatherDataByZipCode: ICurrentWeatherByZipCode | null
}
