import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products:Product[]  = [];
  currentPage:number = 1;
  itemPerPage: number = 10;
  pages:Number[] = [];
  totalPages:number = 0;
  visiblePages:number [] = [];
  constructor(private productService: ProductService){}


  ngOnInit(): void {
    this.getProducts(this.currentPage, this.itemPerPage)
  }


  getProducts(page:number, limit:number){
    this.productService.getProducts(page, limit).subscribe({
      next: (response:any) =>{
        response.products.forEach((product:Product) => {
          // product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
        });
        this.products = response.products;
        this.totalPages = response.totalPages;
        // this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: ()=>{
        debugger;
      },
      error:(error:any) =>{
        console.log(error);
      }
    })
  }

}
