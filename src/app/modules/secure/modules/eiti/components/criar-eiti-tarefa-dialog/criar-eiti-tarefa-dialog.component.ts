import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EitiService } from "../../services/eiti_service";
import { getMessageError } from "../../../../../../shared/validators/validators";
import OsEntity from "../../../os/entities/os.entity";
import TarefaEitiEntity from "../../entities/eiti_tarefa.entity";
import { firstValueFrom } from "rxjs";
import OsEquipamentoItemEntity from "../../../os/entities/os-equipamento-item.entity";
import { SnackbarService } from "../../../../../../shared/components/snackbar/snackbar.service";

@Component({
  selector: 'app-criar-eiti-tarefa-dialog',
  templateUrl: './criar-eiti-tarefa-dialog.component.html',
  styleUrls: ['./criar-eiti-tarefa-dialog.component.scss']
})
export class CriarEitiTarefaDialogComponent implements OnInit {
  public criandoTarefa: boolean = false;

  public os: OsEntity;

  public formGroup!: FormGroup;

  public get equipamentoSelecionado(): OsEquipamentoItemEntity {
    return this.os.equipamentosItens[0];
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OsEntity,
    private ref: MatDialogRef<CriarEitiTarefaDialogComponent>,
    private formBuilder: FormBuilder,
    private service: EitiService,
    private snackbarService: SnackbarService,
  ) {
    this.os = data;
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      titulo: [this.equipamentoSelecionado.problemaReclamado?.split('\n')[0].substring(0, 80).trim() ?? "", Validators.required],
      descricao: [this.equipamentoSelecionado.problemaReclamado ?? "", Validators.required],
    });
  }

  public async onSubmit(): Promise<void> {
    try {
      if (this.formGroup.invalid) return;
      this.formGroup.disable();

      this.criandoTarefa = true;

      const formData = this.formGroup.value;

      if (this.os?.codigo == null || this.os!.codigo == 0)
        throw Error("Para criar a tarefa é necessário salvar a OS.");

      if (!this.equipamentoSelecionado.equipamentoItem.equipamento)
        throw Error("Informe um equipamento para a OS.");

      const tarefaEiti = new TarefaEitiEntity(
        this.os!.codigo!,
        this.equipamentoSelecionado.equipamentoItem.equipamento!.descricao,
        formData.titulo.charAt(0).toUpperCase() + formData.titulo.slice(1).toLowerCase(),
        formData.descricao.charAt(0).toUpperCase() + formData.descricao.slice(1).toLowerCase()
      );

      await firstValueFrom(this.service.save(tarefaEiti));

      this.ref.close();
      this.snackbarService.showSuccess("Tarefa criada com sucesso!");
    } catch (e) {
      this.snackbarService.showError(e);
    } finally {
      this.formGroup.enable();
      this.criandoTarefa = false;
    }
  }

  public getError(control: any): string {
    return getMessageError(control);
  }
}
