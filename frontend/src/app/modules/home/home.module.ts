import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { RouterModule } from '@angular/router';
import { HOME_ROTAS } from './home.routing';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    ItemCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROTAS)
  ],
  exports: [
    ItemCardComponent
  ]
})
export class HomeModule { }
