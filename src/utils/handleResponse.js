import { authenticationService } from './services';

export function handleResponse(response, callback) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        let error;
        if (!response.ok) {
            if ([403, 500].indexOf(response.status) !== -1) {
                authenticationService.logout();
                window.location.reload(true);
                error = (data && data.message) || response.statusText;
            } else if(response.status === 401){
                error = (data && data.message) || 'Nieprawidłowe dane logowania';
            }
            return Promise.reject(error);
        }

        return data;
    });
}
