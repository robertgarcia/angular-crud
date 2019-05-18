import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User, Category, Access } from '../../models';
import { CategoryService, AuthenticationService } from '../../services'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;
  categories: Category[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private categoryService: CategoryService,
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

  get isViewer() {
    var go: Boolean;
    if(this.currentUser){
      switch(this.currentUser.roles.nameRol) {
        case Access.Viewer :
          go = false;
          break;
          default:
            go = true;
      }
    }
    return go;
  }

  private loadUsers() {
    this.categoryService.getAll().pipe(first()).subscribe(Data => {
      this.categories = Data;
    });
  }

}
