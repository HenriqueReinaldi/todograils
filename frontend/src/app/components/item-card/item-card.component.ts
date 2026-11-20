import { Subject, takeUntil } from 'rxjs';
import { ItemService } from './../../services/item.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from 'src/app/domain/item-model';


@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: []
})
export class ItemCardComponent implements OnInit, OnDestroy{
  constructor (private itemService:ItemService ) {}

  private readonly destroy$: Subject<void> = new Subject()
  public itens: Item[] = [];


  ngOnInit(): void {
    this.itemService.getItens().pipe(takeUntil(this.destroy$)).subscribe({
      next: (resposta) => {
        this.itens = resposta
        console.log(resposta)
      },
      error: (err) => {
        console.log(err)
      }
    })

  }


  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
