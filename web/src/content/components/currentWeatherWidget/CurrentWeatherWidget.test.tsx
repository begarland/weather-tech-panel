import * as React from 'react'
import { useSelector, Provider } from 'react-redux'
import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'

import store from '../../../redux/store/store'
import CurrentWeatherWidget from './CurrentWeatherWidget'
import { getCurrentWeatherByZipCode } from '../../../apis/getCurrentWeatherByZipCode'
import { imperial } from '../../constants'

jest.mock('react-redux', () => ({
    ...(jest as any).requireActual('react-redux'),
    useSelector: jest.fn(),
}))

jest.mock('../CurrentWeatherBody/CurrentWeatherBody', () => {
    const React = require('react')
    return {
        __esModule: true,
        default() {
            return <div data-testid='current-weather-body-mock' />
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

jest.mock('../../../apis/getCurrentWeatherByZipCode.ts')
const currentWeather = Promise.resolve({ status: 200 })
;(getCurrentWeatherByZipCode as any).mockImplementation(() => currentWeather)

const setup = (overrides?) => {
    const props = {
        ...overrides,
        title: 'current weather',
    }

    return render(
        <Provider store={store as any}>
            <CurrentWeatherWidget {...props}>some body</CurrentWeatherWidget>
        </Provider>
    )
}

describe('CurrentWeatherWidget', () => {
    beforeEach(() => {
        ;(useSelector as jest.Mock<any>).mockImplementation((callback) => {
            return callback({ appState: {} })
        })
    })
    afterEach(() => {
        ;(useSelector as jest.Mock<any>).mockClear()
        ;(getCurrentWeatherByZipCode as jest.Mock<any>).mockClear()
    })

    test('renders with error message initially', async () => {
        setup()
        const title = screen.getByText(/current weather/i)
        const errorBody = screen.getByText(/please input a zipcode/i)
        expect(title).toBeInTheDocument()
        expect(errorBody).toBeInTheDocument()
    })

    test('renders with spinner and then CurrentWeatherBody', async () => {
        ;(useSelector as jest.Mock<any>).mockImplementation((callback) => {
            return callback({ appState: { zipCode: 80550, units: imperial } })
        })
        setup()

        const title = screen.getByText(/current weather/i)
        expect(title).toBeInTheDocument()

        const spinner = screen.getByTestId('spinner-mock')
        expect(spinner).toBeInTheDocument()

        await act(() => currentWeather)

        const currentWeatherBody = screen.getByTestId(
            'current-weather-body-mock'
        )
        expect(currentWeatherBody).toBeInTheDocument()
    })
})
