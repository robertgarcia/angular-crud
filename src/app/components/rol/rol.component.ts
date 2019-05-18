import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User, Rol } from '../../models';
import { RolService, AuthenticationService } from '../../services'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  roles: Rol[] = [];
  constructor(
    private authenticationService: AuthenticationService,
    private rolService: RolService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
    this.currentUser = user;
  });
   }

  ngOnInit() {
    this.loadRoles();
  }

  private loadRoles() {
    this.rolService.getAll().pipe(first()).subscribe(rolData => {
      this.roles = rolData;
    });
  }

}

