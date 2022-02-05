import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Product } from './product/Product-Interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private api: ApiService) {
    this.products$ = this.api.getProduct();

    this.products$.subscribe((data: Product[]) => {
      console.log("Products Observable", data);
      this.productStore = [...data];

      this.productStore.forEach((elem)=>{
        Object.assign(elem,{'quantity':1,'total':elem.price})
          // elem['quantity']=1
          // elem['total']=elem.price
      })
      console.log("Added quantity & total",this.productStore);

    })
  }

  products$!: Observable<Product[]>;
  productStore!: any[];

  ngOnInit(): void {

  }

}
