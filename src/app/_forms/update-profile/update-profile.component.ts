import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_services/alert.service';
import { UserService } from '../../_services/user.service';
import { FormGroup, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { User } from '../../_models';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html'
})
export class UpdateProfileComponent implements OnInit {
  user: User;
  constructor(
    private alertService: AlertService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.user = new User();
    this.populateUserDetails();
  }

  populateUserDetails() {
    const userObj = JSON.parse(localStorage.getItem('currentUser'));
    const obj = JSON.parse(atob(userObj.token.split('.')[1]));
    const id = obj._id;
    //this.user._id = id;

    this.userService.getById(id)
      .subscribe(user => {
        this.user = user;
        this.user.password = '';
      },
        (error) => {

        });
  }
  submitForm(myForm: NgForm) {
    if (myForm.value.firstName == '' || myForm.value.lastName == '' || myForm.value.dateOfBirth == '' || myForm.value.email == '') {
      this.alertService.error('All fields are mandatory');
      return false;
    }
    this.userService.update(this.user)
      .subscribe((data) => {
        this.alertService.success('Profile Updated Successfully');
      },
        (error) => {
          this.alertService.error('Data could not be saved');
        });
  }
}
