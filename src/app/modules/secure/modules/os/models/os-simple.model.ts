import OsSituacaoModel from "./os-situacao.model";
import ClienteModel from "../../cliente/models/cliente.model";
import OsEquipamentoItemModel from "./os-equipamento-item.model";

export default interface OsSimpleModel {
  id_os: number;
  os_codigo: number;
  data_hora: Date;
  situacao: OsSituacaoModel;
  cliente: ClienteModel;
  equipamentos_itens: OsEquipamentoItemModel[];
}
