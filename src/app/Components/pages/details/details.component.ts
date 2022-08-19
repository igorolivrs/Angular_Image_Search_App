import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';
import { ImagesService } from '../../services/images.service';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: any = '';
  date: string = "";
  items: any = [];
  sizeImg: string = '&fit=crop&w=500&h=500'
  isFavorite = false;

  constructor(private imageService: ImagesService,
    private route: ActivatedRoute,
    private router: Router,
    private favoriteService: FavoriteService,
    private messagesService: MessagesService) { }

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
    this.id = this.route.snapshot.paramMap.get('id'); // traz o id do objeto e salva na variavel id
    console.log(this.id);
    this.route.params.subscribe((item) => { // verifica atraves do id se o objeto ja consta nos favoritos
    this.isFavorite = this.favoriteService.checkFavorites(item['id']); 
    });
    this.getOne(); 
  }

  getOne() {
    this.imageService.getItem(this.id) // Faz o pedido http utilizando o id do objeto que está na pagina detalhe
      .subscribe((item: any) => {
        this.items = item;
        console.log(this.items);
      });
  }

  addToFavorite(item: any) { // Pega o item que esta na pagina detalhe e salva('push') na pagina favoritos
    this.favoriteService.addtoFav(item)
    this.messagesService.add("Successfully added to favorites"); // Mostra a mensagem
    this.router.navigate(['/']) // Redireciona para a pagina home
  }

  removeFavorite(item : any){
    this.favoriteService.removeItem(item)
    this.messagesService.add("Successfully removed from favorites");
    this.router.navigate(['/'])
  }

  formatData(data: Date) { // Formatação da data
    return new Date(data).toLocaleDateString(
      'pt-BR');
  }
}
