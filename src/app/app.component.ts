import { Component, Directive, Input, ElementRef, Renderer, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from './services/api.service';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MovieRama';
 
}

@Directive({ selector: '[inputfocus]' })

export class InputFocusedDirective implements OnChanges {
    public valLength;
    @Input() inputfocus;
    constructor(public el: ElementRef, public renderer: Renderer, private apiService: ApiService,public stateService: StateService) { }
    
  

      ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        let valLength = this.el.nativeElement.value.length;
        let inputValue = this.el.nativeElement.value;

        if (valLength > 3) {
            this.apiService.searchMovies(inputValue).subscribe(res => this.stateService.movieList = res['results']);
        }
        
      }
      
}
