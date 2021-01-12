import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class ActivateGuardProfessor implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const currentUser = localStorage.getItem('currentUser');
        const jsonObject = JSON.parse(currentUser);
        const type: string = jsonObject.type;
        if (type === 'professors') {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
