import { Component, computed, effect, HostListener, inject } from '@angular/core';
import { MoviesService } from './movies.service';
import { RouterLink } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-movies',
  imports: [RouterLink, MovieCardComponent],
  templateUrl: './movies.component.html',
})
export class MoviesComponent
 {

  isLoading = computed(() => this._moviesService.isLoading())
  hasMorePages = computed(() => this._moviesService.hasMorePages());

  private readonly _moviesService = inject(MoviesService);
  
  readonly movies = this._moviesService.movies;
  constructor(){
    effect(() => {
      console.log(this.movies());
      console.log('hola');
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.isLoading() || !this.hasMorePages()) {return;}
    
    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollThrehold = document.documentElement.scrollHeight;

    if (scrollPosition >= scrollThrehold) {
      this._moviesService.getMovies();
    }

  }
}
