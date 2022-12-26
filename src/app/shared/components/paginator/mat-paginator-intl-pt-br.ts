import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorIntlPtBr extends MatPaginatorIntl {
  override itemsPerPageLabel = "Itens por página";
  override nextPageLabel = "Página seguinte";
  override previousPageLabel = "Página anterior";

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) return "Página 0 de 0";

    const pageCurrent = page + 1;
    const pageFinal = Math.max(1, Math.ceil(length / pageSize));
    return `Página ${pageCurrent} de ${pageFinal}`;
  };
}
