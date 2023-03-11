import ClienteEntity from "../entities/cliente.entity";
import OsSituacaoEntity from "../entities/os-situacao.entity";
import EquipamentoItemEntity from "../entities/equipamento-item.entity";
import EquipamentoEntity from "../../equipamento/entities/equipamento.entity";

type OsPaginatorParams = {
  page: number;
  perPage: number;
}

type OsFilterParams = {
  dataInicial: string | null;
  dataFinal: string | null;
  situacao: OsSituacaoEntity | null;
  cliente: ClienteEntity | null;
  codigo: string | null;
  equipamento: EquipamentoEntity | null;
  identificador: EquipamentoItemEntity | null;
}

export { OsPaginatorParams, OsFilterParams };
