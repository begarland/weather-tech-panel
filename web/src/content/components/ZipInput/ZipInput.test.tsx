import * as React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import * as redux from 'react-redux'

import { Provider, useDispatch } from 'react-redux'
import store from '../../../redux/store/store'

import ZipInput from './ZipInput'
import { CHANGE_ZIPCODE } from '../../../redux/actions/actionTypes'

const setup = (overrides?) => {
    const props = {
        ...overrides,
    }

    return render(
        <Provider store={store as any}>
            <ZipInput {...props} />
        </Provider>
    )
}

describe('ZipInput', () => {
    test('renders an input and a button, clicking the button dispatches CHANGE_ZIPCODE with zipcode', async () => {
        setup()

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn)

        const zipInput = screen.getByTestId('zip-input')
        expect(zipInput).toBeInTheDocument()

        const button = screen.getByText(/fetch/i)
        expect(button).toBeInTheDocument()

        fireEvent.change(zipInput, { target: { value: 80550 } })
        fireEvent.click(button)
        expect(mockDispatchFn).toHaveBeenCalledWith({
            type: CHANGE_ZIPCODE,
            zipCode: 80550,
        })
    })
})
