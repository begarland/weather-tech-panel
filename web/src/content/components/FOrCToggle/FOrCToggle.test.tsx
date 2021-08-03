import * as React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import store from '../../../redux/store/store'

import FOrCToggle from './FOrCToggle'
import { Provider } from 'react-redux'

const setup = (overrides?) => {
    const props = {
        ...overrides,
    }

    return render(
        <Provider store={store as any}>
            <FOrCToggle {...props} />
        </Provider>
    )
}

describe('FOrCToggle', () => {
    test('renders as expected', async () => {
        setup()

        const toggle = screen.getByTestId('toggle')
        expect(toggle).toBeInTheDocument()

        const fValue = screen.getByText(/f/i)
        expect(fValue).toBeInTheDocument()

        fireEvent.click(toggle)

        const cValue = screen.getByText(/c/i)
        expect(cValue).toBeInTheDocument()

        fireEvent.click(toggle)
        expect(fValue).toBeInTheDocument()

        fireEvent.click(toggle)
        expect(cValue).toBeInTheDocument()
    })
})
