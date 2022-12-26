import { EquipamentoItemAPI, EquipamentoItemModel } from "./equipamento-item.model";

class EquipamentoModel {
  id: number;
  codigo: string;
  descricao: string;
  itens: EquipamentoItemModel[] | null;

  constructor(id: number, codigo: string, descricao: string, itens: EquipamentoItemModel[]) {
    this.id = id;
    this.codigo = codigo;
    this.descricao = descricao;
    this.itens = itens;
  }

  public static fromJson(json: EquipamentoAPI): EquipamentoModel {
    return new EquipamentoModel(
      json.id_equipamento,
      json.equipamento_codigo,
      json.descricao,
      json.itens?.map(it => EquipamentoItemModel.fromJson(it)) ?? []
    );
  }
}

interface EquipamentoAPI {
  id_equipamento: number;
  equipamento_codigo: string;
  descricao: string;
  itens: EquipamentoItemAPI[] | null | undefined;
}

export { EquipamentoModel, EquipamentoAPI };
