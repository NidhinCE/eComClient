import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Products } from '../models/products';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ApiUrl="http://localhost:3000/";

  constructor(private http: HttpClient) { }


  private _categorys = new BehaviorSubject<Category>({
    _id :"",
    Name :'',
    Description:""
  });
  private _categorys$ = this._categorys.asObservable();

//id for routing and operations
  cartIdRow: any;
  userIdRow: any;
  productIdRow: any;
  categoryIdRow: any;
  builderIdRow: any;
  apartmentIdRow: any;
  organizationIdRow: any;
  wingIdRow: any;
  flatIdRow: any;
  ownerIdRow: any;
  tenantIdRow: any;

//Api for cart
getOrders(){
  return this.http.get<any>(this.ApiUrl + "transaction/api/");
}

postOrders(data:any){
  return this.http.post(this.ApiUrl + "transaction/api/",data);
}


  //Api for cart
getCarts(){
  return this.http.get<any>(this.ApiUrl + "cart/api/");
}

postCarts(data:any){
  return this.http.post(this.ApiUrl + "cart/api/",data);
}

putCarts(data:any,id:string | null){
  return this.http.put<any>(this.ApiUrl + "cart/api/"+id,data);
}

deleteCarts(id:String | null){
  return this.http.delete<any>(this.ApiUrl + "cart/api/"+id);
}

//Api for users
getUsers(){
  return this.http.get<any>(this.ApiUrl + "users/api/");
}

postUsers(data:Category){
  console.log(data);
  return this.http.post(this.ApiUrl + "users/api/",data);
}

putUsers(data:any,id:number){
  return this.http.put<any>(this.ApiUrl + "users/api/"+id,data);
}

deleteUser(id:number){
  return this.http.delete<any>(this.ApiUrl + "users/api/"+id);
}

//Api for category
getCategorys():Observable<any>{
  return this.http.get<any>(this.ApiUrl + "categorys/api/");
}

postCategory(data:Category){
  console.log(data);
  return this.http.post(this.ApiUrl + "categorys/api/",data);
}

putCategory(data:any,id:number){
  return this.http.put<any>(this.ApiUrl + "categorys/api/"+id,data);
}

deleteCategory(id:number){
  return this.http.delete<any>(this.ApiUrl + "categorys/api/"+id);
}

//Api for Products
getProducts(){
  return this.http.get<any>(this.ApiUrl + "products/api/");
}

postProducts(data:Products){
  console.log(data);
  return this.http.post(this.ApiUrl + "products/api/",data);
}

putProducts(data:any,id:number){
  return this.http.put<any>(this.ApiUrl + "products/api/"+id,data);
}

deleteProduct(id:number){
  return this.http.delete<any>(this.ApiUrl + "products/api/"+id);
}

//Api for builder
  getBuilder(){
    return this.http.get<any>("http://localhost:3000/builder/");
  }

  postBuilder(data:any){
    return this.http.post<any>("http://localhost:3000/builder/",data);
  }

  putBuilder(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/builder/"+id,data);
  }

  deleteBuilder(id:number){
    return this.http.delete<any>("http://localhost:3000/builder/"+id);
  }


  //Api for Apartment
  getApartment(){
    return this.http.get<any>("http://localhost:3000/apartment/");
  }

  postApartment(data:any){
    return this.http.post("http://localhost:3000/apartment/",data);
  }

  putApartment(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/apartment/"+id,data);
  }

  deleteApartment(id:number){
    return this.http.delete<any>("http://localhost:3000/apartment/"+id);
  }

  //Api for organization

  getOrganization(){
    return this.http.get<any>("http://localhost:3000/oganization");
  }

  postOrganization(data:any){
    return this.http.post("http://localhost:3000/oganization",data);
  }

  putOrganization(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/oganization/"+id,data);
  }

  deleteOrganization(id:number){
    return this.http.delete<any>("http://localhost:3000/oganization/"+id);
  }

    //Api for Wings

    getWing(){
      return this.http.get<any>("http://localhost:3000/wing");
    }
  
    postWing(data:any){
      return this.http.post("http://localhost:3000/wing",data);
    }
  
    putWing(data:any,id:number){
      return this.http.put<any>("http://localhost:3000/wing/"+id,data);
    }
  
    deleteWing(id:number){
      return this.http.delete<any>("http://localhost:3000/wing/"+id);
    }

      //Api for flat

  getFlat(){
    return this.http.get<any>("http://localhost:3000/flat");
  }

  postFlat(data:any){
    return this.http.post("http://localhost:3000/flat",data);
  }

  putFlat(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/flat/"+id,data);
  }

  deleteFlat(id:number){
    return this.http.delete<any>("http://localhost:3000/flat/"+id);
  }

    //Api for owner

    getOwner(){
      return this.http.get<any>("http://localhost:3000/owner");
    }
  
    postOwner(data:any){
      return this.http.post("http://localhost:3000/owner",data);
    }
  
    putOwner(data:any,id:number){
      return this.http.put<any>("http://localhost:3000/owner/"+id,data);
    }
  
    deleteOwner(id:number){
      return this.http.delete<any>("http://localhost:3000/owner/"+id);
    }

    
    //Api for tenant

    getTenant(){
      return this.http.get<any>("http://localhost:3000/tenant");
    }
  
    postTenant(data:any){
      return this.http.post("http://localhost:3000/tenant",data);
    }
  
    putTenant(data:any,id:number){
      return this.http.put<any>("http://localhost:3000/Tenant/"+id,data);
    }
  
    deleteTenant(id:number){
      return this.http.delete<any>("http://localhost:3000/tenant/"+id);
    }
}
