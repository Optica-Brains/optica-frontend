import { User } from './../../../models/user.model';
import { Role } from './../../../models/role.model';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() open: boolean = true;

  @Output() sidebarCloseEvent = new EventEmitter();

  user!:User;

  Role = Role;

  menuItems = [
    {
      title: "Dashboard",
      icon: "dashboard",
      url: "/"
    },
    {
      title: "Batches",
      icon: "star_outline",
      url: "/batches"
    },
    {
      title: "Users",
      icon: "group",
      url: "/users",
      manager: true
    },
  ]

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getLoggedUserDetails()
  }

  currentUrl(url: String) {
    return this.router.url === url
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  closeSidebar() {
    this.sidebarCloseEvent.emit()
  }

}
