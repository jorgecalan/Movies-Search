import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domseguro',
  standalone: true
})
//permitir cualquier request sobre la url
export class DomseguroPipe implements PipeTransform {

  constructor (private domSanitizer: DomSanitizer){}

  transform(value: string): any {
    const url = 'https://open.spotify.com/embed?uri=';
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url +value);
  }

}
