import * as ActionTypes from './ActionTypes';

//in implementing Reducer func,
//it takes state and action as two parameters
export const Dishes = (state = {
    isLoading: true,
    errMess: null,
    dishes:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
            return{...state, isLoading: true, errMess: null, dishes: action.payload}
        case ActionTypes.DISHES_LOADING:
            return{...state, isLoading: true, errMess: null, dishes: []}
        case ActionTypes.DISHES_FAILED:
            return{...state, isLoading: true, errMess: action.payload, dishes: []}
        default:
            return state;
    }
};
