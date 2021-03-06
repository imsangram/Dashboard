import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SearchuserService } from '../../../_services/searchuser.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html'
})
export class UserProfileComponent implements OnInit {
  currentUser: any;
  constructor(private activatedRoute: ActivatedRoute, private searchUserService: SearchuserService) { }
  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      let name = params['username'];
      this.currentUser = this.searchUserService.getUserInfo(name).subscribe(x => { this.currentUser = x.json() });
    });
  }

}
