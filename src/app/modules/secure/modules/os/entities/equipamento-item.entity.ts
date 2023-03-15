import EquipamentoEntity from "../../equipamento/entities/equipamento.entity";
import EquipamentoItemModel from "../models/equipamento-item.model";

export default class EquipamentoItemEntity {
  constructor(
    public id: number,
    public descricao: string,
    public obs: string | null,
    public idEquipamento: number,
    public equipamento: EquipamentoEntity | null | undefined
  ) {
  }

  public toModel(): EquipamentoItemModel {
    return {
      id_equipamento_item: this.id,
      identificador: this.descricao,
      obs: this.obs,
      id_equipamento: this.idEquipamento,
      equipamento: null,
    };
  }

  public static fromModel(model: EquipamentoItemModel): EquipamentoItemEntity {
    return new EquipamentoItemEntity(
      model.id_equipamento_item,
      model.identificador,
      model.obs,
      model.id_equipamento,
      model.equipamento ? EquipamentoEntity.fromModel(model.equipamento) : null,
    );
  }
}
