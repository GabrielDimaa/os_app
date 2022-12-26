import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { OsService } from "../../services/os.service";
import { SnackbarService } from "../../../shared/components/snackbar/snackbar.service";
import { OsSimpleModel } from "../../models/os-simple.model";
import { OsPaginatorModel } from "../../models/os-paginator-model";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { firstValueFrom } from "rxjs";
import { LiveAnnouncer } from "@angular/cdk/a11y";

@Component({
  selector: 'app-listagem-os',
  templateUrl: './listagem-os.component.html',
  styleUrls: ['./listagem-os.component.scss']
})
export class ListagemOsComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tableColumns: string[] = ["codigo", "clienteDisplay", "situacaoDisplay", "dataHora", "equipamentoDisplay", "action"];
  dataSource = new MatTableDataSource<OsSimpleModel>();

  osPaginator: OsPaginatorModel | undefined;

  loading: boolean = false;
  loadingFiltro: boolean = false;

  constructor(
    private osService: OsService,
    private snackbarService: SnackbarService,
    private cdr: ChangeDetectorRef,
    private _liveAnnouncer: LiveAnnouncer
  ) {
  }

  public async ngAfterViewInit(): Promise<void> {
    try {
      this.loading = true;
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();

      await this.buscarOs();
    } catch (e) {
      this.snackbarService.showError(e);
    } finally {
      this.loading = false;
    }
  }

  public async buscarOs(): Promise<void> {
    this.dataSource.data = [];

    const osPaginator = await firstValueFrom(this.osService.getAllWithPagination({ perPage: this.paginatorPageSize, page: this.paginatorPageCurrent }));

    this.dataSource.data = osPaginator.osSimplesList;
    this.paginator.length = osPaginator.total;
  }

  public async filtrar(): Promise<void> {
    try {
      this.loadingFiltro = true;

      await this.buscarOs();
    } catch (e) {
      this.snackbarService.showError(e);
    } finally {
      this.loadingFiltro = false;
    }
  }

  public get paginatorLength(): number {
    return this.paginator?.length ?? 0;
  }

  public get paginatorHidden(): boolean {
    return this.paginatorLength > 0;
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
}
