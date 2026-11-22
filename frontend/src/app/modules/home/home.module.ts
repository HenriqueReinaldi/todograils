import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { RouterModule } from '@angular/router';
import { HOME_ROTAS } from './home.routing';
import { SharedModule } from 'src/app/components/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    ItemCardComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(HOME_ROTAS)
  ],
  exports: [
    ItemCardComponent
  ]
})
export class HomeModule { }
