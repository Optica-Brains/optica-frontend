import { Role } from './../../../models/role.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public userId: any;

  public fullname!: any;
  public email!: any;
  public password!: string;
  public role!: string;

  public Role = Role



  constructor( private http : HttpClient) {}

  users:any


  ngOnInit(): void {
    // get all users
    this.users = this.http.get(`${environment.apiUrl}/api/users/`).subscribe(
      data => this.users = data   
    )    
  }

  userGroups(groups:[]){
    return groups.map((group)=> this.Role[group]).join(' , ')
  }

  createUser(){
      var data = {
        full_name : this.fullname,
        email : this.email,
        password : this.password,
        groups : [this.role]
      }
      this.http.post(`${environment.apiUrl}/api/users/`, data).subscribe((res) => console.log(res)); 
  }
}
