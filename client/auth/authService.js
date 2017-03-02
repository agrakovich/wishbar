class AuthService {
    static login(credentials) {
        debugger;
        const request = new Request(`${process.env.API_HOST}/login`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({auth: credentials})
        });


        return fetch(request).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static isLoggedIn() {
        return !!sessionStorage.jwt;
    }

    static logOut() {
        sessionStorage.removeItem('jwt');
    }
}

export default AuthService;