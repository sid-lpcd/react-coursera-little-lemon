// src/reducer.js

export const actionTypes = {
    UPDATE_TIMES: 'UPDATE_TIMES',
    INITIALIZE_TIMES: 'INITIALIZE_TIMES',
};

export const initializeTimes = () => {
    // Set initial available times (could be fetched from an API or set statically)
    return [
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00"
    ];
};

export const updateTimes = (times) => {
    return {
        type: actionTypes.UPDATE_TIMES,
        payload: times,
    };
};
export const timesReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_TIMES:
            return action.payload;
        case actionTypes.INITIALIZE_TIMES:
            return initializeTimes();
        default:
            return state;
    }
};
