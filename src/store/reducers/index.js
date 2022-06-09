import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import userReducer from './users_reducer';
import dashboadReducer from './dashboard_reducer';

const reducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    dash:dashboadReducer,
});

export default reducers;