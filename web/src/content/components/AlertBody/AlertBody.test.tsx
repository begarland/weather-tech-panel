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
    test('renders as expected', async () => {
        setup()
    })
})
