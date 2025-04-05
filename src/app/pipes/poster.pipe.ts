import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'poster',
  standalone: true
})
export class PosterPipe implements PipeTransform {

  transform(poster: string): string {
    let imageUrl = poster ? `https://image.tmdb.org/t/p/w500${poster}` : './assets/no-image-banner.jpg';
    console.log("✅ URL generada:", imageUrl); // Agrega esto
    return imageUrl;
  }
} 
