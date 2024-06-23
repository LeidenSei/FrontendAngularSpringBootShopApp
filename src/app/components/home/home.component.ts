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
  products: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  visiblePages: number[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts(this.currentPage, this.itemsPerPage);
  }

  getProducts(page: number, limit: number) {
    this.productService.getProducts(page, limit).subscribe({
      next: (response: any) => {
        console.log("API Response:", response);
        if (response && response[0]?.products) {
          const productData = response[0].products;
          productData.forEach((product: Product) => {
            if (product.thumbnail) {
              product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
            } else {
              product.url = 'https://static.wikia.nocookie.net/violet-evergarden/images/a/ae/Violet_Evergarden.png/revision/latest?cb=20180209195829';
            }
          });
          this.products = productData;
          this.totalPages = response[0].totalPages;
          this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
        } else {
          console.error("Products array is missing in the response", response);
          this.products = [];
          this.totalPages = 0;
          this.visiblePages = [];
        }
      },
      complete: () => {},
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getProducts(this.currentPage, this.itemsPerPage);
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
}
