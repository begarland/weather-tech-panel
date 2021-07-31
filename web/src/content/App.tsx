import * as React from 'react'
import CurrentWeatherWidget from './components/CurrentWeatherWidget/CurrentWeatherWidget'
import FOrCToggle from './components/FOrCToggle/FOrCToggle'

const App: React.FC = () => {
    return (
        <div className='App'>
            <CurrentWeatherWidget />
            <FOrCToggle />
        </div>
    )
}

export default App
