import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { combineEpics } from 'redux-observable'
import appState from './appReducer'
import { IAppState } from '../store/templates/appState'

export const rootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        appState,
    })

export const rootEpic = combineEpics()

export type RootState = ReturnType<typeof rootReducer>

export type IRootReducer = {
    appState: IAppState
}
