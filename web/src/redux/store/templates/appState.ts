import { imperial } from '../../../content/ constants'

export const appState: IAppState = {
    zipCode: null,
    units: imperial,
}

export interface IAppState {
    zipCode: number | null
    units: 'imperial' | 'metric'
}
