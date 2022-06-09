import { GET_DASH } from '../actions/types';

export default (state = {}, actions) => {
    switch (actions.type) {
        case GET_DASH:
            console.log(actions.payload);
            return {
                ...state,
                dashboard: actions.payload
            }
        default:
            return state;
    }
}