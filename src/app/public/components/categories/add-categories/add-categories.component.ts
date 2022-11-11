// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-add-categories',
//   templateUrl: './add-categories.component.html',
//   styleUrls: ['./add-categories.component.css']
// })
// export class AddCategoriesComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/public/services/api.service';

@Component({
    selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  categoryForm !:  FormGroup;
  editData:any;
  actionBtn: string ="Save";
  action: string ="Add";

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.categoryForm = this.formBuilder.group({
      Name: ['',Validators.required],
      Description: ['',Validators.required],
    })
    this.editData=this.api.categoryIdRow;
    if(this.editData){
      this.actionBtn = "Update"
      this.action ="Update"
      this.categoryForm.controls['Name'].setValue(this.editData.Name);
      this.categoryForm.controls['Description'].setValue(this.editData.Description);
    }
  }

  addCategory(){
    if(!this.editData){
      if(this.categoryForm.valid){
        this.api.postCategory(this.categoryForm.value).subscribe({
          next:()=>{
            alert("Category added sucessfully")
            this.router.navigate(['../'],{relativeTo: this.route});
          },
          error:()=>{
            alert("Error while adding the Category")
          }
        });
      }
    }else{
      this.updateCategory();
    }
  }

  updateCategory(){
    this.api.putCategory( this.categoryForm.value, this.editData.id)
    .subscribe({
      next:()=>{
        alert("Category info updated sucessfully");
        this.router.navigate(['../'],{relativeTo: this.route});
      },
      error:()=>{
        alert("Error while updating the record");
      }
    })
  }

  clearForm(){
    this.categoryForm.reset();
    this.router.navigate(['../'],{relativeTo: this.route});
  }

}
