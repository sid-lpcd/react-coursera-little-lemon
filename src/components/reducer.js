// src/reducer.js

export const actionTypes = {
    UPDATE_TIMES: 'UPDATE_TIMES',
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

export const updateTimes = (date) => {
    console.log(date)
    const CurrentDate = new Date(date);
    console.log(CurrentDate.getDay())
    if(CurrentDate.getDay() === 1){
        return {
            type: actionTypes.UPDATE_TIMES,
            payload: [],
        };
    } else{
        // For now, we return the same available times if the date is not a Monday.
        return {
            type: actionTypes.UPDATE_TIMES,
            payload: initializeTimes()
        };
    }
    
};
export const timesReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_TIMES:
            return action.payload;
        default:
            return state;
    }
};
