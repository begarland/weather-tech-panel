import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

jest.mock('recharts', () => {
    const React = require('react')
    return {
        ...(jest as any).requireActual('recharts'),
        BarChart({ children }) {
            return <div data-testid='bar-chart'>{children}</div>
        },
        ResponsiveContainer({ children }) {
            return <div data-testid='responsive-chart'>{children}</div>
        },
        XAxis() {
            return <div data-testid='x-axis' />
        },
        YAxis() {
            return <div data-testid='y-axis' />
        },
        Bar() {
            return <div data-testid='bar' />
        },
        Tooltip() {
            return <div data-testid='tooltip' />
        },
        Legend() {
            return <div data-testid='legend' />
        },
    }
})

import RainBody from './RainBody'

const setup = (overrides?) => {
    const props = {
        ...overrides,
    }

    return render(<RainBody {...props} />)
}

describe('RainBody', () => {
    test('renders with message if precipation is 0', async () => {
        setup({ rainData: [{ dt: 1628028900, precipitation: 0 }] })

        const message = screen.getByText(/no rainfall expected/i)
        expect(message).toBeInTheDocument()
    })
    test('renders with chart if precipation is not 0', async () => {
        setup({ rainData: [{ dt: 1628028900, precipitation: 10 }] })

        const responsiveContianer = screen.getByTestId('responsive-chart')
        expect(responsiveContianer).toBeInTheDocument()
        const barChart = screen.getByTestId('bar-chart')
        expect(barChart).toBeInTheDocument()

        const bar = screen.getByTestId('bar')
        expect(bar).toBeInTheDocument

        const xAxis = screen.getByTestId('x-axis')
        expect(xAxis).toBeInTheDocument()

        const yAxis = screen.getByTestId('y-axis')
        expect(yAxis).toBeInTheDocument()

        const tooltip = screen.getByTestId('tooltip')
        expect(tooltip).toBeInTheDocument()

        const legend = screen.getByTestId('legend')
        expect(legend).toBeInTheDocument()
    })
})
