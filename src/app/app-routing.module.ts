import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './Components/pages/details/details.component';
import { FavoritesComponent } from './Components/pages/favorites/favorites.component';
import { HomeComponent } from './Components/pages/home/home.component';
import { NotFoundComponent } from './Components/pages/not-found/not-found/not-found.component';

const routes: Routes = [
{
  path: '', component:HomeComponent
},
{
  path: 'favorites', component:FavoritesComponent
},
{
  path: 'details/:id', component: DetailsComponent
},
{
  path: 'not-found', component: NotFoundComponent
}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
