import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { environment } from 'src/app/environment/environment';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categorires: Category[]=[];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;
  visiblePages: number[] = [];
  keyword: string = '';
  selectedCategoryId: number = 0;
  product?: Product;

  constructor(private productService: ProductService,private categoryService:CategoryService, private router:Router,private cartService:CartService) { }

  ngOnInit(): void {
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    this.getCategories(1,100)
  }

  getCategories(page:number, limit:number){
    this.categoryService.getCategory(page,limit).subscribe({
      next: (categorires:Category[]) =>{
        this.categorires= categorires;
      },
      complete: ()=>{},
      error: (error: any) => {
        // Log error details
        console.error("Error fetching categories:", error);
      }
    })
  }

  searchProduct() {
    this.currentPage = 1;
    this.itemsPerPage = 9;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage)
  }

  getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
    this.productService.getProducts(keyword,selectedCategoryId,page, limit).subscribe({
      next: (response: any) => {
        if (response && response.products) {
          response.products.forEach((product: Product) => {
            product.url = product.thumbnail
              ? `${environment.apiBaseUrl}/products/images/${product.thumbnail}`
              : 'https://static.wikia.nocookie.net/violet-evergarden/images/a/ae/Violet_Evergarden.png/revision/latest?cb=20180209195829';
          });

          this.products = response.products;

          this.totalPages = response.totalPages || Math.ceil(response.totalCount / this.itemsPerPage);

          this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);

        } else {
          this.products = [];
          this.totalPages = 0;
          this.visiblePages = [];
        }
      },
      complete: () => {
        console.log("API call completed");
      },
      error: (error: any) => {
        // Log error details
        console.error("Error fetching products:", error);
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getProducts(this.keyword, this.selectedCategoryId,this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }
  onProductClick(id: number){
    console.log(id);
    
    this.router.navigate(['/product', id])
  }
  buyNow(proId:number):void{
      this.cartService.addToCart(proId,1)
      this.router.navigate(['/orders'])
  }
}
