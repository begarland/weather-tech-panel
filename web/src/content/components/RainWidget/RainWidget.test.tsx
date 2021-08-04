import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import RainWidget from './RainWidget'

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

    return render(<RainWidget {...props} />)
}

describe('RainWidget', () => {
    test('renders with title and body', async () => {
        setup()

        const title = screen.getByText(/today's rainfall/i)
        expect(title).toBeInTheDocument()

        const body = screen.getByTestId(/rain-body/i)
        expect(body).toBeInTheDocument()
    })
})
