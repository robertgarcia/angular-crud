import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, Rol } from '../../models';
import { UserService, AuthenticationService, RolService } from '../../services'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId: number;
  userRol: Rol;
  editForm: FormGroup;
  submitted: boolean = false;
  user: User;
  rolesAll: Rol[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private rolService: RolService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.rolService.getAll().subscribe((data: Rol[]) =>{
      this.rolesAll = data;
    });

    this.editForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      nickName: ['', Validators.required],
      password : ['', Validators.required],
      roles: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      let id = params['id'];
      if (!id) {
        this.router.navigate(['']);
      }
      this.userId = id;
      this.userService.getById(id).subscribe((user: User) => {
        this.editForm.patchValue(user);
        this.user = user;
        this.userRol = user.roles;
      });
    });
  }

  onSubmit(){
    this.submitted = true;
    if(this.editForm.valid){
      this.userService.update(this.editForm.value)
      .subscribe( data => {
        this.router.navigate(['user']);
      });
    }
  }

  get f() { return this.editForm.controls; }

}
