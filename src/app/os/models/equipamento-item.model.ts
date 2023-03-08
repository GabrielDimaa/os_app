import { EquipamentoAPI, EquipamentoModel } from "./equipamento.model";

class EquipamentoItemModel {
  constructor(
    public id: number,
    public descricao: string,
    public obs: string | null,
    public idEquipamento: number,
    public equipamento: EquipamentoModel | null | undefined
  ) {}

  public toJson(): EquipamentoItemAPI {
    return {
      id_equipamento_item: this.id,
      identificador: this.descricao,
      obs: this.obs,
      id_equipamento: this.idEquipamento,
      equipamento: null,
    };
  }

  public static fromJson(json: EquipamentoItemAPI): EquipamentoItemModel {
    return new EquipamentoItemModel(
      json.id_equipamento_item,
      json.identificador,
      json.obs,
      json.id_equipamento,
      json.equipamento ? EquipamentoModel.fromJson(json.equipamento) : null,
    );
  }
}

interface EquipamentoItemAPI {
  id_equipamento_item: number;
  identificador: string;
  obs: string | null;
  id_equipamento: number;
  equipamento: EquipamentoAPI | null | undefined;
}

export { EquipamentoItemModel, EquipamentoItemAPI };
