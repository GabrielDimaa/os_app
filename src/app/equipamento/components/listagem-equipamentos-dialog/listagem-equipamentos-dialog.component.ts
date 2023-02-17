import { Component, Inject, OnInit } from '@angular/core';
import { EquipamentoModel } from "../../../os/models/equipamento.model";
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { getMessageError } from "../../../shared/validators/validators";
import { EquipamentoService } from "../../services/equipamento.service";
import { ListagemServicosDialogComponent } from "../../../servico/components/listagem-servicos-dialog/listagem-servicos-dialog.component";

export type ListagemEquipamentosParams = {
  equipamento: EquipamentoModel;
  equipamentosList: EquipamentoModel[];
};

@Component({
  selector: 'app-listagem-equipamentos-dialog',
  templateUrl: './listagem-equipamentos-dialog.component.html',
  styleUrls: ['./listagem-equipamentos-dialog.component.scss']
})
export class ListagemEquipamentosDialogComponent implements OnInit {
  public static configDefault(equipamentos: EquipamentoModel[]): MatDialogConfig {
    return {
      data: equipamentos,
      width: '600px',
    };
  }

  public formGroup!: FormGroup;

  public equipamentos: EquipamentoModel[] = [];

  public equipamentoSelecionado: EquipamentoModel | null = null;

  public loading: boolean = false;

  private error: any;

  public get hasError(): boolean {
    return this.error !== undefined && this.error !== null;
  }

  public get messageError(): string {
    return this.error.toString();
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EquipamentoModel[],
    private ref: MatDialogRef<ListagemServicosDialogComponent, ListagemEquipamentosParams>,
    private formBuilder: FormBuilder,
    private service: EquipamentoService
  ) {
    this.equipamentos = data ?? [];
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.loading = true;

      this.formGroup = this.formBuilder.group({
        equipamento: ["", Validators.required],
        equipamentoItem: ["", Validators.required],
      });

      if (this.equipamentos.length == 0) {
        this.equipamentos = await firstValueFrom(this.service.getEquipamentos());
      }
    } catch (e) {
      this.error = e;
    } finally {
      this.loading = false;
    }
  }

  public async onSubmit(): Promise<void> {
    try {
      if (this.formGroup.invalid) return;
      this.formGroup.disable();

      const formData = this.formGroup.value;

      formData.equipamento.itens = [formData.equipamentoItem];
      formData.equipamentoItem.equipamento = formData.equipamento;

      this.ref.close({
        equipamento: formData.equipamento,
        equipamentosList: this.equipamentos
      });
    } catch (e) {
      this.error = e;
    }
  }

  public getError(control: any): string {
    return getMessageError(control);
  }
}
