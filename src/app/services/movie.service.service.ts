import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { Cast } from '../interfaces/credits-response';
import { Result } from '../interfaces/Same';


@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  
  private baseUrl = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando = false;
  private apiKey = 'd6fce93670f2010fc39b2d11055c89a4'; 
  constructor(private http: HttpClient) { }

  getParams() {
    return {
      api_key :"d6fce93670f2010fc39b2d11055c89a4",
      language :"es-MX",
      page: this.carteleraPage
    } 
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getCartelera():Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }
    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
      params: this.getParams()}).pipe(
        map((resp) => resp.results ),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );
  }
  buscarPeliculas(texto: string):Observable<Movie[]> {
    const params = {...this.getParams(), page: '1', query: texto};
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(
      map(resp => resp.results)
    );
  }

  getPeliculaDetalle(id: string) {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
      params: this.getParams()
    }).pipe(
      catchError(err => of(null))
    )
  }
  getCast(id: string):Observable<Cast[]> {
    return this.http.get(`${this.baseUrl}/movie/${id}/credits`, {
      params: this.getParams()
    }).pipe(
      map((resp: any) => resp.cast),
      catchError(err => of([]))
    )
  }
  getResult(id: string): Observable<Result[]> {
    return this.http.get(`${this.baseUrl}/movie/${id}/similar`, {
      params: this.getParams()
    }).pipe(
      map((resp: any) => resp.results), // ✅ Cambia `resp.Result` por `resp.results`
      catchError(err => {
        console.error("Error obteniendo películas similares:", err);
        return of([]);
      })
    );
  }
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`).pipe(
      tap((movies) => console.log('Películas obtenidas:', movies)) 
    );
  }
  
}  