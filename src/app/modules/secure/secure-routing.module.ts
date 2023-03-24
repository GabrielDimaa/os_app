import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { TemplateComponent } from "./templates/template.component";
import { AuthGuard } from "../../guards/auth.guard";

const _routes: Routes = [
  {
    path: "",
    component: TemplateComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: "",
        // loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        redirectTo: "os",
        pathMatch: 'full'
      },
      {
        path: "os",
        loadChildren: () => import('./modules/os/os.module').then(m => m.OsModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(_routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule {
}
