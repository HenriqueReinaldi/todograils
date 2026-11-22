import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../domain/item-model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:8080/item"

  getItens(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl)
  }

  removerItem(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id.toString()}`, { responseType: 'text'} )
  }
}
