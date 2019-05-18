import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RolComponent } from './components/rol/rol.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { CategoryComponent } from './components/category/category.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AuthGuard } from './components/guards/guards.component';
import { Access } from './models/'
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: [Access.Admin] } },
  { path: 'login', component: LoginComponent },
  { path: 'rol', component: RolComponent, canActivate: [AuthGuard], data: { roles: [Access.Admin] } },
  { path: 'post', component: PostComponent, canActivate: [AuthGuard], data: { roles: [Access.Admin, Access.Editor, Access.Viewer] } },
  { path: 'category', component: CategoryComponent, canActivate: [AuthGuard], data: { roles: [Access.Admin, Access.Editor, Access.Viewer] } },
  { path: 'register', component: RegistroComponent },
  { path: 'edit-user', component: EditUserComponent, canActivate: [AuthGuard], data: { roles: [Access.Admin] } },
  { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard], data: { roles: [Access.Admin] } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
