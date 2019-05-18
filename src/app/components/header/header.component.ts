import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services';
import { User, Access } from '../../models';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
    ){
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.roles.nameRol === Access.Admin;
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
