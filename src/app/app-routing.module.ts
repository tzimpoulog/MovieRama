import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { MoviesListComponent } from './movies-list/movies-list.component';

const routes: Routes = [
    {
        path: '',
        component: MoviesListComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent
    }   
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
