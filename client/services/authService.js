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

    static loginAdmin(credentials) {
        const request = new Request(`${config.apiUrl}/api/admin/signin`, {
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

    static isAdmin() {
        return localStorage.role == 'admin';
    }

    static logOut() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('role');
    }
}

export default AuthService;