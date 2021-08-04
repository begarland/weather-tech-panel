import * as React from 'react'
import { useSelector } from 'react-redux'
import { IRootReducer } from '../../../redux/reducers'

interface ICityContainer {}

const CityContainer: React.FC<ICityContainer> = ({}) => {
    const [cityName, setCityName] = React.useState<string | null>(null)
    const { zipCode, units, currentWeatherDataByZipCode } = useSelector(
        (state: IRootReducer) => state.appState
    )
    const name = currentWeatherDataByZipCode?.name

    React.useEffect(() => {
        if (name) {
            setCityName(name)
        } else {
            setCityName(null)
        }
    }, [name])

    return (
        <>
            {cityName ? (
                <div data-testid='city-container' className='city-container'>
                    <span>{name}</span>
                </div>
            ) : null}
        </>
    )
}

export default CityContainer
