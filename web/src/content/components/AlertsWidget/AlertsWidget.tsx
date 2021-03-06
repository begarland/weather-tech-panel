import * as React from 'react'
import { useSelector } from 'react-redux'
import { IAlert } from '../../../apis/responseInterfaces'
import { IRootReducer } from '../../../redux/reducers'
import AlertBody from '../AlertBody/AlertBody'
import Spinner from '../Spinner/Spinner'
import Widget from '../Widget/Widget'

interface IAlertsWidget {}

const AlertsWidget: React.FC<IAlertsWidget> = ({}) => {
    const [alertsData, setAlertsData] = React.useState<IAlert[] | null>(null)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [showError, setShowError] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string>(null)

    const { zipCode, units, currentWeatherAndForecastDataByLatLon } =
        useSelector((state: IRootReducer) => state.appState)
    const alerts = currentWeatherAndForecastDataByLatLon?.alerts

    React.useLayoutEffect(() => {
        setShowError(false)
        setLoading(true)
    }, [zipCode, alerts, currentWeatherAndForecastDataByLatLon, units])

    React.useEffect(() => {
        setLoading(true)

        if (alerts) {
            setLoading(false)
            setAlertsData(alerts)
        } else if (
            currentWeatherAndForecastDataByLatLon &&
            Object.keys(currentWeatherAndForecastDataByLatLon)?.length &&
            !alerts
        ) {
            setAlertsData(alerts)
            setLoading(false)
        } else {
            setShowError(true)
            setError('Please input a zipcode')
        }
    }, [zipCode, currentWeatherAndForecastDataByLatLon, alerts, units])

    return (
        <Widget title='Alerts'>
            {showError && <span className='error-message'>{error}</span>}
            {!showError && (
                <>
                    {loading && <Spinner />}
                    {!loading && (
                        <>
                            {!alertsData && (
                                <span className='message'>
                                    No current alerts
                                </span>
                            )}
                            {alertsData && (
                                <>
                                    {alertsData.map((alert, index) => (
                                        <AlertBody alert={alert} key={index} />
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </Widget>
    )
}

export default AlertsWidget
