import { AuthService } from './../../../services/auth/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() open:boolean = true;

  @Output() sidebarCloseEvent = new EventEmitter();

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
      title: "Trips",
      icon: "pedal_bike",
      url: "/trips"
    },
  ]

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  currentUrl(url: String) {
    console.log();
    
    return this.router.url === url
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  closeSidebar(){
    this.sidebarCloseEvent.emit()
  }

}
