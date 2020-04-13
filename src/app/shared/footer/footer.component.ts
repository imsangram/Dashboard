import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent {
    currentDate: Date = new Date();
}
