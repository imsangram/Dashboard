import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from '../_services/index';
import { LoadingBarService } from '@ngx-loading-bar/core';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(public loaderService: LoaderService,
        public loadingBarService: LoadingBarService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        this.loadingBarService.start();
        return next.handle(req).pipe(
            finalize(() => {
                this.loaderService.hide();
                this.loadingBarService.stop();
            })
        );
    }
}