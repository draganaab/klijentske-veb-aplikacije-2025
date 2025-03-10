import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit, OnDestroy {

  @ViewChild('slideVal', { static: true }) slideElement!: ElementRef;
  
  images: string[] = [
    '../../assets/movieImages/barbie.jpg',
    '../../assets/movieImages/10things.jpg',
    '../../assets/movieImages/frozen.jpg',
    '../../assets/movieImages/lalaland.jpg',
    '../../assets/movieImages/hgames.jpg'
  ];
  visibleImages: string[] = [];
  currentIndex = 0;
  slideInterval: any;

  ngOnInit(): void {
    this.setInitialVisibleImages();
    this.startSlideshow();
  }

  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
  }

  setInitialVisibleImages(): void {
    this.visibleImages = this.images.slice(0, 4);
  }

  startSlideshow(): void {
    this.slideInterval = setInterval(() => {
      this.slideElement.nativeElement.classList.add('slide-animation');
      setTimeout(() => {
        this.slideImages();
      }, 2000);
    }, 5000);
  }

  slideImages(): void {
    this.slideElement.nativeElement.classList.remove('slide-animation');
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.visibleImages = [
      ...this.visibleImages.slice(1),
      this.images[(this.currentIndex + 3) % this.images.length]
    ];
  }
}
