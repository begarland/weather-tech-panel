import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import App from './App'
import { Provider } from 'react-redux'
import store from '../redux/store/store'

jest.mock('./components/ZipInput/ZipInput', () => {
    const React = require('react')
    return {
        __esModule: true,
        default() {
            return <div data-testid='zip-input' />
        },
    }
})

jest.mock('./components/FOrCToggle/FOrCToggle', () => {
    const React = require('react')
    return {
        __esModule: true,
        default() {
            return <div data-testid='f-or-c-toggle' />
        },
    }
})

jest.mock('./components/CityContainer/CityContainer', () => {
    const React = require('react')
    return {
        __esModule: true,
        default() {
            return <div data-testid='city-container' />
        },
    }
})

jest.mock('./components/CurrentWeatherWidget/CurrentWeatherWidget', () => {
    const React = require('react')
    return {
        __esModule: true,
        default() {
            return <div data-testid='current-weather-widget' />
        },
    }
})

jest.mock('./components/ForecastWidget/ForecastWidget', () => {
    const React = require('react')
    return {
        __esModule: true,
        default() {
            return <div data-testid='forecast-widget' />
        },
    }
})

jest.mock('./components/AlertsWidget/AlertsWidget', () => {
    const React = require('react')
    return {
        __esModule: true,
        default() {
            return <div data-testid='alerts-widget' />
        },
    }
})

jest.mock('./components/RainWidget/RainWidget', () => {
    const React = require('react')
    return {
        __esModule: true,
        default() {
            return <div data-testid='rain-widget' />
        },
    }
})

const setup = (overrides?) => {
    const props = {
        ...overrides,
    }

    return render(
        <Provider store={store as any}>
            <App {...props} />
        </Provider>
    )
}

describe('App', () => {
    test('renders with expected components', async () => {
        setup()

        const zipInput = screen.getByTestId(/zip-input/i)
        const fOrCToggle = screen.getByTestId(/f-or-c-toggle/i)
        const cityContainer = screen.getByTestId(/city-container/i)
        const currentWeatherWidget = screen.getByTestId(
            /current-weather-widget/i
        )
        const forecastWidget = screen.getByTestId(/forecast-widget/i)
        const alertsWidget = screen.getByTestId(/alerts-widget/i)
        const rainWidget = screen.getByTestId(/rain-widget/i)

        expect(zipInput).toBeInTheDocument()
        expect(fOrCToggle).toBeInTheDocument()
        expect(cityContainer).toBeInTheDocument()
        expect(currentWeatherWidget).toBeInTheDocument()
        expect(forecastWidget).toBeInTheDocument()
        expect(alertsWidget).toBeInTheDocument()
        expect(rainWidget).toBeInTheDocument()
    })
})
