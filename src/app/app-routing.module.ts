
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'load',
    loadChildren: () => import('../app/modules/load/load.module').then(m => m.LoadModule)
  },
  {
    path: 'search',
    loadChildren: () => import('../app/modules/search/search.module').then(m => m.SearchModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
