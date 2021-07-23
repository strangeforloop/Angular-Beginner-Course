import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  @Input() rating: number = 0;
  cropWidth: number =  75;
  // @Output() notify: EventEmitter<string> = new EventEmitter();
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  // this only listens to changes to input properties
  ngOnChanges(): void {
    this.cropWidth = this.rating * 75/5;
  }

  onClick(): void {
    console.log(`The rating ${this.rating} was clicked!`);
    // this.notify.emit('clicked!');
    this.ratingClicked.emit(`The rating ${this.rating} was clicked.`);
  }
}

