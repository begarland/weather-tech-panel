import * as React from 'react'
import Widget from './components/Widget'

const App = () => {
    return (
        <div className='App'>
            <Widget title='Hello World'>
                <span>testing children</span>
            </Widget>
        </div>
    )
}

export default App
