import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { HotToastComponent } from '@ngneat/hot-toast/lib/components/hot-toast/hot-toast.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
  });

  constructor(private authsService: AuthenticationService,
    private router: Router,
    private toast: HotToastService
     ) { }

  ngOnInit(): void {  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  submit(){
    if (!this.loginForm.valid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authsService.login(email!, password!).pipe(
      this.toast.observe({
        success: 'logged in succesfully',
        loading: 'logging in..',
        error: 'There was an error'
      })
    )

    .subscribe(() =>{

      this.router.navigate(['/home']);
    });
  }
}
