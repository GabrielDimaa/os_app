import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OsRoutingModule } from './os-routing.module';
import { SharedModule } from "../../../../shared/shared.module";
import { ListagemOsComponent } from './pages/listagem-os/listagem-os.component';
import { DetalhesOsComponent } from './pages/detalhes-os/detalhes-os.component';
import { EquipamentoModule } from "../equipamento/equipamento.module";
import { ServicoModule } from "../servico/servico.module";
import { ClienteModule } from "../cliente/cliente.module";
import { EitiModule } from "../eiti/eiti_module";

@NgModule({
  declarations: [
    ListagemOsComponent,
    DetalhesOsComponent
  ],
  imports: [
    CommonModule,
    OsRoutingModule,
    SharedModule,
    EquipamentoModule,
    ServicoModule,
    ClienteModule,
    EitiModule
  ]
})
export class OsModule {
}
