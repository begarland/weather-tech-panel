import * as React from 'react'
import { IAlert } from '../../../apis/responseInterfaces'
import AlertBody, { IAlertBody } from '../AlertBody/AlertBody'
import Widget from '../Widget/Widget'

interface IAlertsWidget {}

const AlertsWidget: React.FC<IAlertsWidget> = ({}) => {
    const [alerts, setAlerts] = React.useState<IAlert[] | null>(null)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [showError, setShowError] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string>(null)

    React.useEffect(() => {}, [])

    return (
        <Widget title='Alerts'>
            {!alerts && <span>No current alerts</span>}
            {alerts && (
                <>
                    {alerts.map((alert) => (
                        <AlertBody alert={alert} />
                    ))}
                </>
            )}
        </Widget>
    )
}

export default AlertsWidget
