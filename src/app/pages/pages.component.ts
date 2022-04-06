import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private router: Router) { 
    const navigation: any = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {data: string};
    console.log(navigation);
 }

  ngOnInit(): void {
  }

}
