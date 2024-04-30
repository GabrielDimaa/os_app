import { NgModule } from '@angular/core';
import { SecureRoutingModule } from "./secure-routing.module";
import { ToolbarComponent } from "./templates/toolbar/toolbar.component";
import { TemplateComponent } from "./templates/template.component";
import { SharedModule } from "../../shared/shared.module";
import { CriarEitiTarefaDialogComponent } from './modules/eiti/components/criar-eiti-tarefa-dialog/criar-eiti-tarefa-dialog.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    TemplateComponent,
  ],
    imports: [
        SecureRoutingModule,
        SharedModule,
    ]
})
export class SecureModule {
}
