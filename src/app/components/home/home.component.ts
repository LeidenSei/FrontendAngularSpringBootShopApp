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
        if (response && response.products) {
          response.products.forEach((product: Product) => {
            product.url = product.thumbnail 
              ? `${environment.apiBaseUrl}/products/images/${product.thumbnail}` 
              : 'https://static.wikia.nocookie.net/violet-evergarden/images/a/ae/Violet_Evergarden.png/revision/latest?cb=20180209195829';
          });

          this.products = response.products;

          this.totalPages = response.totalPages || Math.ceil(response.totalCount / this.itemsPerPage);

          this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);

          console.log("Products loaded:", this.products);
          console.log("Total pages:", this.totalPages);
          console.log("Visible pages:", this.visiblePages);
        } else {
          console.error("Products array is missing in the response", response);
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
    console.log("Changing to page:", page);
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
