import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User, Rol } from '../../models';
import { UserService, AuthenticationService } from '../../services'
import { Router, ActivatedRoute } from '@angular/router';
import { locateDirectiveOrProvider } from '@angular/core/src/render3/di';
import { getLocaleEraNames } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private router: Router,
      private route: ActivatedRoute
  ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
          this.currentUser = user;
      });
  }

  ngOnInit() {
    this.loadUsers();
  }

  gOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  editUser(id:number){
    this.router.navigate(['/edit-user'], { queryParams: { id: id } });
  }

  addUser(id:number){
    this.router.navigate(['/add-user']);
  }
  
  deleteUser(id:number){
    this.userService.delete(id).pipe(first()).subscribe( () =>{
      const userIndex = this.users.findIndex(user => user.id === id);
      this.users.splice(userIndex, 1);
    });
  }

  private loadUsers() {
    this.userService.getAll().pipe(first()).subscribe(userData => {
      this.users = userData;
    });
  }
}
