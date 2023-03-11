import OsServicoModel from "./os-servico.model";
import OsProdutoModel from "./os-produto.model";
import EquipamentoItemModel from "./equipamento-item.model";

export default interface OsEquipamentoItemModel {
  id_os_equipamento_item: number | null;
  id_os: number | null;
  id_equipamento_item: number | null;
  problema_reclamado: string | null;
  problema_constatado: string | null;
  obs: string | null;
  equipamento_item: EquipamentoItemModel;
  servicos: OsServicoModel[];
  produtos: OsProdutoModel[];
}
