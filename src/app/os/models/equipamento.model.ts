import { EquipamentoItemAPI, EquipamentoItemModel } from "./equipamento-item.model";

class EquipamentoModel {
  constructor(
    public id: number,
    public codigo: string,
    public descricao: string,
    public itens: EquipamentoItemModel[]
  ) {}

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
