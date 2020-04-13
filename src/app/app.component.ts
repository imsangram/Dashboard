import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from "./_services/index";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NavbarComponent } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild(NavbarComponent) navChild: NavbarComponent;

  isLoggedIn$: Observable<boolean>;
  ngOnInit(): void {
    this.isLoggedIn$ = this.authenticationService.isSignedIn;
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        this.titleService.setTitle(event['title']);
        if (this && this.navChild) {
          this.navChild.title = event['title'];
        }
      });
  }

  isLoggedIn: boolean;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingBarService: LoadingBarService,
    private titleService: Title) {
  }
}
