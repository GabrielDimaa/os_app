import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { OsService } from "../../services/os.service";
import { SnackbarService } from "../../../shared/components/snackbar/snackbar.service";
import { OsSimpleModel } from "../../models/os-simple.model";
import { OsPaginatorModel } from "../../models/os-paginator-model";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { catchError, finalize, map, Observable } from "rxjs";

@Component({
  selector: 'app-listagem-os',
  templateUrl: './listagem-os.component.html',
  styleUrls: ['./listagem-os.component.scss']
})
export class ListagemOsComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tableColumns: string[] = ["codigo", "cliente", "situacao", "data", "equipamentos", "action"];
  dataSource = new MatTableDataSource<OsSimpleModel>();

  osPaginator: OsPaginatorModel | undefined;

  loading: boolean = false;
  loadingFiltro: boolean = false;

  constructor(
    private osService: OsService,
    private snackbarService: SnackbarService
  ) {
  }

  ngAfterViewInit() {
    this.loading = true;

    this.dataSource.sort = this.sort;

    this.buscarOs()
      .pipe(finalize(() => this.loading = false))
      .subscribe();
  }

  public buscarOs(): Observable<OsPaginatorModel | void> {
    this.dataSource.data = [];

    return this.osService.getAllWithPagination({ perPage: this.paginatorPageSize, page: this.paginator.pageIndex + 1 })
      .pipe(
        map(paginatorOs => {
          this.dataSource.data = paginatorOs.osSimplesList;
          this.paginator.length = paginatorOs.total;
          return paginatorOs;
        }),
        catchError(async (err) => this.snackbarService.showError(err))
      );
  }

  public filtrar(): void {
    this.loadingFiltro = true;

    this.buscarOs()
      .pipe(finalize(() => this.loadingFiltro = false))
      .subscribe();
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

  public get paginatorPageSizeOptions(): number[] {
    return [50, 100, 150, 200];
  }

  public handlePageEvent(_: PageEvent): void {
    this.filtrar();
  }
}
