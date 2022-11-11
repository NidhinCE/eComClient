import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Carts } from 'src/app/public/models/carts';



@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  displayedColumns: string[] = ['id', 'Name', 'Price', 'Description', 'action'];
  dataSource!: MatTableDataSource<any>;
  isLoading=true;
  cartsToDisplay : Carts[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog,private httpClient: HttpClient) { }
   
  ngOnInit(): void {
    this.getResults();
    //this.router.navigate(['/public/products'])
  }


  getResults(){
    forkJoin([
      this.httpClient.get('http://localhost:3000/products/api/'),
      this.httpClient.get('http://localhost:3000/cart/api/' + localStorage.getItem('userId')),
    ]).subscribe(
      (res: any[]) => {
        this.cartsToDisplay = res[1];
        for(let i=0; i<this.cartsToDisplay.length; i++){
          for(let j=0; j<res[0].length; j++){
            if (this.cartsToDisplay[i].productId === res[0][j]._id){
              this.cartsToDisplay[i].productName = res[0][j].name;
              this.cartsToDisplay[i].description = res[0][j].description;
            }
          }
        }
        this.dataSource = new MatTableDataSource(this.cartsToDisplay);
        this.isLoading=false;
      },
      (err) => {
        console.log('error', err);
        this.isLoading=false;
      }
    );
  }

  makePayment(){
    for(let i = 0; i<this.cartsToDisplay.length; i++){
      this.api.postOrders(this.cartsToDisplay[i]).subscribe({
        next:()=>{
        //  this.router.navigate(['../'],{relativeTo: this.route});
        },
        error:()=>{
          alert("Error while placing the order")
        }
      });
    }
    for(let i = 0; i<this.cartsToDisplay.length; i++){
      this.api.deleteCarts(this.cartsToDisplay[i]._id).subscribe({
        next:()=>{
         // this.router.navigate(['../'],{relativeTo: this.route});
        },
        error:()=>{
          alert("Error while placing the order")
        }
      });
    }
    alert("Order placed")
    this.router.navigate(['/public/products'])
  }

  toaddProduct(){
    this.api.cartIdRow = null;
    this.router.navigate(['add'],{relativeTo: this.route});
  }

  editProduct(row:any){
    this.api.cartIdRow = row;
    this.router.navigate(['update'], {relativeTo: this.route});
  }

  deleteBuilder(id:any){
    this.api.deleteCarts(id).subscribe({
      next:()=>{
        alert("cart deleted");
        this.getResults();
      },
      error:()=>{
        alert("failed to delete cart");
      }
    })
  }

  openDialog(id:number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Are you sure you want to delete this cart?'
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
