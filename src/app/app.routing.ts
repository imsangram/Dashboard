import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent, LoginComponent, RegisterComponent, DashboardComponent, AddUserComponent, UpdateProfileComponent } from './_forms/index';

import { AuthGuard } from './_guards/index';


const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard], pathMatch: 'full', data: { title: 'My Home' } },
    { path: 'home', component: HomeComponent, data: { title: 'Home' }, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, data: { title: 'My Dashboard' }, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, data: { title: 'Login' } },
    { path: 'register', component: RegisterComponent, data: { title: 'Sign up' } },
    { path: 'adduser', component: AddUserComponent, canActivate: [AuthGuard], data: { title: 'New User' } },
    { path: 'updateprofile', component: UpdateProfileComponent, canActivate: [AuthGuard], data: { title: 'Update profile' } },

    { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }