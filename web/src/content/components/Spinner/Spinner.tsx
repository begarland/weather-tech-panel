import * as React from 'react'

interface ISpinner {}

// Source: https://loading.io/css/
const Spinner: React.FC<ISpinner> = ({}) => {
    return (
        <div className='lds-roller' data-testid='spinner-component'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Spinner
