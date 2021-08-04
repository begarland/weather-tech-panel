import * as React from 'react'
import { useSelector } from 'react-redux'
import { IRootReducer } from '../../../redux/reducers'
import RainBody from '../RainBody/RainBody'
import Spinner from '../Spinner/Spinner'
import Widget from '../Widget/Widget'

interface IRainWidget {}

const RainWidget: React.FC<IRainWidget> = ({}) => {
    const [rainData, setRainData] = React.useState<any | null>(null)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [showError, setShowError] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string>(null)
    const { zipCode, units, currentWeatherAndForecastDataByLatLon } =
        useSelector((state: IRootReducer) => state.appState)
    const minutely = currentWeatherAndForecastDataByLatLon?.minutely

    React.useLayoutEffect(() => {
        setShowError(false)
        setLoading(true)
    }, [zipCode, minutely, currentWeatherAndForecastDataByLatLon, units])

    React.useEffect(() => {
        setLoading(true)

        if (minutely && minutely.length) {
            setLoading(false)
            setRainData(minutely)
        } else if (currentWeatherAndForecastDataByLatLon && !minutely) {
            setRainData(minutely)
            setLoading(false)
        } else {
            setShowError(true)
            setError('Please input a zipcode')
        }
    }, [zipCode, currentWeatherAndForecastDataByLatLon, minutely, units])

    return (
        <Widget title='Rainfall In Next Hour'>
            {showError && <span className='error-message'>{error}</span>}
            {!showError && (
                <>
                    {loading && <Spinner />}
                    {!loading && (
                        <>
                            {!rainData && (
                                <span className='message'>No rain data</span>
                            )}
                            {rainData && <RainBody rainData={rainData} />}
                        </>
                    )}
                </>
            )}
        </Widget>
    )
}

export default RainWidget
