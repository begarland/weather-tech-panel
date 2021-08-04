import * as React from 'react'
import AlertsWidget from './components/AlertsWidget/AlertsWidget'
import CityContainer from './components/CityContainer/CityContainer'
import CurrentWeatherWidget from './components/CurrentWeatherWidget/CurrentWeatherWidget'
import FOrCToggle from './components/FOrCToggle/FOrCToggle'
import ForecastWidget from './components/ForecastWidget/ForecastWidget'
import RainWidget from './components/RainWidget/RainWidget'
import ZipInput from './components/ZipInput/ZipInput'

const App: React.FC = () => {
    return (
        <div className='App'>
            <div className='zip-and-toggle-container'>
                <ZipInput />
                <FOrCToggle />
            </div>
            <CityContainer />
            <div className='widget-container'>
                <CurrentWeatherWidget />
                <ForecastWidget />
                <AlertsWidget />
                <RainWidget />
            </div>
        </div>
    )
}

export default App
