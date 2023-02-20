import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { catchError, debounceTime, distinctUntilChanged, filter, firstValueFrom, map, Observable, startWith, switchMap } from "rxjs";
import { SnackbarService } from "../../../shared/components/snackbar/snackbar.service";
import { OsService } from "../../services/os.service";
import { OsModel } from "../../models/os.model";
import { OsEquipamentoItemModel } from "../../models/os-equipamento-item.model";
import { OsSituacaoModel } from "../../models/os-situacao.model";
import { OsTipoAtendimentoModel } from "../../models/os-tipo-atendimento.model";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { getMessageError } from "../../../shared/validators/validators";
import { UsuarioModel } from "../../models/usuario.model";
import { ServicoModel } from "../../models/servico.model";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { OsServicoModel } from "../../models/os-servico.model";
import { MatStepper } from "@angular/material/stepper";
import { AuthService } from "../../../auth/services/auth.service";
import { ClienteModel } from "../../models/cliente.model";
import { EquipamentoModel } from "../../models/equipamento.model";
import { ListagemServicosDialogComponent } from "../../../servico/components/listagem-servicos-dialog/listagem-servicos-dialog.component";
import { ListagemEquipamentosParams, ListagemEquipamentosDialogComponent } from "../../../equipamento/components/listagem-equipamentos-dialog/listagem-equipamentos-dialog.component";
import { ServicoService } from "../../../servico/services/servico.service";

@Component({
  selector: 'app-detalhes-os',
  templateUrl: './detalhes-os.component.html',
  styleUrls: ['./detalhes-os.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetalhesOsComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  private codigoOs: number | null = null;
  public loading: boolean = false;
  public osModel: OsModel | null = null;

  public formGroup!: FormGroup;

  public osSituacoes: OsSituacaoModel[] = [];

  public osTiposAtendimento: OsTipoAtendimentoModel[] = [];

  public clientesFiltrados!: Observable<ClienteModel[]>;

  public usuarios: UsuarioModel[] = [];

  public usuariosFiltrados!: Observable<UsuarioModel[]>;

  public usuarioLogado!: UsuarioModel;

  public servicos: ServicoModel[] = [];

  public equipamentos: EquipamentoModel[] = [];

  constructor(
    private osService: OsService,
    private servicoService: ServicoService,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.loading = true;

      this.codigoOs = +this.route.snapshot.params['codigo'];
      if (!isNaN(this.codigoOs)) {
        this.osModel = await firstValueFrom(this.osService.getByCodigo(this.codigoOs));
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

      const usuarioLogado: UsuarioModel | null = this.authService.getUsuarioLogado();
      const usuarioCarregado = this.usuarios.find(u => u.id === usuarioLogado?.id);
      if (!usuarioCarregado) throw Error("Faça login para acessar os detalhes da OS.");

      this.usuarioLogado = usuarioCarregado!;

      this.osModel ??= OsModel.novo(this.usuarioLogado);

      this.osModel!.situacao = this.osSituacoes.find(s => s.id === this.osModel?.situacao?.id)!;
      this.osModel!.tipoAtendimento = this.osTiposAtendimento.find(t => t.id === this.osModel?.tipoAtendimento?.id)!;

      this.createForm();
    } catch (e) {
      this.snackbarService.showError(e);
    } finally {
      this.loading = false;
    }
  }

  public async adicionarServico(equipamento: OsEquipamentoItemModel): Promise<void> {
    try {
      const dialog = this.dialog.open(ListagemServicosDialogComponent, ListagemServicosDialogComponent.configDefault(this.servicos));
      const servico = await firstValueFrom(dialog.afterClosed());

      if (servico) {
        const osServico = new OsServicoModel(
          null,
          equipamento.id,
          "1",
          null,
          null,
          new Date(), servico,
          this.usuarioLogado,
        );

        equipamento.servicos.push(osServico);
        setTimeout(() => this.stepper.selectedIndex = this.stepper.steps.length - 1);
      }
    } catch (e) {
      this.snackbarService.showError(e);
    }
  }

  public async adicionarEquipamento(): Promise<void> {
    try {
      const dialog = this.dialog.open(ListagemEquipamentosDialogComponent, ListagemEquipamentosDialogComponent.configDefault(this.equipamentos)) as MatDialogRef<ListagemEquipamentosDialogComponent, ListagemEquipamentosParams>;
      const props = await firstValueFrom(dialog.afterClosed());

      if (props) {
        const osEquipamentoItemModel = OsEquipamentoItemModel.novo(props.equipamento.itens![0], this.osModel!.id);
        this.equipamentos = props.equipamentosList;

        this.osModel?.equipamentosItens.push(osEquipamentoItemModel);
      }
    } catch (e) {
      this.snackbarService.showError(e);
    }
  }

  public async onSubmit(): Promise<void> {
    try {
      this.loading = true;

      if (this.formGroup.invalid) return;
      this.formGroup.disable();
    } catch (e) {
      this.snackbarService.showError(e);
    } finally {
      this.loading = false;
      this.formGroup.enable();
    }
  }

  private createForm(): void {
    this.formGroup = this.formBuilder.group({
      dataAbertura: new FormControl(this.osModel?.dataHora, Validators.required),
      tipoAtendimento: [this.osModel?.tipoAtendimento, Validators.required],
      situacao: [this.osModel?.situacao, Validators.required],
      observacao: [this.osModel?.obs],
      cliente: [this.osModel?.cliente, Validators.required],
      nomeContato: [this.osModel?.nomeContato],
      foneContato: [this.osModel?.foneContato],
      responsavel: [this.osModel?.responsavel]
    });

    this.clientesFiltrados = this.formGroup.controls['cliente'].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(value => typeof value !== 'object'),
        switchMap(value => this.osService.getClientesContainsName(value).pipe(
          map(clientes => {
            if (clientes.length === 0) this.formGroup.controls['cliente'].setErrors({notFound: true});
            return clientes;
          }),
          catchError(_ => {
            this.formGroup.controls['cliente'].setErrors({notFound: true})
            return [];
          })
        ))
      );

    this.usuariosFiltrados = this.formGroup.controls['responsavel'].valueChanges
      .pipe(
        startWith(this.osModel?.responsavel?.nome),
        map(value => this.usuarios.filter(usuario => usuario.nome.toLowerCase().includes(value?.toLowerCase())))
      );
  }

  public displayCliente = (cliente: ClienteModel): string => cliente && cliente.nome ? cliente.nome : '';
  public displayUsuario = (user: UsuarioModel): string => user && user.nome ? user.nome : '';

  public getError(control: any): string {
    return getMessageError(control);
  }

  public get osEquipamentos(): OsEquipamentoItemModel[] {
    return this.osModel?.equipamentosItens ?? [];
  }
}
