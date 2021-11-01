import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {

  @Input()
  showMePartially2: boolean = true;


  showVar: boolean = false;

  toggleChild() {
    this.showVar = !this.showVar;
  }
  @Input()
  showMePartially: boolean = true;


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
  get isAdmin() { return this.registerForm.get("isAdmin") }


  onSubmit() {
    console.log('test')
    if (this.registerForm.valid) {
      console.log(this.registerForm.value)
      this._global.addUsers(this.registerForm.value).subscribe(
        (res) => { console.log(res) },
        (err) => {
          if (err.error.includes('email')) this.errRegister = "email used before"
        },
        () => {
          this.errRegister = ""
          this.registerForm.reset()
          this.toastr.success('Success!', 'registered!')
          setTimeout(() => {
            this.router.navigateByUrl('/admin/dispAllUsers')
          }, 500)
        }
      )
    }
    else {
      console.log('not valid')
    }

  }
}