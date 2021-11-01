import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errRegister = ""
  registerForm = new FormGroup({
    email: new FormControl('abc@t.com', [Validators.email, Validators.required]),
    password: new FormControl('SSdd123456', [Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"), Validators.required]),
    name: new FormControl('jnjbhjbh', [Validators.required]),
    phone: new FormControl('01234567895', [Validators.required])


  })
  constructor(private _global: GlobalService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }
  get email() { return this.registerForm.get("email") }
  get password() { return this.registerForm.get("password") }
  get name() { return this.registerForm.get("name") }
  get phone() { return this.registerForm.get("phone") }

  onSubmit() {
    console.log('test')
    if (this.registerForm.valid) {
      console.log(this.registerForm.value)
      this._global.registerUser(this.registerForm.value).subscribe(
        (res) => { console.log(res) },
        (err) => {
          if (err.error.includes('email')) this.errRegister = "email used before"
        },
        () => {
          this.errRegister = ""
          this.registerForm.reset()
          this.toastr.success('Success!', 'registered!')
          setTimeout(() => {
            this.router.navigateByUrl('/user/login')
          }, 500)
        }
      )
    }
    else {
      console.log('not valid')
    }

  }
}