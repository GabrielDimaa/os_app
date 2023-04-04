import ClienteEntity from "../../cliente/entities/cliente.entity";
import OsSituacaoEntity from "../entities/os-situacao.entity";
import EquipamentoItemEntity from "../entities/equipamento-item.entity";
import EquipamentoEntity from "../../equipamento/entities/equipamento.entity";
import UsuarioEntity from "../entities/usuario.entity";

type OsPaginatorParams = {
  page: number;
  perPage: number;
}

type OsFilterParams = {
  emAberto: boolean;
  dataInicial: string | null;
  dataFinal: string | null;
  situacao: OsSituacaoEntity | null;
  cliente: ClienteEntity | null;
  codigo: string | null;
  responsavel: UsuarioEntity | null;
  equipamento: EquipamentoEntity | null;
  identificador: EquipamentoItemEntity | null;
}

export { OsPaginatorParams, OsFilterParams };
