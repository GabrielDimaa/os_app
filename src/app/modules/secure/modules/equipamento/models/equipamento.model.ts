import EquipamentoItemModel from "../../os/models/equipamento-item.model";

export default interface EquipamentoModel {
  id_equipamento: number;
  equipamento_codigo: string;
  descricao: string;
  itens: EquipamentoItemModel[] | null | undefined;
}
