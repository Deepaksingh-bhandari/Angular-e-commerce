import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../components/products/product/Product-Interface';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(items:Product[], category:string): Product[] {
    console.log("Inside transform",items,category)
    if(category==='')
    return items;
    return items.filter((elem)=>{return elem.category===category});
  }

}
