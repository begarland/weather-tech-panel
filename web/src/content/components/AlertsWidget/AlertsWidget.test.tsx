import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import AlertsWidget from './AlertsWidget'
import { Provider, useSelector } from 'react-redux'
import store from '../../../redux/store/store'

jest.mock('react-redux', () => ({
    ...(jest as any).requireActual('react-redux'),
    useSelector: jest.fn(),
}))

jest.mock('../AlertBody/AlertBody', () => {
    const React = require('react')
    return {
        __esModule: true,
        default() {
            return <div data-testid='alert-body' />
        },
    }
})

const setup = (overrides?) => {
    const props = {
        ...overrides,
    }

    return render(
        <Provider store={store as any}>
            <AlertsWidget {...props} />
        </Provider>
    )
}

describe('AlertsWidget', () => {
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
        const title = screen.getByText('Alerts')
        expect(title).toBeInTheDocument()
        const message = screen.getByText(/please input a zipcode/i)
        expect(message).toBeInTheDocument()
    })
    test('renders with a title and a no alerts message', async () => {
        const appState = {
            currentWeatherAndForecastDataByLatLon: {
                zipCode: 80550,
            },
        }
        ;(useSelector as jest.Mock<any>).mockImplementation((callback) => {
            return callback({ appState: appState })
        })
        setup()
        const title = screen.getByText('Alerts')
        expect(title).toBeInTheDocument()
        const message = screen.getByText(/no current alerts/i)
        expect(message).toBeInTheDocument()
    })
    test('renders with a title and correct number of alerts', async () => {
        const appState = {
            currentWeatherAndForecastDataByLatLon: {
                zipCode: 80550,
                alerts: [{}, {}],
            },
        }
        ;(useSelector as jest.Mock<any>).mockImplementation((callback) => {
            return callback({ appState: appState })
        })
        setup()
        const title = screen.getByText('Alerts')
        expect(title).toBeInTheDocument()

        const alerts = screen.getAllByTestId(/alert-body/i)
        expect(alerts).toHaveLength(2)
    })
})
