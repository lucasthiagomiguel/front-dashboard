import { GET_USERS,GET_USER } from '../actions/types';

export default (state = {}, actions) => {
    switch (actions.type) {
        case GET_USERS:
            
            return {
                ...state,
                users: actions.payload
            }
        case GET_USER:
            console.log(actions.payload);
            return {
                ...state,
                userDetails: actions.payload
            }
        default:
            return state;
    }
}