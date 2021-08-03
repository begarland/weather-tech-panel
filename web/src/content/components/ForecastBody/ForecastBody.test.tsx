import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

jest.mock('recharts', () => {
    const React = require('react')
    return {
        ...(jest as any).requireActual('recharts'),
        LineChart({ children }) {
            return <div data-testid='line-chart'>{children}</div>
        },
        ResponsiveContainer({ children }) {
            return <div data-testid='responsive-chart'>{children}</div>
        },
        Line() {
            return <div data-testid='line' />
        },
        XAxis() {
            return <div data-testid='x-axis' />
        },
        YAxis() {
            return <div data-testid='y-axis' />
        },
        CartesianGrid() {
            return <div data-testid='cartesion-grid' />
        },
        Tooltip() {
            return <div data-testid='tooltip' />
        },
        Legend() {
            return <div data-testid='legend' />
        },
    }
})

import ForecastBody from './ForecastBody'

const setup = (overrides?) => {
    const props = {
        ...overrides,
        list: [],
    }

    return render(<ForecastBody {...props} />)
}

describe('ForecastBody', () => {
    test('renders a line graph', async () => {
        setup()

        const responsiveContianer = screen.getByTestId('responsive-chart')
        expect(responsiveContianer).toBeInTheDocument()
        const lineChart = screen.getByTestId('line-chart')
        expect(lineChart).toBeInTheDocument()

        const lines = screen.getAllByTestId('line')
        expect(lines).toHaveLength(2)

        const xAxis = screen.getByTestId('x-axis')
        expect(xAxis).toBeInTheDocument()

        const yAxis = screen.getByTestId('y-axis')
        expect(yAxis).toBeInTheDocument()

        const cartesionGrid = screen.getByTestId('cartesion-grid')
        expect(cartesionGrid).toBeInTheDocument()

        const tooltip = screen.getByTestId('tooltip')
        expect(tooltip).toBeInTheDocument()

        const legend = screen.getByTestId('legend')
        expect(legend).toBeInTheDocument()
    })
})
