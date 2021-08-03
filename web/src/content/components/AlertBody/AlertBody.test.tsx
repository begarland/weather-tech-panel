import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import AlertBody from './AlertBody'

const setup = (overrides?) => {
    const props = {
        ...overrides,
    }

    return render(<AlertBody {...props} />)
}

describe('AlertBody', () => {
    test('renders and displays description', async () => {
        setup({
            alert: {
                description: 'some desc here',
            },
        })
        const alertMsg = screen.getByText(/some desc here/i)
        expect(alertMsg).toBeInTheDocument()
    })
})
