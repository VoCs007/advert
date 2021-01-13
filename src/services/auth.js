import axios from 'axios';
import config from '../config/config';
export class Auth {

    static login(payload) {
        return axios({
            method: 'post',
            url: `${config.db}/login`,
            data: payload,
        })
    }

    static createUser(payload) {
        return axios({
            method: 'POST',
            url: `${config.db}/register`,
            data: payload
        })
    }

    static logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        localStorage.removeItem('userName');
        localStorage.removeItem('Role');
        localStorage.removeItem('profile');
    }
}