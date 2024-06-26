import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environment/environment';
import { Product } from 'src/app/models/product';
import { ProductImage } from 'src/app/models/product.image';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity:number =1;
  idParam:any;
  constructor(private productService: ProductService,private cartService:CartService, private router:Router,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idParam = Number(params.get('id'));
    });
    if (this.idParam !== null) {
      this.productId = + this.idParam;
    }
    if (!isNaN(this.productId)) {
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) => {
          if (response.product_images && response.product_images.length > 0) {
            response.product_images.forEach((product_image: ProductImage) => {
              product_image.image_url = product_image.image_url ?  `${environment.apiBaseUrl}/products/images/${product_image.image_url}`
              : 'https://gcs.tripi.vn/public-tripi/tripi-feed/img/476322ssp/anh-mo-ta.png';
            });
            this.product = response
            this.showImage(0)
          }
        },
        complete: () => { },
        error: (error: any) => {
          console.log('error detail', error);
        }
      })
    }
  }

  showImage(index:number):void{
    if(this.product && this.product.product_images && this.product.product_images.length >0){
      if(index<0){
        index=0;
      }else if(index>=this.product.product_images.length){
        index=this.product.product_images.length-1;
      }
      this.currentImageIndex= index;
    }
  }

  thumbnailClick(index:number){
    this.currentImageIndex=index
  }

  nextImage():void{
    this.showImage(this.currentImageIndex + 1);
  }
  previousImage():void{
    this.showImage(this.currentImageIndex - 1);
  }

  addToCart():void{
    if(this.product){
      this.cartService.addToCart(this.product.id,this.quantity)
    }else{
      console.log("khong the them gio hang vi product null");
    }
  }

  increaseQuantity():void{
    this.quantity++;
  }
  decreaseQuantity():void{
    if(this.quantity > 1){
      this.quantity--;
    }
  }

  buyNow():void{
    if(this.product){
      this.cartService.addToCart(this.product.id,1)
      this.router.navigate(['/orders'])
    }else{
      console.log("khong the them gio hang vi product null");
    }
  }

}
