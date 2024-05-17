export function get({ url }) {
    return fetch(url, {
        method: 'GET',
        body
    });
};

export function post({ url, body }) {
    return fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'POST',
        body
    });
};

export function put({ url, body }) {
    return fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'PUT',
        body
    });
};