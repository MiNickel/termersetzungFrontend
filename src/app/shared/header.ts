import { HttpHeaders } from '@angular/common/http';

export function setHeaders() {
    let customHeaders: HttpHeaders;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.token) {
        customHeaders = new HttpHeaders()
            .set('Accept', 'application/json')
            .append('Content-Type', 'application/json')
            .append('Authorization', currentUser.token);
    }
    return customHeaders;
}
