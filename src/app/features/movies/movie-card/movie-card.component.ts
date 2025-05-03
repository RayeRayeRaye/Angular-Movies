import { Component, input } from '@angular/core';
import { Movie } from '../models/movies.interface';

@Component({
  selector: 'app-movie-card',
  imports: [],
  template: `
  <div class="cursor-pointer border-2 shadow-2xl shadow-red-800" role="button"> 
      <img [src]="getImageUrl()" (error)="setImageError(true)" [alt]="movie().title" class="aspect-[2/3]">  
      <div class="movie-card-overlay">
        <div class="movie-card-content">
          <h3 class="mb-2 text-sm font-bold">
            {{movie().title}}
          </h3>
          <p class="text-xs text-gray-400 line-clamp-2 ">
            {{movie().overview}}
          </p>
        </div>
      </div>
  </div>
  `
})
export class MovieCardComponent {
  movie = input.required<Movie>();
imageError = false;

  getImageUrl(): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500'
    return this.imageError ? '/placeholder.svg' : `${baseUrl}/${this.movie().poster_path}`
  }
  setImageError(value:boolean):void {
    this.imageError = value;
  }
}
