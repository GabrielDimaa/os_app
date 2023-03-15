import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListagemOsComponent } from "./pages/listagem-os/listagem-os.component";
import { DetalhesOsComponent } from "./pages/detalhes-os/detalhes-os.component";
import { AuthGuard } from "../../../../guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: ListagemOsComponent,
      },
      {
        path: ":codigo",
        component: DetalhesOsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OsRoutingModule {
}
