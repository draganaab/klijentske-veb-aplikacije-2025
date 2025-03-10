import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'projekat';
  movies = [
    { title: 'Movie 1', description: 'Description for Movie 1', image: 'path/to/image1.jpg' },
    { title: 'Movie 2', description: 'Description for Movie 2', image: 'path/to/image2.jpg' },
    { title: 'Movie 3', description: 'Description for Movie 3', image: 'path/to/image3.jpg' },
  ];
  
  currentSlide = 0;

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.movies.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.movies.length) % this.movies.length;
  }
}
