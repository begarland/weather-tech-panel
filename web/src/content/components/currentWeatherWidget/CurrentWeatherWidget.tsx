import * as React from 'react'
import { useSelector } from 'react-redux'
import { getCurrentWeatherByZipCode } from '../../../apis/getCurrentWeatherByZipCode'
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
    const units = useSelector((state: IRootReducer) => state.appState.units)
    const zipCode = useSelector((state: IRootReducer) => state.appState.zipCode)

    React.useEffect(() => {
        setLoading(true)
        if (zipCode && zipCode.toString().length >= 5) {
            getCurrentWeatherByZipCode(zipCode, units).then((res) => {
                setLoading(false)
    
                if (res.status !== 200) {
                    setShowError(true)
                    setError('An error has occured, please try again.')
                }
    
                const dataForDisplay: ICurrentWeatherBody = {
                    ...res.data?.main,
                    weather: res.data?.weather[0]?.description,
                    icon: res.data?.weather[0].icon,
                }
    
                setValue(dataForDisplay)
            })
        } else {
            setShowError(true)
            setError('Please input a zipcode')
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
