import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  key = "dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578";
  images: any = [];
  page: number = 1;
  
  constructor(private http:HttpClient) { }

  // Pedido a API, retorna os objetos

  getImages(page : number){
    return this.http.get(`https://api.unsplash.com/photos?per_page=24&page=${page}&order_by=latest&client_id=${this.key}`)
    .subscribe((cards: any) => {
      this.images = cards;
      console.log(cards)


      cards.map((item: { created_at: string | number | Date; }) => {
        item.created_at = new Date(item.created_at).toLocaleDateString(
          'pt-BR');
      });
    });
  }

  // Pedido a API, retorna o objeto pelo ID

  getItem(id:string) {
    return this.http.get(`https://api.unsplash.com/photos/${id}?client_id=${this.key}`)
  }

}



