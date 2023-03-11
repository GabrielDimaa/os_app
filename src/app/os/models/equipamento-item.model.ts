import EquipamentoModel from "../../equipamento/models/equipamento.model";

export default interface EquipamentoItemModel {
  id_equipamento_item: number;
  identificador: string;
  obs: string | null;
  id_equipamento: number;
  equipamento: EquipamentoModel | null | undefined;
}
