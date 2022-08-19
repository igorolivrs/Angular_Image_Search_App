import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/pages/home/home.component';
import { DetailsComponent } from './Components/pages/details/details.component';
import { FavoritesComponent } from './Components/pages/favorites/favorites.component';
import { ImagesService } from './Components/services/images.service';
import { NotFoundComponent } from './Components/pages/not-found/not-found/not-found.component';
import { ModalComponent } from './Components/pages/home/modal/modal/modal.component';
import { MessagesComponent } from './Components/messages/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DetailsComponent,
    FavoritesComponent,
    NotFoundComponent,
    ModalComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ImagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
