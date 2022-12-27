import { OsSituacaoModel } from "../models/os-situacao.model";
import { ClienteModel } from "../models/cliente.model";
import { EquipamentoModel } from "../models/equipamento.model";
import { EquipamentoItemModel } from "../models/equipamento-item.model";

type OsPaginatorParams = {
  page: number;
  perPage: number;
}

type OsFilterParams = {
  dataInicial: string | null;
  dataFinal: string | null;
  situacao: OsSituacaoModel | null;
  cliente: ClienteModel | null;
  codigo: string | null;
  equipamento: EquipamentoModel | null;
  identificador: EquipamentoItemModel | null;
}

export { OsPaginatorParams, OsFilterParams };
