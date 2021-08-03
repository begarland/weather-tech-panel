import * as React from 'react'
import { Provider } from 'react-redux'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import CurrentWeatherBody from './CurrentWeatherBody'
import store from '../../../redux/store/store'

const setup = (overrides?) => {
    const props = {
        ...overrides,
        temp: 70,
        feels_like: 75,
        temp_min: 60,
        temp_max: 80,
        weather: 'Rain',
        icon: 'rain',
    }

    return render(
        <Provider store={store as any}>
            <CurrentWeatherBody {...props} />
        </Provider>
    )
}

describe('CurrentWeatherBody', () => {
    test('renders as expected', async () => {
        setup()

        const currentTemp = screen.getByText(/70/i)
        expect(currentTemp).toBeInTheDocument()

        const feelsLike = screen.getByText(/feels like: 75/i)
        expect(feelsLike).toBeInTheDocument()

        const weatherDesc = screen.getByText(/rain/i)
        expect(weatherDesc).toBeInTheDocument()

        const highLabel = screen.getByText(/high:/i)
        const high = screen.getByText(/80/i)
        expect(highLabel).toBeInTheDocument()
        expect(high).toBeInTheDocument()

        const lowLabel = screen.getByText(/low:/i)
        const low = screen.getByText(/60/i)
        expect(lowLabel).toBeInTheDocument()
        expect(low).toBeInTheDocument()
    })
})
