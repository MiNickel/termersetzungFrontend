import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: boolean;
  username = '';
  type = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const me = this;
    this.authService.isLoggedIn.subscribe(newValue => {
      me.isLoggedIn$ = newValue;
      if (this.isLoggedIn$ === true) {
        const currentUser = localStorage.getItem('currentUser');
        const jsonObject = JSON.parse(currentUser);
        this.username = jsonObject.fullname;
        this.type = jsonObject.type;
      }
    });

  }

  onLogout() {
    this.username = '';
    this.authService.logout();
  }

}
