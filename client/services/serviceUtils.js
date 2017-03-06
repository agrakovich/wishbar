export function getAuthHeader() {
    return {'AUTHORIZATION': `Bearer ${localStorage.jwt}`};
}

export function getDefaultHeaders() {
    return {
        'Content-Type': 'application/json',
        'AUTHORIZATION': `Bearer ${localStorage.jwt}`
    };
}


export function fetchRequest(request) {
    return fetch(request).then(response => response.json().then(data => ({ data, response })))
        .then(({ data, response }) => {
            if (!response.ok) {
                return Promise.reject(data)
            }
            return data;
        }).catch(error => {
            return error;
        });
}