import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoadingBarModule } from '@ngx-loading-bar/core';
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from './app.component';
import { NavbarComponent, SidebarComponent, FooterComponent, FixedPluginComponent, ModalComponent, AlertComponent } from './shared/index';
import { HomeComponent, LoginComponent, RegisterComponent, DashboardComponent, AddUserComponent, UpdateProfileComponent } from './_forms/index';
import { AuthenticationService, AlertService, UserService, SearchuserService, PagerService, AuthService, LoaderService } from './_services/index';
import { AuthGuard } from './_guards/index';
import { AppConfig } from './app.config';
import { AvatarpipePipe } from './_pipes/avatarpipe.pipe';
import { TokenInterceptor, UnAutherizedInterceptor, LoaderInterceptor } from './_interceptors/index';
import { AppRoutingModule } from "./app.routing";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    FixedPluginComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    AddUserComponent,
    UpdateProfileComponent,
    ModalComponent,
    AvatarpipePipe
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    // RouterModule.forRoot(AppRoutes, {
    //   useHash: true
    // }),
    //SidebarModule,
    //NavbarModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    //FooterModule,
    //FixedPluginModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoadingBarModule,
    NgbModule
  ],
  providers: [AuthGuard, AppConfig, AuthenticationService, AlertService, UserService, SearchuserService, PagerService, AuthService, LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnAutherizedInterceptor,
      multi: true
    }
    ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
