import * as React from 'react'
import Toggle from 'react-toggle'
import { degrees, imperial, metric } from '../../constants'
import { useSelector, useDispatch } from 'react-redux'
import { IRootReducer } from '../../../redux/reducers'
import { CHANGE_UNITS } from '../../../redux/actions/actionTypes'

interface IFOrCToggle {}

const FOrCToggle: React.FC<IFOrCToggle> = ({}) => {
    const dispatch = useDispatch()
    const units = useSelector((state: IRootReducer) => state.appState.units)

    return (
        <div className='toggle-container'>
            <Toggle
                data-testid='toggle'
                defaultChecked={units === imperial}
                onChange={() =>
                    dispatch({
                        type: CHANGE_UNITS,
                        units: units === imperial ? metric : imperial,
                    })
                }
                icons={{
                    checked: <p className='toggle-label'>{degrees}F</p>,
                    unchecked: (
                        <p className='toggle-label c-label'>{degrees}C</p>
                    ),
                }}
            />
        </div>
    )
}

export default FOrCToggle
