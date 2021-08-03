import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Widget from './Widget'

const setup = (overrides?) => {
    const props = {
        ...overrides,
        title: 'Hello World',
    }

    return render(<Widget {...props}>I am a body</Widget>)
}

describe('Widget', () => {
    test('renders as expected', async () => {
        setup()

        const title = screen.getByText(/hello world/i)
        const children = screen.getByText(/i am a body/i)
        expect(title).toBeInTheDocument()
        expect(children).toBeInTheDocument()
    })
})
