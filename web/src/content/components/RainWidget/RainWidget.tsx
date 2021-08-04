import * as React from 'react'
import RainBody from '../RainBody/RainBody'
import Widget from '../Widget/Widget'

interface IRainWidget {}

const RainWidget: React.FC<IRainWidget> = ({}) => {
    return (
        <Widget title="Today's Rainfall">
            <RainBody />
        </Widget>
    )
}

export default RainWidget
