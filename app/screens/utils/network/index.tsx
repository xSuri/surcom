export function get({ url }: any) {
    return fetch(url, {
        method: 'GET',
    });
};

export function post({ url, body }: any) {
    return fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'POST',
        body
    });
};

export function put({ url, body }: any) {
    return fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'PUT',
        body
    });
};