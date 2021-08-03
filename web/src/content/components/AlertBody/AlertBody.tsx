import * as React from 'react'
import { IAlert } from '../../../apis/responseInterfaces'

export interface IAlertBody {
    alert: IAlert
}

const AlertBody: React.FC<IAlertBody> = ({}) => {
    return <>i am the alerts body</>
}

export default AlertBody
