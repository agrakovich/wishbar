import config from '../config';
import * as serviceUtils from './serviceUtils';

class WishService {
    static getWishTypes(credentials) {
        const request = new Request(`${config.apiUrl}/api/wishtype`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        return serviceUtils.fetchRequest(request);
    }

    static makeOrder(order) {

        const request = new Request(`${config.apiUrl}/api/wish`, {
            method: 'POST',
            headers: serviceUtils.getDefaultHeaders(),
            body: JSON.stringify(order)
        });

        return serviceUtils.fetchRequest(request);
    }
}

export default WishService;