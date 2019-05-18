import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, Rol } from '../../models';
import { UserService, AuthenticationService, RolService } from '../../services'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
  user: User;
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
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      nickName: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  onSubmit(){
    this.submitted = true;
    console.log(this.f);
    if(this.editForm.valid){
      
      this.userService.register(this.editForm.value)
      .subscribe( data => {
        this.router.navigate(['']);
      });
    }
  }

}
