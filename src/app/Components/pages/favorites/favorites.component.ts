import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public item : any = [];
  sizeImg: string = '&fit=crop&w=500&h=500'
  constructor(private favoriteService: FavoriteService, private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.favoriteService.getItems()  // Inicializa os itens da variavel itemsList[](em FavoriteService )  
    .subscribe(res =>{this.item = res;})

    this.item.map((item: { created_at: string | number | Date; }) => { // Formatação da data
      item.created_at = new Date(item.created_at).toLocaleDateString('pt-BR');
    });
  }

  removeItem(item : any){ // Remove um item do favorito
    this.favoriteService.removeItem(item);
    this.messagesService.add("Successfully removed from favorites");
  }

  clearFavorite(){ // Remove todos os itens dos favoritos
    this.favoriteService.removeAllItems();
    this.messagesService.add("Successfully removed all favorites");
  }

}
