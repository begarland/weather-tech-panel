import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import AlertBody from './AlertBody'

const setup = (overrides?) => {
    const props = {
        ...overrides,
    }

    return render(<AlertBody {...props} />)
}

describe('AlertBody', () => {
    test('renders as expected', async () => {
        setup({
            alert: {
                sender_name: 'NWS SanDiego (Southwestern California)',
                event: 'Heat Advisory',
                start: 1628021040,
                end: 1628218800,
                description:
                    '...HEAT ADVISORY NOW IN EFFECT UNTIL 8 PM PDT THURSDAY...\n* WHAT...High temperatures in the mid-90s to 105 below 6000 feet\nexpected.\n* WHERE...Riverside County Mountains, San Bernardino County\nMountains and San Diego County Mountains below 6000 feet.\n* WHEN...Until 8 PM PDT Thursday.\n* IMPACTS...Hot temperatures may cause heat illnesses to occur.',
                tags: ['Extreme temperature value'],
            },
        })
    })
})
