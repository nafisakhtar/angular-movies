import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { PageNotFoundComponent } from './not-found.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieComponent } from './movies/movie/movie.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent, children: [
    { path: 'list/:category', component: MovieListComponent },
    { path: 'genre', component: MovieListComponent },
    { path: 'movie/:id', component: MovieComponent},
    { path: 'search', component: MovieListComponent},
    { path: '', redirectTo: '/movies/list/now-playing', pathMatch: 'full' }
  ] },
  { path: 'about', loadChildren: 'app/about/about.module#AboutModule'},
  { path: 'playlist', loadChildren: 'app/playlist/playlist.module#PlaylistModule', canActivate: [AuthGuard] },
  { path: 'categories', loadChildren: 'app/categories/categories.module#CategoriesModule', canActivate: [AuthGuard] },
  { path: 'account', loadChildren: 'app/account/account.module#AccountModule', canActivate: [AuthGuard] },
  { path: 'sign-in', loadChildren: 'app/sign-in/sign-in.module#SignInModule' },
  { path: 'star/:id', loadChildren: 'app/star/star.module#StarModule' },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/movies/list/now-playing', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
