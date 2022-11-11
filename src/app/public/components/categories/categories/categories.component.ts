import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'Name', 'Description', 'action'];
  dataSource!: MatTableDataSource<any>;
  isLoading=true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }
   
  ngOnInit(): void {
    this.getAllCategories()

  }


  getAllCategories(){
    this.api.getCategorys().subscribe({
      next:(res: any)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.isLoading=false;
      },
      error:(err: any)=>{
        this.isLoading=false;
        alert("Error while fetching category records")
      }
    })
  }

  toaddCategory(){
    this.api.categoryIdRow = null;
    this.router.navigate(['add'],{relativeTo: this.route});
  }

  editCategory(row:any){
    console.log(row);
    this.api.categoryIdRow = row;
    this.router.navigate(['update'], {relativeTo: this.route});
  }

  deleteBuilder(id:any){
    this.api.deleteCategory(id).subscribe({
      next:()=>{
        alert("category deleted");
        this.getAllCategories();
      },
      error:()=>{
        alert("failed to delete category");
      }
    })
  }

  openDialog(id:number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Are you sure you want to delete this category?'
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
