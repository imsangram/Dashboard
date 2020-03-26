import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from "./_services/index";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from './_layout/header.component';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    @ViewChild(HeaderComponent) child: HeaderComponent;

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
                if (this && this.child)
                    this.child.title = event['title'];
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
