// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-my-orders',
//   templateUrl: './my-orders.component.html',
//   styleUrls: ['./my-orders.component.css']
// })
// export class MyOrdersComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Carts } from 'src/app/public/models/carts';



@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})

export class MyOrdersComponent implements OnInit {
  private transactionUrl :string;
  isAdmin = false;
  displayedColumns: string[] = ['id', 'Name', 'Price', 'Description', "Date", "UserName"];
  dataSource!: MatTableDataSource<any>;
  isLoading=true;
  cartsToDisplay : Carts[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog,private httpClient: HttpClient) { }
   
  ngOnInit(): void {
    if (localStorage.getItem("user") === "admin"){
      this.isAdmin = true
    }
    this.getResults();
  }


  getResults(){
    console.log(localStorage.getItem('userId'))
    
    if(this.isAdmin){
      this.transactionUrl = 'http://localhost:3000/transaction/api/';
    }else{
      this.transactionUrl = 'http://localhost:3000/transaction/api/' + localStorage.getItem('userId');
    }

    forkJoin([
      this.httpClient.get('http://localhost:3000/products/api/'),
      this.httpClient.get(this.transactionUrl),
      this.httpClient.get('http://localhost:3000/users/api/'),
    ]).subscribe(
      (res: any[]) => {
        console.log(res[2]);
        console.log(res[1]);
        this.cartsToDisplay = res[1];
        for(let i=0; i<this.cartsToDisplay.length; i++){
          for(let j=0; j<res[0].length; j++){
            if (this.cartsToDisplay[i].productId === res[0][j]._id){
              this.cartsToDisplay[i].productName = res[0][j].name;
              this.cartsToDisplay[i].description = res[0][j].description;
            }
          }
          for(let j=0; j<res[2].length; j++){
            if (this.cartsToDisplay[i].customerId === res[2][j]._id){
              this.cartsToDisplay[i].userName = res[2][j].userName;
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

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

}
