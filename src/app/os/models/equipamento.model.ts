class EquipamentoModel {
  id: number;
  codigo: string;
  descricao: string;

  constructor(id: number, codigo: string, descricao: string) {
    this.id = id;
    this.codigo = codigo;
    this.descricao = descricao;
  }

  public static fromJson(json: EquipamentoAPI): EquipamentoModel {
    return new EquipamentoModel(
      json.id_equipamento,
      json.equipamento_codigo,
      json.descricao
    );
  }
}

interface EquipamentoAPI {
  id_equipamento: number,
  equipamento_codigo: string,
  descricao: string
}

export { EquipamentoModel, EquipamentoAPI };
