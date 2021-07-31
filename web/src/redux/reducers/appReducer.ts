import { CHANGE_UNITS } from '../actions/actionTypes'
import { appState, IAppState } from '../store/templates/appState'

export default (state: IAppState = appState, action) => {
    switch (action.type) {
        case CHANGE_UNITS: {
            return {
                ...state,
                units: action.units,
            }
        }
        default: {
            return state
        }
    }
}
