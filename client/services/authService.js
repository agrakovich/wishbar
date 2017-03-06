import config from '../config';
import * as serviceUtils from './serviceUtils';

class AuthService {
    static login(credentials) {
        const request = new Request(`${config.apiUrl}/api/signup`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(credentials)
        });

        return serviceUtils.fetchRequest(request);
    }

    static isLoggedIn() {
        return !!localStorage.jwt;
    }

    static logOut() {
        localStorage.removeItem('jwt');
    }
}

export default AuthService;