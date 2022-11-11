import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { Products } from 'src/app/public/models/products';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'Name', 'Price','CategoryName', 'Description', 'action', 'addToCart', ];
  dataSource!: MatTableDataSource<any>;
  isLoading=true;
  isAdmin = false;
  test:string;
  userId: string | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
   productsToDisplay : Products[];

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog,private httpClient: HttpClient) { }
   
  ngOnInit(): void {
    if (localStorage.getItem("user") === "admin"){
      this.isAdmin = true
    }
    this.getResults();
  }

  getResults(){
    forkJoin([
      this.httpClient.get('http://localhost:3000/categorys/api/'),
      this.httpClient.get('http://localhost:3000/products/api/'),
    ]).subscribe(
      (res: any[]) => {
        this.productsToDisplay = res[1];
        for(let i=0; i<this.productsToDisplay.length; i++){
          for(let j=0; j<res[0].length; j++){
            if (this.productsToDisplay[i].categoryId === res[0][j]._id){
              this.productsToDisplay[i].categoryName = res[0][j].Name;
            }
          }
        }
        this.dataSource = new MatTableDataSource(this.productsToDisplay);
        this.isLoading=false;
      },
      (err) => {
        console.log('error', err);
        this.isLoading=false;
      }
    );
  }

  addToCart(row:any){
    row.userId = localStorage.getItem('userId');
    this.api.postCarts(row).subscribe({
      next:()=>{
        alert("Product added to cart");
        this.getResults();
      },
      error:()=>{
        alert("failed to add product to cart");
      }
    })
  }

  toaddProduct(){
    this.api.productIdRow = null;
    this.router.navigate(['add'],{relativeTo: this.route});
  }

  editProduct(row:any){
    this.api.productIdRow = row;
    this.router.navigate(['update'], {relativeTo: this.route});
  }

  deleteBuilder(id:any){
    this.api.deleteProduct(id).subscribe({
      next:()=>{
        alert("product deleted");
        this.getResults();
      },
      error:()=>{
        alert("failed to delete product");
      }
    })
  }

  openDialog(id:number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Are you sure you want to delete this product?'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) =>{
      if (confirmed){
        this.deleteBuilder(id);
      }
    });
  }


  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

}
