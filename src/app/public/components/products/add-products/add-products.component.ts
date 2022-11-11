import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/public/services/api.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  productForm !:  FormGroup;
  editData:any;
  actionBtn: string ="Save";
  action: string ="Add";
  dataSource:any = [];

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      Name: ['',Validators.required],
      category: ['',Validators.required],
      Price: ['',Validators.required],
      Description: ['',Validators.required],
    })
    this.getAllCategories();
    this.editData=this.api.productIdRow;
    console.log(this.editData);
    if(this.editData){
      this.actionBtn = "Update"
      this.action ="Update"
      this.productForm.controls['Name'].setValue(this.editData.name);
      this.productForm.controls['Price'].setValue(this.editData.price);
      this.productForm.controls['Description'].setValue(this.editData.description);
    }
  }

  getAllCategories(){
    this.api.getCategorys().subscribe({
      next:(res: any)=>{
        this.dataSource = res;
        console.log(this.dataSource)
      },
      error:(err: any)=>{
        alert("Error while fetching category records")
      }
    })
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postCarts(this.productForm.value).subscribe({
          next:()=>{
            alert("Product added sucessfully")
            this.router.navigate(['../'],{relativeTo: this.route});
          },
          error:()=>{
            alert("Error while adding the Product")
          }
        });
      }
    }else{
      this.updateProduct();
    }
  }

  updateProduct(){
    this.api.putProducts( this.productForm.value, this.editData.id)
    .subscribe({
      next:()=>{
        alert("Product info updated sucessfully");
        this.router.navigate(['../'],{relativeTo: this.route});
      },
      error:()=>{
        alert("Error while updating the record");
      }
    })
  }

  clearForm(){
    this.productForm.reset();
    this.router.navigate(['../'],{relativeTo: this.route});
  }

}
