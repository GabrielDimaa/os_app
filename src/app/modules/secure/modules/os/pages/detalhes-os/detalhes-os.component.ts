import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, debounceTime, distinctUntilChanged, filter, firstValueFrom, map, Observable, startWith, switchMap } from "rxjs";
import { SnackbarService } from "../../../../../../shared/components/snackbar/snackbar.service";
import { OsService } from "../../services/os.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { getMessageError } from "../../../../../../shared/validators/validators";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatStepper } from "@angular/material/stepper";
import { AuthService } from "../../../../../auth/services/auth.service";
import { ListagemServicosDialogComponent } from "../../../servico/components/listagem-servicos-dialog/listagem-servicos-dialog.component";
import { ListagemEquipamentosDialogComponent, ListagemEquipamentosParams } from "../../../equipamento/components/listagem-equipamentos-dialog/listagem-equipamentos-dialog.component";
import { ServicoService } from "../../../servico/services/servico.service";
import { ConfirmacaoDialogComponent, ConfirmacaoDialogData } from "../../../../../../shared/components/dialogs/confirmacao-dialog/confirmacao-dialog.component";
import OsEntity from "../../entities/os.entity";
import OsSituacaoEntity from "../../entities/os-situacao.entity";
import OsTipoAtendimentoEntity from "../../entities/os-tipo-atendimento.entity";
import UsuarioEntity from "../../entities/usuario.entity";
import ClienteEntity from "../../../cliente/entities/cliente.entity";
import ServicoEntity from "../../../servico/entities/servico.entity";
import EquipamentoEntity from "../../../equipamento/entities/equipamento.entity";
import OsEquipamentoItemEntity from "../../entities/os-equipamento-item.entity";
import OsServicoEntity from "../../entities/os-servico.entity";
import { InfoClienteDialogComponent } from "../../../cliente/info-cliente-dialog/info-cliente-dialog.component";
import { MatAutocomplete } from "@angular/material/autocomplete";

@Component({
  selector: 'app-detalhes-os',
  templateUrl: './detalhes-os.component.html',
  styleUrls: ['./detalhes-os.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetalhesOsComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('autocompleteCliente') autocompleteCliente!: MatAutocomplete;

  public loading: boolean = false;
  public encerrandoOs: boolean = false;
  public excluindo: boolean = false;
  public salvando: boolean = false;

  public get acoesDesabilitadas(): boolean {
    return this.loading || this.encerrandoOs || this.excluindo || this.salvando;
  }

  private codigoOs: number | null = null;
  public osEntity: OsEntity | null = null;

  public formGroup!: FormGroup;

  public osSituacoes: OsSituacaoEntity[] = [];

  public osTiposAtendimento: OsTipoAtendimentoEntity[] = [];

  public clientesFiltrados!: Observable<ClienteEntity[]>;

  public usuarios: UsuarioEntity[] = [];

  public usuariosFiltrados!: Observable<UsuarioEntity[]>;

  public usuarioLogado!: UsuarioEntity;

  public servicos: ServicoEntity[] = [];

  public equipamentos: EquipamentoEntity[] = [];
  public equipamentoSelecionado: OsEquipamentoItemEntity | null = null;

  constructor(
    private osService: OsService,
    private servicoService: ServicoService,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.loading = true;

      this.codigoOs = +this.route.snapshot.params['codigo'];
      if (!isNaN(this.codigoOs)) {
        this.osEntity = await firstValueFrom(this.osService.getByCodigo(this.codigoOs));
      } else {
        if (this.route.snapshot.params['codigo'] != "novo") return;
      }

      const promiseAll = await Promise.all([
        firstValueFrom(this.osService.getOsSituacoes()),
        firstValueFrom(this.osService.getOsTiposAtendimento()),
        firstValueFrom(this.osService.getOsSituacoes()),
        firstValueFrom(this.osService.getOsTiposAtendimento()),
        firstValueFrom(this.servicoService.getServicos()),
        firstValueFrom(this.osService.getUsuarios())
      ]);

      this.osSituacoes = promiseAll[0];
      this.osTiposAtendimento = promiseAll[1];
      this.osSituacoes = promiseAll[2];
      this.osTiposAtendimento = promiseAll[3];
      this.servicos = promiseAll[4];
      this.usuarios = promiseAll[5];

      const usuarioLogado: UsuarioEntity | null = this.authService.getUsuarioLogado();
      const usuarioCarregado = this.usuarios.find(u => u.id === usuarioLogado?.id);
      if (!usuarioCarregado) throw Error("Faça login para acessar os detalhes da OS.");

      this.usuarioLogado = usuarioCarregado!;

      this.osEntity ??= OsEntity.novo(this.usuarioLogado);

      this.osEntity!.situacao = this.osSituacoes.find(s => s.id === this.osEntity?.situacao?.id)!;
      this.osEntity!.tipoAtendimento = this.osTiposAtendimento.find(t => t.id === this.osEntity?.tipoAtendimento?.id)!;

      if (this.osEntity.equipamentosItens.length > 0)
        this.equipamentoSelecionado = this.osEntity.equipamentosItens[0];

      this.createForm();
    } catch (e) {
      this.snackbarService.showError(e);
    } finally {
      this.loading = false;
    }
  }

  public async salvar(): Promise<void> {
    try {
      this.formGroup.markAllAsTouched();

      if (this.formGroup.invalid) return;
      this.formGroup.disable();

      //Caso [this.encerrandoOs] seja true, não é necessário atribuir o valor para [this.salvando]. Senão ficará loading nos dois botões.
      if (!this.encerrandoOs) this.salvando = true;

      const formData = this.formGroup.value;

      //Validações desta maneira, pois é possível digitar no autocomplete e não selecionar nenhum dos resultados sugeridos.
      if (typeof formData.cliente !== 'object') {
        throw Error("Cliente não selecionado.");
      } else {
        this.osEntity!.cliente = formData.cliente;
      }

      if (formData.responsavel != null && formData.responsavel != "") {
        if (typeof formData.responsavel !== 'object')
          throw Error("Responsável não selecionado.");

        this.osEntity!.responsavel = formData.responsavel;
      }

      this.osEntity!.dataHora = formData.dataAbertura;
      this.osEntity!.tipoAtendimento = formData.tipoAtendimento;
      this.osEntity!.situacao = formData.situacao;
      this.osEntity!.obs = formData.observacao;
      this.osEntity!.nomeContato = formData.nomeContato;
      this.osEntity!.foneContato = formData.foneContato;

      this.osEntity!.validate();

      this.osEntity = await firstValueFrom(this.osService.save(this.osEntity!));
      //Seta o primeiro já que as OS internas só terão um equipamento.
      this.onChipEquipamento(this.osEntity.equipamentosItens[0]);

      this.snackbarService.showSuccess(`OS ${ this.osEntity!.codigo } salva com sucesso!`);
    } catch (e) {
      this.snackbarService.showError(e);
    } finally {
      this.salvando = false;
      this.formGroup.enable();
    }
  }

  private createForm(): void {
    this.formGroup = this.formBuilder.group({
      dataAbertura: new FormControl(this.osEntity?.dataHora, Validators.required),
      tipoAtendimento: [this.osEntity?.tipoAtendimento, Validators.required],
      situacao: [this.osEntity?.situacao, Validators.required],
      observacao: [this.osEntity?.obs],
      cliente: [this.osEntity?.cliente, Validators.required],
      nomeContato: [this.osEntity?.nomeContato],
      foneContato: [this.osEntity?.foneContato],
      responsavel: [this.osEntity?.responsavel]
    });

    this.clientesFiltrados = this.formGroup.controls['cliente'].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(value => typeof value !== 'object'),
        switchMap(value => this.osService.getClientesContainsName(value).pipe(
          map(clientes => {
            if (clientes.length === 0) this.formGroup.controls['cliente'].setErrors({ notFound: true });
            return clientes;
          }),
          catchError(_ => {
            this.formGroup.controls['cliente'].setErrors({ notFound: true })
            return [];
          })
        ))
      );

    this.usuariosFiltrados = this.formGroup.controls['responsavel'].valueChanges
      .pipe(
        startWith(this.osEntity?.responsavel?.nome),
        map(value => this.usuarios.filter(usuario => usuario.nome.toLowerCase().includes(value?.toLowerCase())))
      );
  }

  public displayCliente = (cliente: ClienteEntity): string => cliente && cliente.nome ? cliente.nome : '';
  public displayUsuario = (user: UsuarioEntity): string => user && user.nome ? user.nome : '';

  public getError = (control: any): string => getMessageError(control);

  public get osEquipamentos(): OsEquipamentoItemEntity[] {
    return this.osEntity?.equipamentosItens ?? [];
  }

  public get osSituacoesDisplay(): OsSituacaoEntity[] {
    const tipoAtendimento = this.formGroup.controls['tipoAtendimento'].value

    if (!tipoAtendimento)
      return this.osSituacoes;

    return this.osSituacoes.filter(s => s.descricao.substring(0, 1) == tipoAtendimento!.descricao.substring(0, 1) || s.encerrada);
  }

  public onChipEquipamento(equipamento: OsEquipamentoItemEntity): void {
    this.equipamentoSelecionado = equipamento;
  }

  public async adicionarEquipamento(): Promise<void> {
    try {
      const dialog = this.dialog.open(ListagemEquipamentosDialogComponent, ListagemEquipamentosDialogComponent.configDefault(this.equipamentos)) as MatDialogRef<ListagemEquipamentosDialogComponent, ListagemEquipamentosParams>;
      const props = await firstValueFrom(dialog.afterClosed());

      if (props) {
        const osEquipamentoItemEntity = OsEquipamentoItemEntity.novo(props.equipamento.itens![0], this.osEntity!.id);
        this.equipamentos = props.equipamentosList;

        this.osEntity?.equipamentosItens.push(osEquipamentoItemEntity);
        this.equipamentoSelecionado = osEquipamentoItemEntity;
      }
    } catch (e) {
      this.snackbarService.showError(e);
    }
  }

  public async excluirEquipamento(equipamento: OsEquipamentoItemEntity): Promise<void> {
    if (this.osEntity) {
      const dialog = this.dialog.open<ConfirmacaoDialogComponent, ConfirmacaoDialogData, boolean | undefined | null>(ConfirmacaoDialogComponent, {
        data: { titulo: "Excluir equipamento", mensagem: "Deseja realmente excluir este equipamento?" },
      });

      const confirmacao = await firstValueFrom(dialog.afterClosed());

      if (confirmacao === true) {
        this.osEntity!.equipamentosItens = this.osEntity?.equipamentosItens.filter(e => e != equipamento);
        this.equipamentoSelecionado = this.osEntity!.equipamentosItens.length > 0 ? this.osEntity!.equipamentosItens[0] : null;
      }
    }
  }

  public async adicionarServico(equipamento: OsEquipamentoItemEntity): Promise<void> {
    try {
      const dialog = this.dialog.open(ListagemServicosDialogComponent, ListagemServicosDialogComponent.configDefault(this.servicos));
      const servico = await firstValueFrom(dialog.afterClosed());

      if (servico) {
        const osServico = new OsServicoEntity(
          null,
          equipamento.id,
          "1",
          null,
          null,
          new Date(),
          servico,
          this.usuarioLogado,
        );

        equipamento.servicos.push(osServico);
        setTimeout(() => this.stepper.selectedIndex = this.stepper.steps.length - 1);
      }
    } catch (e) {
      this.snackbarService.showError(e);
    }
  }

  public excluirServico(equipamento: OsEquipamentoItemEntity, servico: OsServicoEntity): void {
    equipamento.servicos = equipamento.servicos.filter(s => s !== servico);
  }

  public aprovarOs(): void {
    this.osEntity!.dataHoraAprovacao = new Date();
    this.osEntity!.usuarioAprovacao = this.usuarioLogado;
  }

  public async encerrarOs(): Promise<void> {
    try {
      this.encerrandoOs = true;

      if (this.osEntity!.dataHoraAprovacao == null)
        this.aprovarOs();

      this.osEntity!.dataHoraEncerramento = new Date();
      this.osEntity!.usuarioEncerramento = this.usuarioLogado;
      this.osEntity!.situacao = this.osSituacoes.find(s => s.encerrada)!;
      this.formGroup.controls['situacao'].setValue(this.osEntity!.situacao);

      await this.salvar();
    } finally {
      this.encerrandoOs = false;
    }
  }

  public async excluir(): Promise<void> {
    try {
      const dialog = this.dialog.open<ConfirmacaoDialogComponent, ConfirmacaoDialogData, boolean | undefined | null>(ConfirmacaoDialogComponent, {
        data: { titulo: "Excluir OS", mensagem: "Deseja realmente excluir esta OS?" },
      });

      const confirmacao = await firstValueFrom(dialog.afterClosed());

      if (confirmacao === true) {
        this.excluindo = true;

        await firstValueFrom(this.osService.excluir(this.osEntity!));
        this.snackbarService.showSuccess(`OS ${ this.osEntity!.codigo } excluída!`);
        await this.router.navigate(['os']);
      }
    } catch (e) {
      this.snackbarService.showError(e);
    } finally {
      this.excluindo = false;
    }
  }


  public get clienteSelecionado() {
    const cliente = this.formGroup.controls['cliente'].value;
    return typeof cliente !== 'object' ? null : cliente;
  }

  public async visualizarCliente(): Promise<void> {
    this.dialog.open(InfoClienteDialogComponent, { data: this.clienteSelecionado, width: '1200px' });
  }

  public goBack(): void {
    window.history.back();
  }
}
