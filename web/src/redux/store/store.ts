import { applyMiddleware, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { rootEpic, rootReducer, RootState } from '../reducers/index'

export const history = createBrowserHistory()

import { createEpicMiddleware } from 'redux-observable'

const epicMiddleware = createEpicMiddleware()

let middleware
if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(
        applyMiddleware(epicMiddleware, thunk, routerMiddleware(history))
    )
} else {
    middleware = applyMiddleware(
        epicMiddleware,
        thunk,
        routerMiddleware(history)
    )
}

const reducer: RootState = rootReducer(history)

export default createStore(reducer, {}, middleware)
epicMiddleware.run(rootEpic)
