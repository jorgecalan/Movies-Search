import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PosterPipe } from '../../pipes/poster.pipe';
import { MovieResponse } from '../../interfaces/movie-response';
import { Cast } from '../../interfaces/credits-response';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieServiceService } from '../../services/movie.service.service';
import { combineLatest } from 'rxjs';
import { CastSlideshowComponent } from "../../components/cast-slideshow/cast-slideshow.component";
import { Similar } from '../../components/similar/similar.component';
import { Result } from '../../interfaces/Same';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pelicula',
  standalone: true,
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
  imports: [CommonModule, PosterPipe, CastSlideshowComponent, Similar, FormsModule]
})
export class PeliculaComponent implements OnInit {
  public pelicula: MovieResponse | undefined;
  public cast: Cast[] = [];
  public similar: Result[] = [];
  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  comment: string = '';

  constructor(
    private activatedRouter: ActivatedRoute,
    private peliculasService: MovieServiceService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRouter.snapshot.params;
    combineLatest([
      this.peliculasService.getPeliculaDetalle(id),
      this.peliculasService.getCast(id),
      this.peliculasService.getResult(id)
    ]).subscribe(([pelicula, cast, result]) => {
      if (!pelicula) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.pelicula = pelicula;
      this.cast = cast.filter(actor => actor.profile_path !== null);
      this.similar = result ? result.filter(movie => movie.poster_path !== null) : [];
    });
  }

  rateMovie(stars: number): void {
    this.rating = stars;
    console.log('Rating', this.rating);
  }
  

  onRegresar(): void {
    this.location.back();
  }

  submitReview(): void {
    if (this.rating === 0) {
      alert('Por favor, selecciona una calificación.');
      return;
    }
    if (!this.comment.trim()) {
      alert('Por favor, ingresa un comentario.');
      return;
    }

    console.log('Calificación:', this.rating);
    console.log('Comentario:', this.comment);

    alert('Gracias por tu opinión!');

    this.rating = 0; 
    this.comment = '';
  }
}

