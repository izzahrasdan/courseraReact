import { DISHES } from '../shared/dishes';

//in implementing Reducer func,
//it takes state and action as two parameters
export const Dishes = (state = DISHES, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
