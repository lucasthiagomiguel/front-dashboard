import axios from 'axios';
import { LOGIN_USER, LOGOUT_USER } from './types';
import { api } from '../../config';
import { saveToke, getToken, getHeaders, cleanToken } from './localStorage';
import errorHandling from './errorHandling';


export const handleLogin = ({ email, senha }, callback) => {
    return function (dispatch) {
        axios.post(api + '/login', { email, senha })
            .then((response) => {
                //console.log(response.data);
                saveToke(response.data);
                dispatch({ type: LOGIN_USER, payload: response.data });
            })
            .catch((err) => callback(errorHandling(err)))
    }
}



export const handleLogout = () => {
    cleanToken();
    return { type: LOGOUT_USER };
}