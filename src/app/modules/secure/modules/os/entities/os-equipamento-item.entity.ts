import OsEquipamentoItemModel from "../models/os-equipamento-item.model";
import OsServicoEntity from "./os-servico.entity";
import OsProdutoEntity from "./os-produto.entity";
import EquipamentoItemEntity from "./equipamento-item.entity";

export default class OsEquipamentoItemEntity {
  constructor(
    public id: number | null,
    public idOs: number | null,
    public problemaReclamado: string | null,
    public problemaConstatado: string | null,
    public obs: string | null,
    public equipamentoItem: EquipamentoItemEntity,
    public servicos: OsServicoEntity[],
    public produtos: OsProdutoEntity[]
  ) {}

  public get descricaoDisplay() {
    return `${this.equipamentoItem.equipamento!.descricao} > ${this.equipamentoItem.descricao}`;
  }

  public static novo(equipamentoItem: EquipamentoItemEntity, idOs: number | null = null): OsEquipamentoItemEntity {
    return new OsEquipamentoItemEntity(
      null,
      idOs,
      null,
      null,
      null,
      equipamentoItem,
      [],
      []
    );
  }

  public toModel(): OsEquipamentoItemModel {
    return {
      id_os_equipamento_item: this.id,
      id_os: this.idOs,
      id_equipamento_item: this.equipamentoItem.id,
      problema_reclamado: this.problemaReclamado?.handleLineBreak() ?? "",
      problema_constatado: this.problemaConstatado?.handleLineBreak() ?? "",
      obs: this.obs,
      equipamento_item: this.equipamentoItem.toModel(),
      servicos: this.servicos.map(s => s.toModel()),
      produtos: this.produtos.map(p => p.toModel()),
    };
  }

  public static fromModel(model: OsEquipamentoItemModel): OsEquipamentoItemEntity {
    return new OsEquipamentoItemEntity(
      model.id_os_equipamento_item,
      model.id_os,
      model.problema_reclamado,
      model.problema_constatado,
      model.obs,
      EquipamentoItemEntity.fromModel(model.equipamento_item),
      model.servicos.map(s => OsServicoEntity.fromModel(s)),
      model.produtos.map(p => OsProdutoEntity.fromModel(p))
    );
  }
}
