import * as React from 'react'
import { degrees, imperial, metric } from '../../ constants'

interface IDegreesFOrCLabel {
    units: 'imperial' | 'metric'
}

const DegreesFOrCLabel: React.FC<IDegreesFOrCLabel> = ({ units }) => {
    return (
        <>
            {degrees}
            {units === imperial && <>F</>}
            {units === metric && <>C</>}
        </>
    )
}

export default DegreesFOrCLabel
