import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'userName', 'firstName', 'lastName','EMail','PhoneNumber', 'action'];
  dataSource!: MatTableDataSource<any>;
  isLoading=true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }
   
  ngOnInit(): void {
    this.getAllUsers()

  }


  getAllUsers(){
    this.api.getUsers().subscribe({
      next:(res: any)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.isLoading=false;
      },
      error:(err: any)=>{
        this.isLoading=false;
        alert("Error while fetching users records")
      }
    })
  }

  toaddUser(){
    this.api.userIdRow = null;
    this.router.navigate(['add'],{relativeTo: this.route});
  }

  editUser(row:any){
    console.log(row);
    this.api.userIdRow = row;
    this.router.navigate(['update'], {relativeTo: this.route});
  }

  deleteBuilder(id:any){
    this.api.deleteUser(id).subscribe({
      next:()=>{
        alert("product deleted");
        this.getAllUsers();
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
