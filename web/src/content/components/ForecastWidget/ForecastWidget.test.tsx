import * as React from 'react'
import { useSelector, Provider } from 'react-redux'
import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'

import store from '../../../redux/store/store'
import ForecastWidget from './ForecastWidget'
import { getCurrentWeatherAndForecastByLatLong } from '../../../apis/getCurrentWeatherAndForecastByLatLong'
import { imperial } from '../../constants'

jest.mock('react-redux', () => ({
    ...(jest as any).requireActual('react-redux'),
    useSelector: jest.fn(),
}))

jest.mock('../ForecastBody/ForecastBody', () => {
    const React = require('react')
    return {
        __esModule: true,
        default() {
            return <div data-testid='forecast-body-mock' />
        },
    }
})

jest.mock('../Spinner/Spinner', () => {
    const React = require('react')
    return {
        __esModule: true,
        default() {
            return <div data-testid='spinner-mock' />
        },
    }
})

jest.mock('../../../apis/getCurrentWeatherAndForecastByLatLong.ts')
const forecast = Promise.resolve({ status: 200 })
;(getCurrentWeatherAndForecastByLatLong as any).mockImplementation(
    () => forecast
)

const setup = (overrides?) => {
    const props = {
        ...overrides,
    }

    return render(
        <Provider store={store as any}>
            <ForecastWidget {...props} />
        </Provider>
    )
}

describe('ForecastWidget', () => {
    beforeEach(() => {
        ;(useSelector as jest.Mock<any>).mockImplementation((callback) => {
            return callback({ appState: {} })
        })
    })
    afterEach(() => {
        ;(useSelector as jest.Mock<any>).mockClear()
    })

    test('renders with error message initally', async () => {
        setup()

        const title = screen.getByText(/7 day highs and lows/i)
        const errorBody = screen.getByText(/please input a zipcode/i)
        expect(title).toBeInTheDocument()
        expect(errorBody).toBeInTheDocument()
    })

    test('renders with spinner and then ForecastBody', async () => {
        const appState = {
            currentWeatherDataByZipCode: {
                coord: { lat: 10, lon: 10 },
            },
            units: imperial,
        }
        ;(useSelector as jest.Mock<any>).mockImplementation((callback) => {
            return callback({
                appState: appState,
            })
        })
        setup()

        const title = screen.getByText(/7 day highs and lows/i)
        expect(title).toBeInTheDocument()

        const spinner = screen.getByTestId('spinner-mock')
        expect(spinner).toBeInTheDocument()

        await act(() => forecast)

        const forecastBody = screen.getByTestId('forecast-body-mock')
        expect(forecastBody).toBeInTheDocument()
    })
})
