import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { OsService } from "../../services/os.service";
import { SnackbarService } from "../../../shared/components/snackbar/snackbar.service";
import { OsSimpleModel } from "../../models/os-simple.model";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { catchError, debounceTime, distinctUntilChanged, filter, firstValueFrom, map, Observable, switchMap } from "rxjs";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { EquipamentoModel } from "../../models/equipamento.model";
import { EquipamentoItemModel } from "../../models/equipamento-item.model";
import { OsSituacaoModel } from "../../models/os-situacao.model";
import { MatDateRangePicker } from "@angular/material/datepicker";
import { OsFilterParams } from "../../params/os.params";
import { Router } from "@angular/router";
import { EquipamentoService } from "../../../equipamento/services/equipamento.service";
import { FormControl } from "@angular/forms";
import { ClienteModel } from "../../models/cliente.model";
import { getMessageError } from "../../../shared/validators/validators";

@Component({
  selector: 'app-listagem-os',
  templateUrl: './listagem-os.component.html',
  styleUrls: ['./listagem-os.component.scss']
})
export class ListagemOsComponent implements AfterViewInit {
  @ViewChild(MatDateRangePicker) rangePicker!: MatDateRangePicker<any>;
  @ViewChild('startDate') startDateRef!: ElementRef;
  @ViewChild('endDate') endDateRef!: ElementRef;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public tableColumns: string[] = ["codigo", "clienteDisplay", "situacaoDisplay", "dataHora", "equipamentoDisplay", "action"];
  public dataSource = new MatTableDataSource<OsSimpleModel>();
  public equipamentos: EquipamentoModel[] = [];
  public osSituacoes: OsSituacaoModel[] = [];

  public filtros: OsFilterParams = Object.assign({});

  public loading: boolean = false;
  public loadingFiltro: boolean = false;

  public clientesFiltrados!: Observable<ClienteModel[]>;
  public clienteControl: FormControl = new FormControl();
  public displayCliente = (cliente: ClienteModel): string => cliente && cliente.nome ? cliente.nome : '';

  constructor(
    private osService: OsService,
    private equipamentoService: EquipamentoService,
    private snackbarService: SnackbarService,
    private cdr: ChangeDetectorRef,
    private liveAnnouncer: LiveAnnouncer,
    private router: Router
  ) {
  }

  public async ngAfterViewInit(): Promise<void> {
    try {
      this.loading = true;

      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();

      await this.buscarOs();

      this.equipamentos = await firstValueFrom(this.equipamentoService.getEquipamentos());
      this.osSituacoes = await firstValueFrom(this.osService.getOsSituacoes());

      this.clientesFiltrados = this.clienteControl.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          filter(value => typeof value !== 'object'),
          switchMap(value => this.osService.getClientesContainsName(value).pipe(
            map(clientes => {
              if (clientes.length === 0) this.clienteControl.setErrors({notFound: true});
              return clientes;
            }),
            catchError(_ => {
              this.clienteControl.setErrors({notFound: true})
              return [];
            })
          ))
        );
    } catch (e) {
      this.snackbarService.showError(e);
    } finally {
      this.loading = false;
    }
  }

  public async buscarOs(): Promise<void> {
    this.dataSource.data = [];

    const osPaginator = await firstValueFrom(this.osService.getAllWithPagination({ perPage: this.paginatorPageSize, page: this.paginatorPageCurrent }, this.filtros));

    this.dataSource.data = osPaginator.osSimplesList;
    this.paginator.length = osPaginator.total;
  }

  public async filtrar(): Promise<void> {
    try {
      this.loadingFiltro = true;

      this.filtros.dataInicial = this.startDateRef.nativeElement.value;
      this.filtros.dataFinal = this.endDateRef.nativeElement.value;

      await this.buscarOs();
    } catch (e) {
      this.snackbarService.showError(e);
    } finally {
      this.loadingFiltro = false;
    }
  }

  public async visualizarOs(codigoOs: number): Promise<void> {
    await this.router.navigate([`os/${codigoOs}`]);
  }

  public get paginatorLength(): number {
    return this.paginator?.length ?? 0;
  }

  public get paginatorPageSize(): number {
    return this.paginator?.pageSize ?? 0;
  }

  public get paginatorPageCurrent(): number {
    return (this.paginator?.pageIndex ?? 0) + 1;
  }

  public get paginatorPageSizeOptions(): number[] {
    return [50, 100, 150, 200];
  }

  public async handlePageEvent(_: PageEvent): Promise<void> {
    await this.filtrar();
  }

  public get identificadores(): EquipamentoItemModel[] {
    return this.filtros.equipamento?.itens ?? [];
  }

  public limparDatas(): void {
    this.rangePicker.select(null);
  }

  public get mostrarLimparDatas() {
    return this.startDateRef?.nativeElement.value.length > 0;
  }

  public async criarOs(): Promise<void> {
    await this.router.navigate(['os/criar']);
  }

  public getError(control: any): string {
    return getMessageError(control);
  }
}
