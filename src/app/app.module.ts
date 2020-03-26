import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from "./app.routing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from './_guards/index';
import {
  HomeComponent, LoginComponent, RegisterComponent, DashboardComponent,
  AddUserComponent, UpdateProfileComponent
} from './_forms/index';
import { ModalComponent } from './_shared/index';

import { AppComponent } from './app.component';
import { AuthenticationService, AlertService, UserService, SearchuserService, PagerService, AuthService, LoaderService } from './_services/index';
import { HeaderComponent, FooterComponent, SidebarComponent } from './_layout/index';
import { AlertComponent } from './_directives/index';
import { AppConfig } from './app.config';
import { AvatarpipePipe } from './_pipes/avatarpipe.pipe';
import { TokenInterceptor, UnAutherizedInterceptor, LoaderInterceptor } from './_interceptors/index';
import { LoadingBarModule } from '@ngx-loading-bar/core';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
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
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoadingBarModule
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
