import constants from '../constants/constants';

export const messages = (state = [], action) => {
    switch (action.type) {
        case constants.READ_MESSAGE:
            return state.filter(m => m.id !== action.id);
        default:
            return state;
    }
};

export const statistics = (state = {}, action) => {
    switch (action.type) {
        case constants.CHANGE_PERIOD:
            return {
                ...state,
                selectedPeriod : action.period
            }
        default:
            return state;
    }
}
