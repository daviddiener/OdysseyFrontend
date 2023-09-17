import { Component, OnInit } from '@angular/core'
import { UserService } from '../services/user.service'
import { User } from '../_models/user'

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  details: User;

  constructor (private auth: UserService) {}

  ngOnInit () {
    this.auth.profile().subscribe(user => {
      this.details = user
    },
    (err: Error) => {
      alert(err.message)
    })
  }
}
