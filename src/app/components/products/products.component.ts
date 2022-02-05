import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Product } from './product/Product-Interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$!: Observable<Product[]>;
  productStore: any[] = [];
  filteredProductStore: any[] = [];
  selectedCategory: string = "";
  categoryList: any[] = [
    { category: '', name: 'All Products', imageUrl: 'https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100' },
    { category: 'electronics', name: 'Electronics', imageUrl: 'https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100' },
    { category: 'jewelery', name: 'Jeweley', imageUrl: 'https://m.media-amazon.com/images/S/aplus-media/vc/bd24f0bb-1f63-44ae-a8fe-42939fd33d1a.__CR0,303,2000,1237_PT0_SX970_V1___.jpg' },
    { category: 'men\'s clothing', name: 'Fashion', imageUrl: 'https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100' },
  ];

  constructor(private api: ApiService) {
    this.products$ = this.api.getAllProduct();
    this.getProducts();
  }
  ngOnInit(): void {

    this.api.filterProduct$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ) .subscribe((val) => {
      console.log("inside product subscription",val)
        let filterText = val.toLowerCase();

        if (val.length <= 2) {
          this.filteredProductStore = this.productStore;
        }
        else {
          this.selectedCategory='';
          this.filteredProductStore = this.productStore.filter(
            (elem) => {
              return elem.category.toLowerCase().includes(filterText) || elem.title.toLowerCase().includes(filterText) || elem.description.toLowerCase().includes(filterText)
            }
          )
          console.log("filtered Product sore",this.filteredProductStore);
        }
      })
  }
  getProducts() {
    this.products$.subscribe((data: Product[]) => {
      console.log("Products Observable", data);
      this.productStore = [...data];

      this.productStore.forEach((elem) => {
        Object.assign(elem, { 'quantity': 1, 'total': elem.price })
        // elem['quantity']=1
        // elem['total']=elem.price
      })
      console.log("Added quantity & total", this.productStore);
      this.filteredProductStore = this.productStore;

    })
  }
  // setCategory(category: string) {
  //   this.selectedCategory = category;
  //   // this.api.getCategoryProduct(category)
  // }

}
