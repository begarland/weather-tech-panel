import * as React from 'react'
import { degrees } from '../../ constants'

interface IDegreesFOrCLabel {
    units: 'imperial' | 'metric'
}

const DegreesFOrCLabel: React.FC<IDegreesFOrCLabel> = ({ units }) => {
    return (
        <>
            {degrees}
            {units === 'imperial' && <>F</>}
            {units === 'metric' && <>C</>}
        </>
    )
}

export default DegreesFOrCLabel
