import * as React from 'react'

interface IWidget {
    title: string
    children: React.ReactNode
}

const Widget: React.FC<IWidget> = ({ title, children }) => {
    return (
        <div className='widget'>
            <h2>{title}</h2>
            <div className='children-container'>{children}</div>
        </div>
    )
}

export default Widget
