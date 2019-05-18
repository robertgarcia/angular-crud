import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
//import { first } from 'rxjs/operators';
import { User } from '../../models';
import { UserService, AuthenticationService } from '../../services'

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  userInfo: User;

  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService
  ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
          this.currentUser = user;
      });
  }

  ngOnInit() {
    //this.loadUser();
    this.currentUser;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  // private loadUser() {
  //   this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
  //     this.userInfo = user;
  //   });
  // }

}
