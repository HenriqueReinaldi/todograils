import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ItemCardComponent } from './components/item-cards/item-cards.component';
import { RouterModule } from '@angular/router';
import { HOME_ROTAS } from './home.routing';
import { SharedModule } from 'src/app/components/shared.module';
import { ItemEditorComponent } from './components/item-editor/item-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    ItemCardComponent,
    ItemEditorComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(HOME_ROTAS)
  ],
  exports: [
    ItemCardComponent
  ]
})
export class HomeModule { }
