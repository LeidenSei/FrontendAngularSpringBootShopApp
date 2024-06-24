import { Component } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { Product } from 'src/app/models/product';
import { ProductImage } from 'src/app/models/product.image';
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

  constructor(private productService: ProductService) { }

  ngOnInit() {
    const idParam = 3
    if (idParam !== null) {
      this.productId = +idParam;
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
}
