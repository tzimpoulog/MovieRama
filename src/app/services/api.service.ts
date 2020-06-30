import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiKey = '?api_key=bc50218d91157b1ba4f142ef7baaa6a0';
  private apiUrl = 'https://api.themoviedb.org/';
  imageBaseurl = 'https://image.tmdb.org/t/p/';


  constructor(private http: HttpClient) { }

  getImageBaseUrl() {
    return this.imageBaseurl;
   }

   getNowPlayingMovies(page: number) {
    return this.http.get(this.apiUrl + '3/movie/now_playing' + this.apiKey + '&page' + '=' + page);
  }

  getGenreList(){
    return this.http.get(this.apiUrl + '3/genre/movie/list' + this.apiKey);
  }

  searchMovies(query: string){
    return this.http.get(this.apiUrl + '3/search/movie' + this.apiKey + '&query=' + query);
  }

  getMovieById(id: number){
    return this.http.get(this.apiUrl + '3/movie/'+ id + this.apiKey);
  }

  getMovieVideoById(id: number){
    return this.http.get(this.apiUrl + '3/movie/'+ id + '/videos' + this.apiKey);
  }

  getMovieReviewsById(id: number){
    return this.http.get(this.apiUrl + '3/movie/'+ id + '/reviews' + this.apiKey);
  }

  getMovieSimilarById(id: number){
    return this.http.get(this.apiUrl + '3/movie/'+ id + '/similar' + this.apiKey);
  }


}
