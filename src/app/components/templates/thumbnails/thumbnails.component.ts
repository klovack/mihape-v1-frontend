import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-thumbnails',
  templateUrl: './thumbnails.component.html',
  styleUrls: ['./thumbnails.component.scss']
})
export class ThumbnailsComponent implements OnInit {

  @HostBinding('style.width') hostWidth: string;
  @HostBinding('style.height') hostHeight: string;

  @Input('imageSrc') imageSrc: string;
  @Input('imageDesc') imageDesc: string;
  @Input('imagePosition') imagePosition = 'top';
  @Input('title') title: string;
  @Input('body') body: string;
  @Input('height') height: string;
  @Input('width') width: string;
  @Input('imageWidth') imageWidth: string;
  @Input('imageHeight') imageHeight: string;
  imageOnTop = false;
  imageOnLeft = false;
  imageOnRight = false;
  imageOnBottom = false;

  constructor() { }

  ngOnInit() {
    this.arrangeImagePosition();
    this.adjustHostSize();
  }

  get imageStyle() {
    let width = (this.imageOnTop || this.imageOnBottom) && !this.width ? '70%' : 'auto';
    width = this.imageOnLeft || this.imageOnRight ? '100%' : width;
    let height = (this.imageOnLeft || this.imageOnRight) && !this.height ? '85%' : 'auto';
    height = this.imageOnTop || this.imageOnBottom ? '60%' : height;

    width = this.imageWidth ? this.imageWidth : width;
    height = this.imageHeight ? this.imageHeight : height;

    return {
      'width': width,
      'height': height,
      'margin': '0 auto',
      'display': 'block',
    };
  }

  get containerStyle() {
    return {
      // 'width': this.width,
      // 'height': this.height,
    };
  }

  get descriptionStyle() {
    return {
      'width': this.width,
      'height': this.height,
    };
  }

  arrangeImagePosition() {
    this.resetImagePosition();
    switch (this.imagePosition) {
      case 'top':
      case '0':
      case 'normal':
        this.imageOnTop = true;
        break;
      case 'right':
      case '1':
        this.imageOnRight = true;
        break;
      case 'bottom':
      case '2':
        this.imageOnBottom = true;
        break;
      case 'left':
      case '3':
        this.imageOnLeft = true;
        break;
      default:
        this.imageOnTop = true;
    }
  }

  resetImagePosition() {
    this.imageOnTop = false;
    this.imageOnLeft = false;
    this.imageOnRight = false;
    this.imageOnBottom = false;
  }

  adjustHostSize() {
    this.hostWidth = this.width;
    this.hostHeight = this.height;
  }

}
