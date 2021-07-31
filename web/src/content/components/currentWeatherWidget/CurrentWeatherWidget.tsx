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
    const units = useSelector((state: IRootReducer) => state.appState.units)

    React.useEffect(() => {
        setLoading(true)
        getCurrentWeatherByZipCode(80550, units).then((res) => {
            setLoading(false)

            if (res.status !== 200) {
                setShowError(true)
            }

            const dataForDisplay: ICurrentWeatherBody = {
                ...res.data?.main,
                weather: res.data?.weather[0]?.description,
                icon: res.data?.weather[0].icon,
            }

            setValue(dataForDisplay)
        })
    }, [units])

    return (
        <Widget title='Current Weather'>
            <>
                {showError && (
                    <span className='error-message'>
                        An error has occured, please try again.
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
