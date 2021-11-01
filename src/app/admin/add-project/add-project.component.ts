import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  errRegister = ""
  registerForm = new FormGroup({
    name: new FormControl('ppppppproject 1', [Validators.required]),
    details: new FormControl('lorem loremmgmmgmgmmgmgmgmgmgm', [Validators.required]),
    features: new FormControl('jnjfgfklkdmdklgmkmgbhjbh', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    isSold: new FormControl('true', [Validators.required]),


  })
  constructor(private _global: GlobalService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }
  get name() { return this.registerForm.get("name") }
  get details() { return this.registerForm.get("details") }
  get features() { return this.registerForm.get("features") }
  get image() { return this.registerForm.get("image") }
  get isSold() { return this.registerForm.get("isSold") }

  onSubmit() {
    console.log('test')
    if (this.registerForm.valid) {
      console.log(this.registerForm.value)
      this._global.addProject(this.registerForm.value).subscribe(
        (res: any) => { console.log(res) },
        (err: { error: string | string[]; }) => {
          // if (err.error.includes('email')) this.errRegister = "email used before"
        },
        () => {
          this.errRegister = ""
          this.registerForm.reset()
          this.toastr.success('Success!', ' adding project')
          setTimeout(() => {
            this.router.navigateByUrl('admin/dispProject')
          }, 500)
        }
      )
    }
    else {
      console.log('not valid')
    }

  }
}