import * as React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { IDailyForecast } from '../../../apis/responseInterfaces'
import { round5 } from '../../utils'

export interface IForecastBody {
    list: IDailyForecast[]
}

interface IData {
    datetime: string
    high: number
    low: number
}

const ForecastBody: React.FC<IForecastBody> = ({ list }) => {
    const [data, setData] = React.useState<IData[] | null>(null)
    const [yAxisDomain, setYAxisDomain] = React.useState<number[]>([0, 100])

    React.useEffect(() => {
        if (list && list.length) {
            const highs = []
            const lows = []
            const forecastData = list.map((datum) => {
                const date = new Date(0)
                date.setUTCSeconds(datum.dt)

                const high = Number(datum.temp?.max.toFixed(0))
                const low = Number(datum.temp?.min.toFixed(0))

                highs.push(high)
                lows.push(low)

                return {
                    datetime: `${date.getMonth() + 1}/${date.getDate()}`,
                    high,
                    low,
                }
            })

            const yDomainMin = round5(
                lows.reduce((a, b) => Math.min(a, b)) - 10
            )
            const yDomainMax = round5(
                highs.reduce((a, b) => Math.max(a, b)) + 10
            )

            setYAxisDomain([yDomainMin, yDomainMax])
            setData(forecastData)
        }
    }, [list])

    return (
        <div className='forecast-body-container'>
            <ResponsiveContainer width='100%' height='100%'>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='datetime' />
                    <YAxis domain={yAxisDomain} type='number' />
                    <Tooltip />
                    <Legend />
                    <Line
                        isAnimationActive={false}
                        type='monotone'
                        dataKey='high'
                        stroke='#ee3333'
                    />
                    <Line
                        isAnimationActive={false}
                        type='monotone'
                        dataKey='low'
                        stroke='#3366aa'
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ForecastBody
