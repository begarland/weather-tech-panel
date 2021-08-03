import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentWeatherByZipCode } from '../../../apis/getCurrentWeatherByZipCode'
import { FETCH_CURRENT_WEATHER_BY_ZIPCODE_SUCCESS, FETCH_FAIL } from '../../../redux/actions/actionTypes'
import { IRootReducer } from '../../../redux/reducers'
import CurrentWeatherBody, {
    ICurrentWeatherBody,
} from '../CurrentWeatherBody/CurrentWeatherBody'
import Spinner from '../Spinner/Spinner'
import Widget from '../Widget/Widget'

interface ICurrentWeatherWidget {}

const CurrentWeatherWidget: React.FC<ICurrentWeatherWidget> = ({}) => {
    const [value, setValue] = React.useState<ICurrentWeatherBody | null>(null)
    const [loading, setLoading] = React.useState<boolean>(true)
    const [showError, setShowError] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string>(null)
    const { units, zipCode } = useSelector((state: IRootReducer) => state.appState)

    const dispatch = useDispatch()

    React.useLayoutEffect(() => {
        setShowError(false)
        setLoading(true)
    }, [zipCode, units])
    
    React.useEffect(() => {
        if (zipCode && zipCode.toString().length >= 5) {
            getCurrentWeatherByZipCode(zipCode, units).then((res) => {
                setLoading(false)    
                if (res.status !== 200) {
                    setShowError(true)
                    setError('An error has occured, please try again.')
                    dispatch({ type: FETCH_FAIL })
                }

                dispatch({type: FETCH_CURRENT_WEATHER_BY_ZIPCODE_SUCCESS, data: res.data})
    
                const dataForDisplay: ICurrentWeatherBody = {
                    ...res.data?.main,
                    weather: res.data?.weather[0]?.description,
                    icon: res.data?.weather[0].icon,
                }
                setShowError(false)
                setValue(dataForDisplay)
            }).catch((err) => {
                setShowError(true)
                if (err?.message.includes('404')) {
                    setError('Please input a valid zipcode')
                } else {
                    setError('An error has occured, please try again.')
                }
            })
        } else {
            setShowError(true)
            setError('Please input a zipcode')
            dispatch({ type: FETCH_FAIL })
        }
        
    }, [zipCode, units])

    return (
        <Widget title='Current Weather'>
            <>
                {showError && (
                    <span className='error-message'>
                        {error}
                    </span>
                )}
                {!showError && (
                    <>
                        {!loading && <CurrentWeatherBody {...value} />}
                        {loading && <Spinner />}
                    </>
                )}
            </>
        </Widget>
    )
}

export default CurrentWeatherWidget
