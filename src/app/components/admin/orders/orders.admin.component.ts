import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment/environment';
import { OrderResponse } from 'src/app/responses/user/order.response';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders.admin.component.html',
  styleUrls: ['./orders.admin.component.scss']
})
export class OrdersAdminComponent implements OnInit {
  orders: OrderResponse[] = [];
  currentPage:number = 1;
  itemsPerPage: number=10;
  totalPages:number = 0;
  keyword:string = "";
  visiblePages: number[] = [];

  constructor(private orderService:OrderService,private router:Router){}

  ngOnInit(): void {
   this.getAllOrders(this.keyword,this.currentPage,this.itemsPerPage)
  }
  getAllOrders(keyword: string, page: number, limit: number) {
    this.orderService.getAllOrders(keyword,page, limit).subscribe({
      next: (response: any) => {
       this.orders = response.orders;
       this.totalPages= response.totalPages;
       this.visiblePages= this.generateVisiblePageArray(this.currentPage,this.totalPages)
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

  onPageChange(page: number) {
    this.currentPage = page;
    this.getAllOrders(this.keyword, this.currentPage, this.itemsPerPage);
  }
  viewDetail(order:OrderResponse){
    this.router.navigate(['/admin/orders',order.id])
  }
}
