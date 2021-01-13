import axios from 'axios';
import config from '../config/config';
import { Auth } from '../services/auth';
import router from '../router/index';

export class Categories {

    static getCategories() {
        return axios({
            method: 'GET',
            url: `${config.db}/categories`
        })
    }
}