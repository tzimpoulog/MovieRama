import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  movieList: any[] = [];

  constructor() { }
}
