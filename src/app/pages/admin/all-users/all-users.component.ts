import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  x = true
  changeView() { this.x = !this.x }
  searchKey = ""

  @Input()
  showMePartially: boolean = true;


  showVar: boolean = false;

  toggleChild() {
    this.showVar = !this.showVar;
  }

  @Input()
  showMePartially2: boolean = true;

  change() {
    if (this.showMePartially2) {
      this.showMePartially = false
    }
    else {
      this.showMePartially = true

    }
  }

  usersData: any = {}
  mainData = this.usersData;

  constructor(private _global: GlobalService) { }

  ngOnInit(): void {
    this._global.showAllUsers().subscribe(
      (user) => {

        this.usersData = user.user
        console.log(user)
        // this.userData.image = "1.jpg"
      }
    )
  }

  filterData() {
    this.usersData = this.usersData.filter((item: { name: string | string[]; }) => item.name.includes(this.searchKey))
  }

  // admin adding new user



  file: any
  onChangeFile(event: any) { this.file = event.target.files[0] }
  upimg() {
    const myData = new FormData()
    myData.append("img", this.file, this.file.name)

    this._global.addImg(myData).subscribe(data => { console.log(data) })
  }
}
