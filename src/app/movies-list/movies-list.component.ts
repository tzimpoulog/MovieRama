import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Genres } from '../enums/enum-genres';
import { StateService } from '../services/state.service';
import { trigger, state, style, transition, animate, group } from '@angular/animations';


@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  imgBaseUrl: string = 'https://image.tmdb.org/t/p/' + 'w154';
  posterUrl: string;
  posterPath: string;
  movieCategories;
  movieGenres;
  erroMessage: string = '';
  hasError: boolean = false;
  paginationPage: number = 1;
  togglePanel: any = {};
  youtubeKey: string;
  similarMovies;
  reviewsList;
  reviewAuthor;
  reviewContent;


  constructor(private apiService: ApiService, private spinner: NgxSpinnerService, public stateService: StateService) { }

  ngOnInit() {
    this.loadMoviesPlayingNowPerPage(this.paginationPage);
  }

  loadMoviesPlayingNowPerPage(page: number) {
    this.apiService.getNowPlayingMovies(page).subscribe((response) => {
      this.stateService.movieList = response['results'];
      this.stateService.movieList.forEach(element => {
        this.posterPath = element.poster_path
      }, error => {
        this.erroMessage = 'An error occured!Please try again later!';
        this.hasError = true;
        console.log(error);
      });
    });
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.bottomReached() && this.paginationPage <= 500) {
      this.LoadMore();
    }
  }

  LoadMore() {
    let nextPageMovies;
    this.paginationPage = this.paginationPage + 1;
    this.apiService.getNowPlayingMovies(this.paginationPage).subscribe((response) => {
      nextPageMovies = response['results'];
      this.stateService.movieList = [...this.stateService.movieList, ...nextPageMovies];
      console.log(this.stateService.movieList);
      this.stateService.movieList.forEach(element => {
        this.posterPath = element.poster_path;
        this.spinner.hide();
      }, error => {
        this.erroMessage = 'An error occured!Please try again later!';
        this.hasError = true;
        console.log(error);
      });
    });
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }

  moreInfo(id: number){
    this.apiService.getMovieById(id).subscribe(res => console.log(res));
    this.apiService.getMovieVideoById(id).subscribe(res => this.youtubeKey = res['results'][0].key);
    this.apiService.getMovieReviewsById(id).subscribe(res => {
      console.log(res);
      this.reviewsList =  res['results'];
      this.reviewsList.forEach(el => {
        this.reviewAuthor = el.author;
        this.reviewContent = el.content
      });
    });
    this.apiService.getMovieSimilarById(id).subscribe(res => this.similarMovies = res['results']);
  }

  toggle() {
   
  }

  idToGenreName(genre) {
    switch (genre) {
      case 28:
        return Genres[Genres.Action];
      case 12:
        return Genres[Genres.Adventure];
      case 16:
        return Genres[Genres.Animation];
      case 35:
        return Genres[Genres.Comedy];
      case 80:
        return Genres[Genres.Crime];
      case 27:
        return Genres[Genres.Horror];
      case 18:
        return Genres[Genres.Drama];
      case 99:
        return Genres[Genres.Documentary];
      case 10751:
        return Genres[Genres.Family];
      case 14:
        return Genres[Genres.Fantasy];
      case 9648:
        return Genres[Genres.Mystery];
      case 36:
        return Genres[Genres.History];
      case 10749:
        return Genres[Genres.Romance];
      case 878:
        return Genres[Genres.ScienceFiction];
      case 10402:
        return Genres[Genres.Music];
      case 10770:
        return Genres[Genres.TVMovie];
      case 53:
        return Genres[Genres.Thriller];
      case 10752:
        return Genres[Genres.War];
      case 37:
        return Genres[Genres.Western];
        break;
    }
  }

}
