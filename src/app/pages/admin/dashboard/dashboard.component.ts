import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showVar: boolean = false;

  toggleChild() {
    this.showVar = !this.showVar;
  }

  @Input()
  showMePartially2: boolean = true;


  constructor(public _global: GlobalService, public _router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    console.log('test logout')
    this._global.logout().subscribe(
      (data) => { },
      (e) => { },
      () => {
        localStorage.removeItem('testToken')
        this._global.isAuthed = false
        this._global.userData = null
        this._router.navigateByUrl('/')
      }
    )

  }
}
