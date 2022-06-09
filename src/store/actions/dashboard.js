import axios from 'axios';
import { api } from '../../config';
import {GET_DASH} from './types';
import { getHeaders } from './localStorage';
import errorHandling from './errorHandling';

export const getDash = () => {
    return function (dispatch) {
        // console.log(api + `/producers`);
        axios.get(api + `/dashboard`, getHeaders())
        .then((response) => {
            console.log(response.data);
            dispatch({type: GET_DASH, payload: response.data});
        })
        .catch(errorHandling)
    }
}





