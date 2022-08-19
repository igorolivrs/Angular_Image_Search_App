import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  public favItemList : any = [];
  public itemsList = new BehaviorSubject<any>([]);

  constructor() { }

  getItems(){
    return this.itemsList.asObservable();
  }

  setItems(item : any){
    this.favItemList.push(...item);
    this.itemsList.next(item);
  }

  addtoFav(item : any){
    this.favItemList.push(item);
    this.itemsList.next(this.favItemList);
    console.log(this.favItemList)
  }

  removeItem(item : any){
    this.favItemList.map((a:any, index:any)=>{
      if(item.id === a.id){
        this.favItemList.splice(index,1);
      }
    })
  }

  // Verifica por meio do ID se um objeto ja consta no favItemList[]
  checkFavorites(id: string): boolean {
    return this.favItemList.find((x: { id: string; }) => x.id == id) == undefined;
  }

  removeAllItems(){
    this.favItemList = []
    this.itemsList.next(this.favItemList);
  }
}
