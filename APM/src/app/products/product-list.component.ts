import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from './product';
import { ProductService } from "./product.service";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';
  sub!: Subscription;

  private _listFilter: string = '';

  public get listFilter(): string {
    return this._listFilter;
  }

  // this gets called when we do `this.listFilter = 'cart' INSIDE of ngOnInit()
  // this also gets called automatically when the _listFilter variable changes
  public set listFilter(value: string) {
    this._listFilter = value;
    console.log(`In setter: ${value}`);
    this.filteredProducts = this.performFilter(value);
  }

  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];

  constructor(private productService: ProductService) {

  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    console.log(`product list component loaded`);
    // this.listFilter = '';   // this calls the setter
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err,
    });

  }

  onNotify(message: string): void {}

  onRatingClicked(message: string): void {
    // add message to the title
    this.pageTitle = `Product List: ${message}`;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
