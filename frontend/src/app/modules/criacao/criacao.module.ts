import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriacaoHomeComponent } from './components/criacao-home/criacao-home.component';
import { RouterModule } from '@angular/router';
import { CRIACAO_ROTAS } from './criacao.routing';
import { SharedModule } from 'src/app/components/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CriacaoHomeComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(CRIACAO_ROTAS)
  ]
})
export class CriacaoModule { }
