import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import AlertsWidget from './AlertsWidget'

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

    return render(<AlertsWidget {...props} />)
}

describe('AlertsWidget', () => {
    test('renders with a title and a no alerts message', async () => {
        setup()

        const title = screen.getByText('Alerts')
        expect(title).toBeInTheDocument()

        const message = screen.getByText(/no current alerts/i)
        expect(message).toBeInTheDocument()
    })
})
