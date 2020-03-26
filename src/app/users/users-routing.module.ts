import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchUsersComponent } from './_forms/search-users/searchusers.component'
import { UsersComponent } from './users.component';
import { AuthGuard } from '../_guards/auth.guard';
import { UserProfileComponent } from './_forms/userprofile/userprofile.component';

const routes: Routes =
  [
    { path: '', component: UsersComponent, canActivate: [AuthGuard], data: { title: 'Users' } },
    { path: 'searchusers', component: SearchUsersComponent, canActivate: [AuthGuard], data: { title: 'Search Users' } },
    { path: ':username', component: UserProfileComponent, canActivate: [AuthGuard], data: { title: 'User Profile' } },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
