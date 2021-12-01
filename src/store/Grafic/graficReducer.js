import { UPDATE_GRAFIC, UPDATE_REFAREALEFT, UPDATE_REFAREARIGHT, UPDATE_REFAREAS, UPDATE_DATA } from "./constants"

const defaulteState = {
    data: [],
    left: 'dataMin',
    right: 'dataMax',
    refAreaLeft: '',
    refAreaRight: '',
    top: 'dataMax+500',
    bottom: 0,
}

export const graficReducer = (state = defaulteState, action) => {
    switch (action.type) {
        case UPDATE_GRAFIC:
            return { ...state, ...action.payload }

        case UPDATE_REFAREAS:
            return { ...state, refAreaLeft: action.payload.refAreaLeft, refAreaRight: action.payload.refAreaRight }

        case UPDATE_REFAREALEFT:
            return { ...state, refAreaLeft: action.payload }

        case UPDATE_REFAREARIGHT:
            return { ...state, refAreaRight: action.payload }

        case UPDATE_DATA:
            return { ...state, data: action.payload }

        default:
            return state;
    }
}
