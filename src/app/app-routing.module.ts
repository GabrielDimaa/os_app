import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./guards/auth.guard";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
  ///Importante manter as rotas em "ordem".
  ///Ex: AuthGuard irá redirecionar o AuthModule caso não tenha token, portanto deve ficar antes do SecureModule.
  {
    path: "auth",
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "",
    loadChildren: () => import('./modules/secure/secure.module').then(m => m.SecureModule),
    canLoad: [AuthGuard]
  },
  {
    path: "**",
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
