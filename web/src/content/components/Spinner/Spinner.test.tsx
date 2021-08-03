import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Spinner from './Spinner'

const setup = (overrides?) => {
    const props = {
        ...overrides,
    }

    return render(<Spinner {...props} />)
}

describe('Spinner', () => {
    test('renders as expected', async () => {
        setup()
        const spinner = screen.getByTestId('spinner-component')
        expect(spinner).toBeInTheDocument()
        expect(spinner).toHaveClass('lds-roller')
    })
})
