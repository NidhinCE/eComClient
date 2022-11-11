import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/public/services/api.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  userForm !:  FormGroup;
  editData:any;
  actionBtn: string ="Save";
  action: string ="Add";

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      userName: ['',Validators.required],
      email: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      password: ['',Validators.required],
    })
    this.editData=this.api.userIdRow;
    if(this.editData){
      this.actionBtn = "Update"
      this.action ="Update"
      this.userForm.controls['firstName'].setValue(this.editData.firstName);
      this.userForm.controls['lastName'].setValue(this.editData.lastName);
      this.userForm.controls['userName'].setValue(this.editData.userName);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
      this.userForm.controls['password'].setValue(this.editData.password);
    }
  }

  addUser(){
    if(!this.editData){
      if(this.userForm.valid){
        this.api.postUsers(this.userForm.value).subscribe({
          next:()=>{
            alert("User added sucessfully")
            this.router.navigate(['../'],{relativeTo: this.route});
          },
          error:()=>{
            alert("Error while adding the User")
          }
        });
      }
    }else{
      this.updateUser();
    }
  }

  updateUser(){
    this.api.putUsers( this.userForm.value, this.editData.id)
    .subscribe({
      next:()=>{
        alert("User info updated sucessfully");
        this.router.navigate(['../'],{relativeTo: this.route});
      },
      error:()=>{
        alert("Error while updating the record");
      }
    })
  }

  clearForm(){
    this.userForm.reset();
    this.router.navigate(['../'],{relativeTo: this.route});
  }

}
