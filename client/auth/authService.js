import config from '../config';

class AuthService {
    static login(credentials) {
        const request = new Request(`${config.apiUrl}/api/signup`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(credentials)
        });


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

    static isLoggedIn() {
        return !!localStorage.jwt;
    }

    static logOut() {
        localStorage.removeItem('jwt');
    }
}

export default AuthService;