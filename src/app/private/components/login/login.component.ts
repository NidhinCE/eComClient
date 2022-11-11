import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Admin } from 'src/app/public/models/admin';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  adminUser: Admin;
  isLoginSuccess = false;
  role = "User";
  faLock = faLock;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4),]),
    password: new FormControl(''),
  });

  submitData(){
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    
    // this.auth.getAdminLogin(String(username)).subscribe(x=>this.adminUser=x);
    // console.log(this.adminUser);

    this.auth.getAdminLogin(username).subscribe(
      data => {
        this.adminUser = data[0];
        if(this.adminUser === undefined){
          this.auth.getuserLogin(username).subscribe(x=>{
            localStorage.setItem("userName",x[0].userName);
            this.adminUser = x[0];
            if(this.adminUser === undefined){
                console.log("Not Connected")                
              }
              else if(this.adminUser._id.length > 0){
                console.log("Connected");
                localStorage.setItem("user","user");
                localStorage.setItem('userId', this.adminUser._id);
                this.router.navigate(['/public/dashboard'])
              }
          });
          console.log("Not Connected");
        }
        else if(this.adminUser._id.length > 0){
          console.log("Connected");
          this.router.navigate(['/public/dashboard'])
          this.isLoginSuccess = true;
          localStorage.setItem("user","admin");
        }
        else{
          console.log("not Connected");
          localStorage.setItem("user","");
          localStorage.setItem('userId', "");
        }

        
        // this.tokenStorage.saveToken(data.accessToken);
        // this.tokenStorage.saveUser(data);

        //  this.isLoginFailed = false;
        //  this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;
      //  this.reloadPage();
       // this.router.navigate(['/public/dashboard'])
      },
      err => {
        console.log(err.error.message);
         //this.errorMessage = err.error.message;
        // this.isLoginFailed = true;
      }
    );
    console.log(this.isLoginSuccess);
      if (this.isLoginSuccess){
        console.log("Logged in");
      }else{
        console.log("Not Logged in");
      }

    //   console.log("Outside");
    // console.log(this.adminUser);
  }

     setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }


  constructor(private router: Router, private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

}
