import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Credentials } from '../app.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  error: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    const credentials = new Credentials(this.username, this.password);
    this.authService.getJWT(credentials).subscribe(result => {
      localStorage.setItem('currentUser', JSON.stringify(result));
      this.authService.setLoggedIn(true);
      this.router.navigate(['/']);
    });
  }

}
