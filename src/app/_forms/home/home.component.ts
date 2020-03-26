import { Component, OnInit } from '@angular/core';

import { User } from '../../_models/index';
import { UserService, AlertService } from '../../_services/index';

@Component({
    templateUrl: 'home.component.html',
    styles: ['img {  border-radius: 50%; }']
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService, private alertService: AlertService) {
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .subscribe(() => {
                this.loadAllUsers()
            });
    }

    private loadAllUsers() {
        this.userService.getAll()
            .subscribe((users: User[]) => {
                this.users = users;
            });
    }
}