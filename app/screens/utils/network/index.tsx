import { getStorage } from '../storage';

export function get({ url, authorized }: any) {
    return fetch(url, {
        method: 'GET',
        headers: {
            ...(authorized && {
                Authorization: `Bearer ${getStorage('token')}`
            })
        }
    });
};

export function post({ url, body, authorized }: any) {
    return fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...(authorized && {
                Authorization: `Bearer ${getStorage('token')}`
            })
        },
        method: 'POST',
        body
    });
};

export function put({ url, body, authorized }: any) {
    return fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...(authorized && {
                Authorization: `Bearer ${getStorage('token')}`
            })
        },
        method: 'PUT',
        body
    });
};

// ! TESTS