import * as React from 'react'
import { getCurrentWeatherByZipCode } from '../../../apis/getCurrentWeatherByZipCode'
import CurrentWeather, {
    ICurrentWeather,
} from '../currentWeather/CurrentWeather'
import Spinner from '../Spinner/Spinner'
import Widget from '../widget/Widget'

interface ICurrentWeatherWidget {}

const CurrentWeatherWidget: React.FC<ICurrentWeatherWidget> = ({}) => {
    const [value, setValue] = React.useState<ICurrentWeather | null>(null)
    const [loading, setLoading] = React.useState<boolean>(true)
    const [showError, setShowError] = React.useState<boolean>(false)

    React.useEffect(() => {
        getCurrentWeatherByZipCode(80550).then((res) => {
            setLoading(false)

            if (res.status !== 200) {
                setShowError(true)
            }
            setValue(res.data.main)
        })
    }, [])

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
                        {!loading && <CurrentWeather {...value} />}
                        {loading && <Spinner />}
                    </>
                )}
            </>
        </Widget>
    )
}

export default CurrentWeatherWidget
