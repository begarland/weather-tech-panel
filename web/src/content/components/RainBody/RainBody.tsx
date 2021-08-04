import * as React from 'react'
import {
    Bar,
    BarChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { IMinutelyForecast } from '../../../apis/responseInterfaces'

interface IRainBody {
    rainData: IMinutelyForecast[]
}

interface IData {
    datetime: string
    precipitation: number
}

const RainBody: React.FC<IRainBody> = ({ rainData }) => {
    const [data, setData] = React.useState<IData[] | null>(null)
    React.useEffect(() => {
        if (rainData && rainData.length) {
            const precipitationData = rainData.map((datum) => {
                const date = new Date(0)
                date.setUTCSeconds(datum.dt)

                return {
                    datetime: `${date.toLocaleString('en-US', {
                        hour12: true,
                        hour: 'numeric',
                        minute: 'numeric',
                    })}`,
                    precipitation: datum.precipitation,
                }
            })

            if (precipitationData.find((precip) => precip.precipitation)) {
                setData(precipitationData)
            } else {
                setData(null)
            }
        }
    }, [rainData])

    return (
        <>
            {data && (
                <div className='rain-body-container'>
                    <ResponsiveContainer width='100%' height='100%'>
                        <BarChart width={150} height={40} data={data}>
                            <XAxis dataKey='datetime' />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey='precipitation' fill='#3366aa' />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
            {!data && (
                <div className='message-container'>
                    <span className='message'>No rainfall expected</span>
                </div>
            )}
        </>
    )
}

export default RainBody
