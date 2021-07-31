import * as React from 'react'
import CurrentWeatherWidget from './components/CurrentWeatherWidget/CurrentWeatherWidget'
import FOrCToggle from './components/FOrCToggle/FOrCToggle'
import ZipInput from './components/ZipInput/ZipInput'

const App: React.FC = () => {
    return (
        <div className='App'>
            <ZipInput />
            <CurrentWeatherWidget />
            <FOrCToggle />
        </div>
    )
}

export default App
