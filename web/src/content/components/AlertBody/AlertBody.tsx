import * as React from 'react'
import { IAlert } from '../../../apis/responseInterfaces'

export interface IAlertBody {
    alert: IAlert
}

const AlertBody: React.FC<IAlertBody> = ({ alert }) => {
    return <>{alert.description}</>
}

export default AlertBody
