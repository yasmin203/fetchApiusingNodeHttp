import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errLogin = ""
  loginForm = new FormGroup({
    email: new FormControl('new@admin.com', [Validators.required, Validators.email]),
    password: new FormControl('SSdd123456', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])
  })

  constructor(private _global: GlobalService, private toastr: ToastrService, private router: Router) {
    console.log("hello")
  }


  ngOnInit(): void {
  }


  get email() { return this.loginForm.get("email") }
  get password() { return this.loginForm.get("password") }


  login() {
    if (this.loginForm.valid) {
      this._global.loginUser(this.loginForm.value).subscribe(
        (data) => {
          localStorage.setItem('testToken', data.data.token)
          this._global.userData = data.data.userData
          console.log(data)
        },
        (e) => { console.log(e); this.errLogin = e.error.data },
        () => {
          this.errLogin = ""
          this._global.isAuthed = true
          this.toastr.success('Success!', ' user login!')
          if (this._global.userData.isAdmin) {
            console.log("test")
            this.router.navigate(["/admin"])
          }
          else {
            this.router.navigate(["/user"])

          }
        }
      )
    }
  }

}
