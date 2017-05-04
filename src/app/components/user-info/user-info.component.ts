import { Component, OnInit, Input } from '@angular/core';
import { UserInfo } from '../../models/user-info.interface';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  @Input('data')
  data: UserInfo;
  constructor() { }

  ngOnInit() {
  }

}
