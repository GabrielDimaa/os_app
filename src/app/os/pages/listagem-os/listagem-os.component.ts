import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-listagem-os',
  templateUrl: './listagem-os.component.html',
  styleUrls: ['./listagem-os.component.scss']
})
export class ListagemOsComponent implements AfterViewInit {
  @ViewChild(MatSort)
  sort!: MatSort;

  tableColumns: string[] = ["codigo", "cliente", "situacao", "data", "equipamentos", "action"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}

export interface PeriodicElement {
  codigo: number,
  cliente: string,
  situacao: string,
  data: string,
  equipamentos: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    codigo: 10987,
    cliente: "Gabriel de Matos",
    situacao: "Em desenvolvimento",
    data: '19/11/2022',
    equipamentos: "Sistema Link"
  },
  {
    codigo: 10988,
    cliente: "Thiago Fernandes",
    situacao: "Aguardando versão",
    data: '01/11/2022',
    equipamentos: "Sistema Link"
  },
  {
    codigo: 10989,
    cliente: "Rogérinho",
    situacao: "Em análise",
    data: '22/10/2022',
    equipamentos: "Link Garçom"
  },
  {
    codigo: 10990,
    cliente: "Périclito",
    situacao: "Em desenvolvimento",
    data: '30/05/2022',
    equipamentos: "Navi Vendas"
  },
  {
    codigo: 10991,
    cliente: "Adriana de Matos",
    situacao: "Encerrada",
    data: '02/08/2022',
    equipamentos: "Sistema Link"
  },
];
