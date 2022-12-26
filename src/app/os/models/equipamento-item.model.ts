import { EquipamentoAPI, EquipamentoModel } from "./equipamento.model";

class EquipamentoItemModel {
  id: number;
  identificador: string;
  obs: string | null;
  equipamento: EquipamentoModel;

  constructor(id: number, identificador: string, obs: string | null, equipamento: EquipamentoModel) {
    this.id = id;
    this.identificador = identificador;
    this.obs = obs;
    this.equipamento = equipamento;
  }

  public static fromJson(json: EquipamentoItemAPI): EquipamentoItemModel {
    return new EquipamentoItemModel(
      json.id_equipamento_item,
      json.identificador,
      json.obs,
      EquipamentoModel.fromJson(json.equipamento),
    );
  }
}

interface EquipamentoItemAPI {
  id_equipamento_item: number;
  identificador: string;
  obs: string | null;
  equipamento: EquipamentoAPI;
}

export { EquipamentoItemModel, EquipamentoItemAPI };
