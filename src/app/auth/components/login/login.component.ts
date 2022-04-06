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

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void { }

  public handleLogin(): void {
    if (!this.email || !this.password) {
      this.error = "Please fill in all the fields"
      return
    }

    this.authService.login(this.email, this.password)
      .pipe(catchError(error => {        
        this.error = error
        return of({})
      }))
      .subscribe(token => {
        console.log(token);
      })
  }


}
