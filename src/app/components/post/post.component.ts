import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User, Post, Access } from '../../models';
import { PostService, AuthenticationService } from '../../services'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  posts: Post[] = [];
  constructor(
    private authenticationService: AuthenticationService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
   }

  ngOnInit() {
    this.loadPost();
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

  private loadPost() {
    this.postService.getAll().pipe(first()).subscribe(Data => {
      this.posts = Data;
    });
  }

}
