import axios from 'axios';
import config from '../config/config';

export class Advert {

    static getAdvert(id) {
        return axios({
            method: 'GET',
            url: `${config.db}/advert/${id}`,
        });
    };

    static deleteAdvert(payload) {
        return axios({
            method: 'DELETE',
            url: `${config.db}/deleteadvert`,
            headers: {
                Authorization: localStorage.getItem('token'),
            },
            data: payload,
        });
    };

    static updateAdvert(id, formData) {
        return axios({
            method: 'PUT',
            url: `${config.db}/modify/${id}`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: localStorage.getItem('token')
            }
        });
    }

    static getAdverts(category = '', page = 1) {
        return axios({
            method: 'get',
            url: `${config.db}/adverts/${page}/${category}`
        });
    };

    static getUserAdverts(id) {
        return axios({
            method: 'get',
            url: `${config.db}/adverts/user/${id}`,
        });
    };

    // static findAdverts(search) {
    //     return axios({
    //         method: 'GET',
    //         url: `${config.db}/search/${search}`
    //     });
    // };

    static createAdvert(formData) {
        return axios({
            method: 'POST',
            url: `${config.db}/createadvert`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: localStorage.getItem('token')
            }
        });
    };
}