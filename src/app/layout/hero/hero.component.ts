import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from 'src/app/features/movies/models/movies.interface';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  movie = input.required<Movie>();
}
