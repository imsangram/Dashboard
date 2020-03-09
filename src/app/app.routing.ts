import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent, LoginComponent, RegisterComponent, DashboardComponent, SearchUsersComponent, UserProfileComponent, AddUserComponent, UpdateProfileComponent } from './_forms/index';

import { AuthGuard } from './_guards/index';


const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard], pathMatch: 'full', data: { title: 'My Home' } },
    { path: 'home', component: HomeComponent, data: { title: 'Home' }, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, data: { title: 'My Dashboard' }, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'searchusers', component: SearchUsersComponent, canActivate: [AuthGuard] },
    { path: 'user/:username', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'adduser', component: AddUserComponent, canActivate: [AuthGuard] },
    { path: 'updateprofile', component: UpdateProfileComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }