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
import { IForecastList } from '../../../apis/responseInterfaces'

export interface IForecastBody {
    list: IForecastList[]
}

interface IData {
    datetime: string
    high: number
    low: number
}

const ForecastBody: React.FC<IForecastBody> = ({ list }) => {
    const [data, setData] = React.useState<IData[] | null>(null)

    React.useEffect(() => {
        if (list && list.length) {
            const forecastData = list.map((datum) => {
                const date = new Date(0)
                date.setUTCSeconds(datum.dt)

                return {
                    datetime: `${
                        date.getMonth() + 1
                    }/${date.getDate()} ${date.toLocaleString('en-US', {
                        hour: 'numeric',
                        hour12: true,
                    })}`,
                    high: Number(datum.main?.temp_max.toFixed(0)),
                    low: Number(datum.main?.temp_min.toFixed(0)),
                }
            })

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
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey='high' stroke='#ee3333' />
                    <Line type='monotone' dataKey='low' stroke='#3366aa' />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ForecastBody
