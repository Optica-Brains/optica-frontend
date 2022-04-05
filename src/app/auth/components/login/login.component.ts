import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email!:String;

  public password!:String;

  public error:String = "";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public handleLogin():void{
    if (!this.email || !this.password) {
      this.error = "Please fill in all the fields"
    }

    this.authService.login(this.email,this.password)

  }

}
