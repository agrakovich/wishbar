import config from '../config';
import * as serviceUtils from './serviceUtils';

class WishService {
    static getWishCategories() {
        const request = new Request(`${config.apiUrl}/api/wishcategory`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        return serviceUtils.fetchRequest(request);
    }
    static getWishTypes() {
        const request = new Request(`${config.apiUrl}/api/wishtype`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        return serviceUtils.fetchRequest(request);
    }
    static getWishOrders() {
        const request = new Request(`${config.apiUrl}/api/wishorders`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        return serviceUtils.fetchRequest(request);
    }

    static addWishCategory(wishCategory) {

        const request = new Request(`${config.apiUrl}/api/wishcategory`, {
            method: 'POST',
            headers: serviceUtils.getDefaultHeaders(),
            body: JSON.stringify(wishCategory)
        });

        return serviceUtils.fetchRequest(request);
    }
    static addWishType(wishType) {

        const request = new Request(`${config.apiUrl}/api/wishtype`, {
            method: 'POST',
            headers: serviceUtils.getDefaultHeaders(),
            body: JSON.stringify(wishType)
        });

        return serviceUtils.fetchRequest(request);
    }

    static removeWishCategory(id) {

        const request = new Request(`${config.apiUrl}/api/wishcategory?id=${id}`, {
            method: 'DELETE',
            headers: serviceUtils.getAuthHeader()
        });

        return serviceUtils.fetchRequest(request);
    }
    static removeWishType(id) {

        const request = new Request(`${config.apiUrl}/api/wishtype?id=${id}`, {
            method: 'DELETE',
            headers: serviceUtils.getDefaultHeaders(),
            body: {id: id}
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