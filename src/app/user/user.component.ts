import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute,
              private usersService: UsersService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      // data package function
      (params: Params) => {
        this.id = +params['id'];
      },
      // error function
      // but this will never get called for a params observable,
      // because it never fails.
      () => {

      },
      // completion function
      // but this will never get called for a params observable,
      // because it never completes
      () => {

      });
  }

    onActivate() {
      this.usersService.userActivated.next(this.id);
    }

}
