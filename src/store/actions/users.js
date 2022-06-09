import axios from 'axios';
import {GET_USERS,GET_USER} from './types';
import { api } from '../../config';
import { getHeaders } from './localStorage';
import errorHandling from './errorHandling';

export const getUsers = () => {
    return function (dispatch) {
        // console.log(api + `/star/page=${pageAtual}`);
        axios.get(api + `/producers`, getHeaders())
        .then((response) => {
            dispatch({type: GET_USERS, payload: response.data});
        })
        .catch(errorHandling)
    }
}
    export const getViewUser = (id) => {
        return function (dispatch) {
            axios.get(api + `/producers/${id}`, getHeaders())
                .then((response) => {
                    dispatch({ type: GET_USER, payload: response.data });
                })
                .catch(errorHandling)
        }
    }
export const postUser = (cadUser, callback) => {
    return function (dispatch){
        console.log(cadUser);
        axios.post(api + `/producers`, cadUser)
        .then((response) => {
            callback({erro: response.data});
        })
        .catch((err) => callback(errorHandling(err)));
    }
}

export const putUser = (dadosUser, callback) => {
    return function (dispatch) {
        axios.put(api + `/producers`, dadosUser, getHeaders())
            .then((response) => {
                callback({ erro: response.data });
            })
            .catch((err) => callback(errorHandling(err)));
    }
}