import { Subject, takeUntil } from 'rxjs';
import { ItemService } from './../../services/item.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from 'src/app/domain/item-model';


@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['styles.scss']
})
export class ItemCardComponent implements OnInit, OnDestroy{
  constructor ( private itemService:ItemService ) {}

  private readonly destroy$: Subject<void> = new Subject()
  public itens: Item[] = [];
  public status: string = "";
  public explodindo: Set<number> = new Set<number>();

  deletar(item: Item): void {
    this.itemService.removerItem(item.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (resposta) => {
        console.log(resposta)
        this.explodindo.add(item.id)
        setTimeout(() => {
          this.status = resposta
          this.getItens()
        }, 300);
      },
      error: (err) => {
        console.log(err)
      }
    })
    this.getItens()
  }


  getItens() {
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

  ngOnInit(): void {
    this.getItens()
  }


  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
