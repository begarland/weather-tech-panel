import {
    CHANGE_UNITS,
    CHANGE_ZIPCODE,
    FETCH_CURRENT_WEATHER_AND_FORECAST_BY_LAT_LON_SUCCESS,
    FETCH_CURRENT_WEATHER_BY_ZIPCODE_SUCCESS,
    FETCH_FAIL,
    FETCH_FORECAST_BY_ZIPCODE_SUCCESS,
} from '../actions/actionTypes'
import { appState, IAppState } from '../store/templates/appState'

export default (state: IAppState = appState, action) => {
    switch (action.type) {
        case CHANGE_UNITS: {
            return {
                ...state,
                units: action.units,
            }
        }
        case CHANGE_ZIPCODE: {
            if (action.zipCode === state.zipCode) {
                return {
                    ...state,
                }
            }
            return {
                ...state,
                zipCode: action.zipCode,
                currentWeatherDataByZipCode: null,
                forecastDataByZipCode: null,
                currentWeatherAndForecastDataByLatLon: null,
            }
        }
        case FETCH_CURRENT_WEATHER_BY_ZIPCODE_SUCCESS: {
            return {
                ...state,
                currentWeatherDataByZipCode: action.data,
            }
        }
        case FETCH_FORECAST_BY_ZIPCODE_SUCCESS: {
            return {
                ...state,
                forecastDataByZipCode: action.data,
            }
        }
        case FETCH_CURRENT_WEATHER_AND_FORECAST_BY_LAT_LON_SUCCESS: {
            return {
                ...state,
                currentWeatherAndForecastDataByLatLon: action.data,
            }
        }
        case FETCH_FAIL: {
            return {
                ...state,
                currentWeatherDataByZipCode: null,
                forecastDataByZipCode: null,
                currentWeatherAndForecastDataByLatLon: null,
            }
        }
        default: {
            return state
        }
    }
}
