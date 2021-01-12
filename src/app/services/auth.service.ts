import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../app.model';
import { setHeaders } from '../shared/header';



@Injectable()
export class AuthService {

    private url = 'http://localhost:11090/';

    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {

    }

    get isLoggedIn() {
        const user = localStorage.getItem('currentUser');
        this.loggedIn.next(user != null);

        return this.loggedIn;
    }

    setLoggedIn(bool: boolean) {
        this.loggedIn.next(bool);
    }

    getJWT(credentials: Credentials) {
        const me = this;

        return this.http
            .post<any>(
                this.url + 'login',
                credentials,
                {
                    headers: setHeaders(),
                    observe: 'body'
                });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.setLoggedIn(false);
    }
}
