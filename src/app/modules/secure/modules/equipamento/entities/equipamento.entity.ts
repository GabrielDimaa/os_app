import EquipamentoItemEntity from "../../os/entities/equipamento-item.entity";
import EquipamentoModel from "../models/equipamento.model";

export default class EquipamentoEntity {
  constructor(
    public id: number,
    public codigo: string,
    public descricao: string,
    public itens: EquipamentoItemEntity[]
  ) {
  }

  public static fromModel(model: EquipamentoModel): EquipamentoEntity {
    return new EquipamentoEntity(
      model.id_equipamento,
      model.equipamento_codigo,
      model.descricao,
      model.itens?.map(it => EquipamentoItemEntity.fromModel(it)) ?? []
    );
  }
}
