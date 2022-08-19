import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagesService } from '../../services/images.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Items: any = [];
  Search: any = [];
  searchKeyword = '';
  key = "dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578";

  searchLength: any;
  page: number = 1;
  searchPage: number = 1;
  sizeImg: string = '&fit=crop&w=500&h=500'

  constructor(public imageService: ImagesService,
    private http: HttpClient,
    private router: Router,
    private modal: NgbModal) {this.imageService.getImages(1)} // Metodo inicializa os objetos e passa o parametro da pagina

  ngOnInit(): void {
  }

  searchImage(searchPage: number) { // Faz o pedido http com o a variavel searchKeyword
    if (this.searchKeyword === '') { // abre o modal caso a variavel esteja fazia
      this.modal.open(ModalComponent);
    }
    return this.http.get(`https://api.unsplash.com/search/photos?client_id=${this.key}&page=${searchPage}&per_page=24&query=${this.searchKeyword}`).subscribe((res: any) => {
      if (res.total == 0) {
        this.router.navigate(['not-found']); // Se o resultado retornar um array 0, é redirecionado para a pagina not-found
      } else {
        this.Search = res['results'];
        this.searchLength = this.Search.length;
        console.log(res);
        console.log(this.searchLength);
      }

      this.Search.map((item: { created_at: string | number | Date; }) => { // Formatação da data
        item.created_at = new Date(item.created_at).toLocaleDateString('pt-BR');
      });
    });
  }
  
  // Refresh na pagina quando for realizado um search
  refresh() {
    window.location.reload();
  }

  // Paginação

  next(){
    this.page = this.imageService.page +=1;
    this.imageService.images = [];
    this.imageService.getImages(this.page);
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  previous() {
    this.page = this.imageService.page -=1;
    this.imageService.images = [];
    this.imageService.getImages(this.page);
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Paginação do Search

  nextSearch(){
    debugger;
    this.searchPage = this.searchPage += 1;
    this.Search = [];
    this.searchImage(this.searchPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  previousSearch() {
    this.searchPage = this.searchPage -= 1;
    this.Search = [];
    this.searchImage(this.searchPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

}



