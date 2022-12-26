import { EquipamentoAPI, EquipamentoModel } from "./equipamento.model";

class EquipamentoItemModel {
  id: number;
  descricao: string;
  obs: string | null;
  idEquipamento: number;
  equipamento: EquipamentoModel | null | undefined;

  constructor(id: number, descricao: string, obs: string | null, idEquipamento: number, equipamento: EquipamentoModel | null | undefined) {
    this.id = id;
    this.descricao = descricao;
    this.obs = obs;
    this.idEquipamento = idEquipamento;
    this.equipamento = equipamento;
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
