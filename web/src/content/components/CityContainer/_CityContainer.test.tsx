import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import CityContainer from './CityContainer'
import { Provider, useSelector } from 'react-redux'
import store from '../../../redux/store/store'

jest.mock('react-redux', () => ({
    ...(jest as any).requireActual('react-redux'),
    useSelector: jest.fn(),
}))

const setup = (overrides?) => {
    const props = {
        ...overrides,
    }

    return render(
        <Provider store={store as any}>
            <CityContainer {...props} />
        </Provider>
    )
}

describe('CityContainer', () => {
    beforeEach(() => {
        ;(useSelector as jest.Mock<any>).mockImplementation((callback) => {
            return callback({ appState: {} })
        })
    })
    afterEach(() => {
        ;(useSelector as jest.Mock<any>).mockClear()
    })

    test('renders as null if no city provided', async () => {
        setup()

        const container = screen.queryAllByTestId(/city-container/i)
        expect(container).toHaveLength(0)
    })

    test('renders if city provided', async () => {
        const appState = {
            currentWeatherDataByZipCode: {
                name: 'Windsor',
            },
        }
        ;(useSelector as jest.Mock<any>).mockImplementation((callback) => {
            return callback({
                appState: appState,
            })
        })
        setup()

        const container = screen.getByText(/windsor/i)
        expect(container).toBeInTheDocument()
    })
})
