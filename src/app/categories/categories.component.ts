import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../shared/database/database.service';
import { MatSnackBar } from '@angular/material';
import { MovieCategoryModel } from '../movies/shared/movie-category.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  movies: any;
  isLoadingResults: boolean;
  sub: Subscription;

  constructor(
    private databaseService: DatabaseService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.sub = this.databaseService.getCategoriesMovies('FavoriteMovie').subscribe(response => {
      this.movies = response;
      this.isLoadingResults = false;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  deleteMovie(key: any) {
    this.databaseService.deleteMovies('FavoriteMovie', key, (error) => {
        if (error) {
          this.snackBar.open(error, 'Hide', { duration: 5000 });
        } else {
          this.snackBar.open('Your movie was been delete', null , { duration: 2000 });
        }
    })
}

}