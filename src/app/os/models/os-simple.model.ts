import { OsSituacaoAPI, OsSituacaoModel } from "./os-situacao.model";
import { ClienteAPI, ClienteModel } from "./cliente.model";
import { OsEquipamentoItemAPI, OsEquipamentoItemModel } from "./os-equipamento-item.model";

class OsSimpleModel {
  id: number;
  codigo: number;
  dataHora: Date;
  situacao: OsSituacaoModel;
  cliente: ClienteModel;
  equipamentos: OsEquipamentoItemModel[];

  //region Getters utilizados na table de listagem de OS.

  get situacaoDisplay() {
    return this.situacao.descricao;
  }

  get clienteDisplay() {
    return this.cliente.nome;
  }

  get equipamentoDisplay() {
    const list = this.equipamentos.map(e => `${e.equipamentoItem.equipamento!.descricao} > ${e.equipamentoItem.descricao}`);
    return list.join("\n");
  }

  //endregion

  constructor(
    id: number,
    codigo: number,
    dataHora: Date,
    situacao: OsSituacaoModel,
    cliente: ClienteModel,
    equipamentos: OsEquipamentoItemModel[]
  ) {
    this.id = id;
    this.codigo = codigo;
    this.dataHora = dataHora;
    this.situacao = situacao;
    this.cliente = cliente;
    this.equipamentos = equipamentos;
  }

  public static fromJson(json: OsSimpleAPI): OsSimpleModel {
    return new OsSimpleModel(
      json.id_os,
      json.os_codigo,
      json.data_hora,
      OsSituacaoModel.fromJson(json.situacao),
      ClienteModel.fromJson(json.cliente),
      json.equipamentos_itens.map(e => OsEquipamentoItemModel.fromJson(e))
    );
  }
}

interface OsSimpleAPI {
  id_os: number;
  os_codigo: number;
  data_hora: Date;
  situacao: OsSituacaoAPI;
  cliente: ClienteAPI;
  equipamentos_itens: OsEquipamentoItemAPI[];
}

export { OsSimpleModel, OsSimpleAPI };

