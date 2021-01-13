import axios from 'axios';
import config from '../config/config';

export class Users {
    static getUser(id) {
        return axios({
            method: 'GET',
            url: `${config.db}/profile/${id}`,
            headers: {
                Authorization: localStorage.getItem('token'),
            }
        })
    }
    static updateUser(req) {
        return axios({
            method: 'PUT',
            url: `${config.db}/profile/${req.id}`,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: localStorage.getItem('token'),
            },
            data: req.formData
        })
    }
}