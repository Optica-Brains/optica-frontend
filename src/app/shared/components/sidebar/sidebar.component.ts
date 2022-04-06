import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  menuItems = [
    {
      title: "Dashboard",
      icon: "dashboard",
      url: "/"
    },
    {
      title: "Orders",
      icon: "star_outline",
      url: "/orders"
    },
    {
      title: "Trips",
      icon: "pedal_bike",
      url: "/trips"
    },
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  currentUrl(url: String) {
    console.log();
    
    return this.router.url === url
  }

}
