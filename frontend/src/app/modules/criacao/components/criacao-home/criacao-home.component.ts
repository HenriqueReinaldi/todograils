import { ItemService } from 'src/app/services/item.service';
import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Item } from 'src/app/domain/item-model';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-criacao-home',
  templateUrl: './criacao-home.component.html',
  styleUrls: ['./criacao-home.component.scss']
})
export class CriacaoHomeComponent implements OnDestroy{
  public status = "nada acontecendo!"

  constructor (private itemService: ItemService) {}

  private readonly recebimento$: Subject<void> = new Subject()
  ngOnDestroy(): void {
    this.recebimento$.next()
    this.recebimento$.complete()
  }

  public formulario = new FormGroup({
    nome: new FormControl('', Validators.required),
    descricao: new FormControl(''),
    categoria: new FormControl(''),
    status: new FormControl('TODO'),
    prioridade: new FormControl(1, Validators.required)
  })

  enviar(): void{
    let item: Item = {
      id: 0,
      prioridade: this.formulario.value.prioridade as number,
      categoria: this.formulario.value.categoria as string,
      descricao: this.formulario.value.descricao as string,
      nome: this.formulario.value.nome as string,
      status: this.formulario.value.status as string,
      termino: undefined
    }
    this.itemService.adicionarItem(item).pipe(takeUntil(this.recebimento$)).subscribe({
      next: (response) => {
        this.status = `Criada nova tarefa! ID:${response.id}`
      },
      error: (error) => {
        console.log(error)
      }
    })

    console.log(this.formulario.value as Item)
  }
}
