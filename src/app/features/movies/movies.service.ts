import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Movie, MovieResponse } from './models/movies.interface';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  movies = signal<Movie[]>([]);
  trendingMovies = signal<Movie[]>([]);
  selectedMovie = signal<Movie | null>(null);

  currentPage = signal<number>(1);
  hasMorePages = signal<boolean>(true);
  isLoading = signal<boolean>(false);

  private readonly _apiKey = "3e9cb0a20b2301d3ee8a3d206a25d871";
  private readonly _apiUrl = "https://api.themoviedb.org/3";

  private readonly _http = inject(HttpClient);

  constructor() {
    this.getMovies();
    this.getTrending();
  }

  getMovieById(movieId: string): Observable<Movie> {
    return this._http.get<Movie>(
      `${this._apiUrl}/movie/${movieId}?api_key=${this._apiKey}`
    );
  }

   getMovies(): void {
    this._http
      .get<MovieResponse>(
        `${this._apiUrl}/movie/popular?api_key=${this._apiKey}`
      )
      .pipe(
        tap((response) => {
          const currentMovies = this.movies();
          this.movies.set([...currentMovies, ...response.results]);
          this.hasMorePages.set(response.page < response.total_pages);
          this.currentPage.update((currentPage) => currentPage + 1);
          this.isLoading.set(false);
        })
      )
      .subscribe();
  }

  setRandomMovie() {
    // const totalTrending = 45;
    const trendingLength = this.trendingMovies().length;
    const randomIndex = this._getRandomInt(0, trendingLength);
    const randomMovie = this.trendingMovies()[randomIndex];
    this.selectedMovie.set(randomMovie);
  }

  private _getRandomInt(min = 0, max = 50): number{
      return Math.floor(Math.random() * (max - min)) + min;
  }

  getTrending(): void {
    this._http
      .get<MovieResponse>(
        `${this._apiUrl}/trending/movie/day?api_key=${this._apiKey}`
      )
      .pipe(
        tap((movies:MovieResponse) => this.trendingMovies.set(movies.results)),
        tap(() => this.setRandomMovie())
      )
      .subscribe();
  }
}