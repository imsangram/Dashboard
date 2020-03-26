import { Component, AfterViewInit, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { LoaderService } from '../_services';
import { BehaviorSubject, Observable, observable } from 'rxjs';

@Component({
    selector: 'my-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements AfterViewChecked {
    constructor(private loaderService: LoaderService,
        private cdr: ChangeDetectorRef) {

    }
    title: string = 'Dashboard';
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    clicked(event: any) {
        if (event.currentTarget.classList.contains('open')) {
            event.currentTarget.classList.remove('open')
        }
        else {
            event.currentTarget.classList.add('open')
        }
        return false;
    }

    ngAfterViewChecked() {
        this.loaderService.isLoading.subscribe((result) => {
            this.isLoading$.next(result);
            this.cdr.detectChanges();
        });
    }
}

