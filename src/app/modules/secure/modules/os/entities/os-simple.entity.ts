import OsSimpleModel from "../models/os-simple.model";
import OsSituacaoEntity from "./os-situacao.entity";
import ClienteEntity from "../../cliente/entities/cliente.entity";
import OsEquipamentoItemEntity from "./os-equipamento-item.entity";

export default class OsSimpleEntity {
  constructor(
    public id: number,
    public codigo: number,
    public dataHora: Date,
    public situacao: OsSituacaoEntity,
    public cliente: ClienteEntity,
    public equipamentos: OsEquipamentoItemEntity[]
  ) {
  }

  ///region Getters utilizados na table de listagem de OS.
  get situacaoDisplay() {
    return this.situacao.descricao;
  }

  get clienteDisplay() {
    return this.cliente.nome;
  }

  get equipamentoDisplay() {
    return this.equipamentos.map(e => e.descricaoDisplay).join(" | ");
  }
  ///endregion

  public static fromModel(model: OsSimpleModel): OsSimpleEntity {
    return new OsSimpleEntity(
      model.id_os,
      model.os_codigo,
      model.data_hora,
      OsSituacaoEntity.fromModel(model.situacao),
      ClienteEntity.fromModel(model.cliente),
      model.equipamentos_itens.map(e => OsEquipamentoItemEntity.fromModel(e))
    );
  }
}
