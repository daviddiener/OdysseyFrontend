import { Component, OnInit } from '@angular/core'
import { RegionService } from '../services/region.service'
import { CharacterService } from '../services/character.service'
import { UserService } from '../services/user.service'
import { User } from '../_models/user'
import { Role } from '../_models/role'
import { faTrash, faUserTie, faUser, faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons/'

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  users: User[] = [];
  faTrash = faTrash;
  faUserTie = faUserTie;
  faUser = faUser;
  faArrowAltCircleUp = faArrowAltCircleUp;
  faArrowAltCircleDown = faArrowAltCircleDown;

  constructor (private characterService: CharacterService, private userService: UserService, private regionService: RegionService) { }

  ngOnInit () {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data
    },
    (err: Error) => {
      alert(err.message)
    })
  }

  deleteAllCharacters () {
    if (confirm('Are you sure to delete all characters?')) {
      this.characterService.deleteAllCharacters().subscribe(() => {},
        (err: Error) => {
          alert(err.message)
        })
    }
  }

  deleteAllRegions () {
    if (confirm('Are you sure to delete all regions?')) {
      this.regionService.deleteAllRegions().subscribe(() => {},
        (err: Error) => {
          alert(err.message)
        })
    }
  }

  batchCreateRegions (value: number) {
    for (let i = 0; i < value; ++i) {
      this.regionService.createRegion().subscribe(() => {},
        (err: Error) => {
          alert(err.message)
        })
    }
  }

  createRegion () {
    this.regionService.createRegion().subscribe(() => {},
      (err: Error) => {
        alert(err.message)
      })
  }

  deleteAllUsers () {
    if (confirm('Are you sure to delete all users?')) {
      this.userService.deleteAllUsers().subscribe(() => {
        this.ngOnInit()
      },
      (err: Error) => {
        alert(err.message)
      })
    }
  }

  deleteUser (value) {
    this.userService.deleteUser(value).subscribe(() => {
      this.userService.getAllUsers().subscribe((data: User[]) => {
        this.users = data
      },
      (err: Error) => {
        alert(err.message)
      })
    })
  }

  isAdmin (role) {
    if (role === Role.Admin) {
      return true
    } else {
      return false
    }
  }

  opUser (value) {
    const newUser: User = value
    newUser.role = Role.Admin
    this.userService.updateUser(newUser, newUser._id).subscribe(() => {
      this.userService.getAllUsers().subscribe((data: User[]) => {
        this.users = data
      },
      (err: Error) => {
        alert(err.message)
      })
    })
  }

  deopUser (value) {
    const newUser: User = value
    newUser.role = Role.Basic
    this.userService.updateUser(newUser, newUser._id).subscribe(() => {
      this.userService.getAllUsers().subscribe((data: User[]) => {
        this.users = data
      },
      (err: Error) => {
        alert(err.message)
      })
    })
  }
}
