import { Branch } from './../../../models/branch.model';
import { User } from './../../../models/user.model';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public branch!: Branch;

  public user!: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getLoggedUserDetails()
    this.branch = this.user.branch
  }



}
