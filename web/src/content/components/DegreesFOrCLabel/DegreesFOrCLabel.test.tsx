import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import DegreesFOrCLabel from './DegreesFOrCLabel'
import { imperial, metric } from '../../constants'

const setup = (overrides?) => {
    const props = {
        ...overrides,
    }

    return render(<DegreesFOrCLabel {...props} />)
}

describe('DegreesFOrCLabel', () => {
    test('renders F when imperial units are passed', async () => {
        setup({ units: imperial })

        const label = screen.getByText(/f/i)
        expect(label).toBeInTheDocument()
    })

    test('renders C when metric units are passed', async () => {
        setup({ units: metric })

        const label = screen.getByText(/c/i)
        expect(label).toBeInTheDocument()
    })
})
