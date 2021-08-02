import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentWeatherAndForecastByLatLong } from '../../../apis/getCurrentWeatherAndForecastByLatLong'
import {
    FETCH_CURRENT_WEATHER_AND_FORECAST_BY_LAT_LON_SUCCESS,
    FETCH_FAIL,
} from '../../../redux/actions/actionTypes'
import { IRootReducer } from '../../../redux/reducers'
import ForecastBody, { IForecastBody } from '../ForecastBody/ForecastBody'
import Spinner from '../Spinner/Spinner'
import Widget from '../Widget/Widget'

interface IForecastWidget {}

const ForecastWidget: React.FC<IForecastWidget> = ({}) => {
    const [value, setValue] = React.useState<IForecastBody | null>(null)
    const [loading, setLoading] = React.useState<boolean>(true)
    const [showError, setShowError] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string>(null)
    const units = useSelector((state: IRootReducer) => state.appState.units)
    const coord = useSelector(
        (state: IRootReducer) =>
            state.appState?.currentWeatherDataByZipCode?.coord
    )

    const dispatch = useDispatch()

    React.useLayoutEffect(() => {
        setShowError(false)
        setLoading(true)
    }, [coord, units])

    React.useEffect(() => {
        setLoading(true)
        if (coord?.lat && coord?.lon) {
            const { lat, lon } = coord
            getCurrentWeatherAndForecastByLatLong(lat, lon, units).then(
                (res) => {
                    setLoading(false)
                    if (res.status !== 200) {
                        setShowError(true)
                        setError('An error has occured, please try again.')
                        dispatch({ type: FETCH_FAIL })
                    } else {
                        console.log(res.data)
                        dispatch({
                            type: FETCH_CURRENT_WEATHER_AND_FORECAST_BY_LAT_LON_SUCCESS,
                            data: res.data,
                        })

                        const dataForDisplay: IForecastBody = {
                            list: res.data?.daily,
                        }
                        setShowError(false)
                        setValue(dataForDisplay)
                    }
                }
            )
        } else {
            setShowError(true)
            setError('Please input a zipcode')
            dispatch({ type: FETCH_FAIL })
        }
    }, [coord, units])
    return (
        <Widget title='7 day highs and lows'>
            <>
                {showError && <span className='error-message'>{error}</span>}
                {!showError && (
                    <>
                        {!loading && <ForecastBody {...value} />}
                        {loading && <Spinner />}
                    </>
                )}
            </>
        </Widget>
    )
}

export default ForecastWidget
