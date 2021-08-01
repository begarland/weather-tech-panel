import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiveDayForecastByZipCode } from '../../../apis/getFiveDayForecastByZipCode'
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
    const zipCode = useSelector((state: IRootReducer) => state.appState.zipCode)

    const dispatch = useDispatch()

    React.useLayoutEffect(() => {
        setShowError(false)
        setLoading(true)
    }, [zipCode, units])

    React.useEffect(() => {
        setLoading(true)
        if (zipCode) {
            getFiveDayForecastByZipCode(zipCode, units).then((res) => {
                setLoading(false)
                if (res.status !== 200) {
                    setShowError(true)
                    setError('An error has occured, please try again.')
                } else {
                    console.log(res.data)
                }
            })
        } else {
            setShowError(true)
            setError('Please input a zipcode')
        }
    }, [zipCode, units])
    return (
        <Widget title='Weather Forecast'>
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
