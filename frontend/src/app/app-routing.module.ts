import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CriacaoHomeComponent } from './modules/criacao/components/criacao-home/criacao-home.component';
import { HomeComponent } from './modules/home/components/home/home.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: 'full',
  },
  {
    path: "home",
    loadChildren: () => import("./modules/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "novo",
    loadChildren: () => import("./modules/criacao/criacao.module").then(m => m.CriacaoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
