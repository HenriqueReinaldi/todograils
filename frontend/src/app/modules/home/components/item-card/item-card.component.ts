import { Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from 'src/app/domain/item-model';
import { ItemService } from 'src/app/services/item.service';


@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['styles.scss']
})
export class ItemCardComponent implements OnInit, OnDestroy{
  //CONSTRUTOR + DESTROY
  constructor ( private itemService:ItemService ) {}
  private readonly destroy$: Subject<void> = new Subject()

  // ATRIBUTOS!
  public mostrandoEditor: boolean = false;
  public itemSelecionado!: Item;

  public itens: Item[] = [];
  public status: string = "nada acontecendo!";
  public explodindo: Set<number> = new Set<number>();

  // FUNCOES
  deletar(item: Item): void {
    this.itemService.removerItem(item.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (resposta) => {
        console.log(resposta)
        this.explodindo.add(item.id)
        setTimeout(() => {
          this.status = `${resposta}: item ${item.id}`
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
  mostrarEditor(item: Item): void {
    this.itemSelecionado = item
    this.mostrandoEditor = true
  }

  //CICLOS DE VIDA
  ngOnInit(): void {
    this.getItens()
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
