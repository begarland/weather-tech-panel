import * as React from 'react'
import { useDispatch } from 'react-redux'
import { CHANGE_ZIPCODE } from '../../../redux/actions/actionTypes'
import { isEnter } from '../../utils'

interface IZipInput {}

const ZipInput: React.FC<IZipInput> = ({}) => {
    const [zip, setZip] = React.useState<string>('')
    const dispatch = useDispatch()

    return (
        <div className='zip-input-container'>
            <input
                data-testid='zip-input'
                placeholder='Enter zipcode'
                type='number'
                value={zip}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setZip(e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent) => {
                    if (isEnter(e.key)) {
                        dispatch({ type: CHANGE_ZIPCODE, zipCode: Number(zip) })
                    }
                }}
            />
            <button
                onClick={() =>
                    dispatch({ type: CHANGE_ZIPCODE, zipCode: Number(zip) })
                }
            >
                Fetch
            </button>
        </div>
    )
}

export default ZipInput
