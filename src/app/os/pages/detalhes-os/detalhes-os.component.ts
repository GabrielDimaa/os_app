import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { SnackbarService } from "../../../shared/components/snackbar/snackbar.service";
import { OsService } from "../../services/os.service";
import { OsModel } from "../../models/os.model";
import { OsEquipamentoItemModel } from "../../models/os-equipamento-item.model";
import { OsSituacaoModel } from "../../models/os-situacao.model";
import { OsTipoAtendimentoModel } from "../../models/os-tipo-atendimento.model";

@Component({
  selector: 'app-detalhes-os',
  templateUrl: './detalhes-os.component.html',
  styleUrls: ['./detalhes-os.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetalhesOsComponent implements OnInit {
  private codigoOs: number | null = null;
  public loading: boolean = false;
  public osModel: OsModel | null = null;

  public osSituacoes: OsSituacaoModel[] = [];

  public osTiposAtendimento: OsTipoAtendimentoModel[] = [];

  constructor(
    private osService: OsService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    try {
      this.loading = true;

      this.codigoOs = +this.route.snapshot.params['codigo'];
      if (!isNaN(this.codigoOs)) {
        this.osModel = await firstValueFrom(this.osService.getByCodigo(this.codigoOs));
      }

      this.osSituacoes = await firstValueFrom(this.osService.getOsSituacoes());
      this.osTiposAtendimento = await firstValueFrom(this.osService.getOsTiposAtendimento());
    } catch (e) {
      await this.snackbarService.showError(e);
    }
    finally {
      this.loading = false;
    }
  }

  public get equipamentos(): OsEquipamentoItemModel[] {
    return this.osModel?.equipamentosItens ?? [];
  }
}
