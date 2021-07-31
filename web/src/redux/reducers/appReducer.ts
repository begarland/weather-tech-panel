import {
    CHANGE_UNITS,
    CHANGE_ZIPCODE,
    FETCH_CURRENT_WEATHER_BY_ZIPCODE_SUCCESS,
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
            return {
                ...state,
                zipCode: action.zipCode,
            }
        }
        case FETCH_CURRENT_WEATHER_BY_ZIPCODE_SUCCESS: {
            return {
                ...state,
                currentWeatherDataByZipCode: action.data,
            }
        }
        default: {
            return state
        }
    }
}
