import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public innerWidth!: any;

  public sidebarOpen: boolean = true;

  public sidebarHideWidth: number = 768;

  constructor(private router: Router) {
    const navigation: any = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { data: string };
    console.log(navigation);
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.sidebarCheckWidth()
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.sidebarCheckWidth()
  }

  public toggleSidebar(state=!this.sidebarOpen) {    
    this.sidebarOpen = state
  }

  sidebarCheckWidth(){
    this.toggleSidebar(this.innerWidth > this.sidebarHideWidth)
  }
}
