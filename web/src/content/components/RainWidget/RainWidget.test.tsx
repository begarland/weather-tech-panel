import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import RainWidget from './RainWidget'
import { Provider, useSelector } from 'react-redux'
import store from '../../../redux/store/store'

jest.mock('react-redux', () => ({
    ...(jest as any).requireActual('react-redux'),
    useSelector: jest.fn(),
}))

jest.mock('../RainBody/RainBody', () => {
    const React = require('react')
    return {
        __esModule: true,
        default() {
            return <div data-testid='rain-body' />
        },
    }
})

const setup = (overrides?) => {
    const props = {
        ...overrides,
    }

    return render(
        <Provider store={store as any}>
            <RainWidget {...props} />
        </Provider>
    )
}

describe('RainWidget', () => {
    beforeEach(() => {
        ;(useSelector as jest.Mock<any>).mockImplementation((callback) => {
            return callback({ appState: {} })
        })
    })
    afterEach(() => {
        ;(useSelector as jest.Mock<any>).mockClear()
    })

    test('renders with a title and an error message', async () => {
        setup()
        const title = screen.getByText(/rainfall in next hour/i)
        expect(title).toBeInTheDocument()
        const message = screen.getByText(/please input a zipcode/i)
        expect(message).toBeInTheDocument()
    })
    test('renders with title and no rain data message', async () => {
        const appState = {
            currentWeatherAndForecastDataByLatLon: {
                zipCode: 80550,
            },
        }
        ;(useSelector as jest.Mock<any>).mockImplementation((callback) => {
            return callback({ appState: appState })
        })
        setup()

        const title = screen.getByText(/rainfall in next hour/i)
        expect(title).toBeInTheDocument()

        const message = screen.getByText(/no rain data/i)
        expect(message).toBeInTheDocument()
    })
    test('renders with title and body', async () => {
        const appState = {
            currentWeatherAndForecastDataByLatLon: {
                zipCode: 80550,
                minutely: [{}, {}],
            },
        }
        ;(useSelector as jest.Mock<any>).mockImplementation((callback) => {
            return callback({ appState: appState })
        })
        setup()

        const title = screen.getByText(/rainfall in next hour/i)
        expect(title).toBeInTheDocument()

        const body = screen.getByTestId(/rain-body/i)
        expect(body).toBeInTheDocument()
    })
})
