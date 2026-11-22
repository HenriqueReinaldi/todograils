import { Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from 'src/app/domain/item-model';
import { ItemService } from 'src/app/services/item.service';


@Component({
  selector: 'app-item-card',
  templateUrl: './item-cards.component.html',
  styleUrls: ['styles.scss']
})
export class ItemCardComponent implements OnInit, OnDestroy{
  //CONSTRUTOR + DESTROY
  constructor ( private itemService:ItemService ) {}
  private readonly destroy$: Subject<void> = new Subject()

  // ATRIBUTOS!
  public mostrandoEditor: boolean = false;
  public itemSelecionado!: Item;

  public filtroStatus: string = '';
  public filtroPrioridade: string = '';
  public filtroCategoria: string = '';
  public filtroQuery: string = '';

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
    this.filtrar()

    this.itemService.getItens(this.filtroQuery).pipe(takeUntil(this.destroy$)).subscribe({
      next: (resposta) => {
        this.itens = resposta
        this.itens = this.itens.sort((a,b) => {
          return a.id - b.id
        })
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
  filtrar() {
    this.filtroQuery = ""

    let filtros: string[] = []

    if (this.filtroStatus != "") {
      filtros.push(`status=${this.filtroStatus}`)
    }
    if (this.filtroCategoria != ""){
      filtros.push(`categoria=${this.filtroCategoria}`)
    }
    if (this.filtroPrioridade != "") {
      filtros.push(`prioridade=${this.filtroPrioridade}`)
    }

    let resultado: string = filtros.join("&")
    if (resultado == "") return

    this.filtroQuery = "?" + resultado
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
