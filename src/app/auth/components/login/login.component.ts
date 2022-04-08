import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email!: string;

  public password!: string;

  public error: string = "";

  public loading = false;

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
    if (this.authService.isUserAuthenticated()) {
      this.router.navigate(['/'], {state: {message: 'Sign in was successful'}});
    }
  }

  ngOnInit(): void { }

  public handleLogin(): void {
    this.error = ''
    this.loading = true;

    if (!this.email || !this.password) {
      this.error = "Please fill in all the fields"
      this.loading = false
      return
    }

    this.authService.login(this.email, this.password)
      .pipe(catchError(error => {        
        this.error = error
        this.loading = false
        return of({})
      }))
      .subscribe(() => {
        this.loading = false;
        if(this.authService.isUserAuthenticated()){
          this.router.navigate(['/'])
        }
      })
  }


}
