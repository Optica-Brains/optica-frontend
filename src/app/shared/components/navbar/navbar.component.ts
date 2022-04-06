import { Router } from '@angular/router';
import { Branch } from './../../../models/branch.model';
import { User } from './../../../models/user.model';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() openSidebarEvent = new EventEmitter();

  public branch!: Branch;

  public user!: User;

  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.user = this.authService.getLoggedUserDetails()
    this.branch = this.user.branch
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  openSidebar(){
    this.openSidebarEvent.emit()
  }

}
