import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, Rol } from '../../models';
import { UserService, AuthenticationService, RolService } from '../../services'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User;
  rolesAll: Rol[];
  editForm: FormGroup;
  submitted: boolean = false;

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
      name: ['', Validators.required],
      nickName: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['', Validators.required]
    });
  }

  onSubmit(){
    this.submitted = true;
    if(this.editForm.valid){
      this.userService.save(this.editForm.value)
      .subscribe( data => {
        this.router.navigate(['user']);
      });
    }
  }

  get f() { return this.editForm.controls; }

}
