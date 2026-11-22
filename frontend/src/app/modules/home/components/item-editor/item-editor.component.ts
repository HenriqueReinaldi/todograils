import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Item } from 'src/app/domain/item-model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.scss']
})
export class ItemEditorComponent implements OnChanges, OnDestroy {

  constructor(private itemService: ItemService) {}
  private leitor$: Subject<void> = new Subject()


  //IO
  @Input({ required: true}) itemInput! : Item;
  @Output() fecharOut = new EventEmitter()

  //atrivbutos
  public itemSelecionado!: Item
  public formulario!: FormGroup
  public status: string = ""

  //funcoes
  enviar(): void {
    let item: Item = {
      id: this.itemSelecionado.id,
      prioridade: this.formulario.value.prioridade as number,
      categoria: this.formulario.value.categoria as string,
      descricao: this.formulario.value.descricao as string,
      nome: this.formulario.value.nome as string,
      status: this.formulario.value.status as string,
      termino: this.formulario.value.feito ? new Date().toISOString().split('T')[0] : ""
    }

    this.itemService.atualizarItem(item).pipe(takeUntil(this.leitor$)).subscribe({
      next: (resposta) => {
        this.status = resposta
        console.log(resposta)
        this.fecharOut.emit(true)
      },
      error: (error) => {
        console.log(error)
      }
    })

  }
  fechar(): void{
    this.fecharOut.emit(true)
  }


  //clicos de vida
  ngOnChanges(): void {
    this.itemSelecionado = this.itemInput
    this.formulario = new FormGroup({
      nome: new FormControl(this.itemSelecionado.nome),
      descricao: new FormControl(this.itemSelecionado.descricao),
      categoria: new FormControl(this.itemSelecionado.categoria),
      status: new FormControl(this.itemSelecionado.status),
      prioridade: new FormControl(this.itemSelecionado.prioridade),
      feito: new FormControl(this.itemSelecionado.termino ? true : false)
    })
  }
  ngOnDestroy(): void {
    this.leitor$.next()
    this.leitor$.complete()
  }
}

