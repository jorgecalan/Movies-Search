import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cast } from '../../interfaces/credits-response';
import { PosterPipe } from "../../pipes/poster.pipe";
import { Result } from '../../interfaces/Same';

@Component({
    selector: 'app-similar',
    standalone: true,
    templateUrl: './similar.component.html',
    styleUrls: ['./similar.component.css'],
    imports: [RouterModule, CommonModule, PosterPipe]
})
export class Similar implements OnInit {  
  @Input() same: Result[] = [];

  constructor() { }
  ngOnInit(): void {
   console.log(this.same);
   console.log("Películas similares en el componente:", this.same);
  }

}