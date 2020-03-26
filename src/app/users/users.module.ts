import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SearchUsersComponent } from './_forms/search-users/searchusers.component';
import { UserProfileComponent } from './_forms/userprofile/userprofile.component';


@NgModule({
  declarations: [UsersComponent, SearchUsersComponent, UserProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
