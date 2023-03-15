import { dateWithoutTimezone } from "../../../../../shared/prototypes/date.prototype";
import OsServicoModel from "../models/os-servico.model";
import ServicoEntity from "../../servico/entities/servico.entity";
import UsuarioEntity from "./usuario.entity";

export default class OsServicoEntity {
  constructor(
    public id: number | null,
    public idOsEquipamentoItem: number | null,
    public qtd: string,
    public valorTotal: number | null,
    public descricaoInformada: string | null,
    public dataHora: Date | null,
    public servico: ServicoEntity,
    public usuario: UsuarioEntity
  ) {
  }

  public toModel(): OsServicoModel {
    return {
      id_os_servico: this.id,
      id_os_equipamento_item: this.idOsEquipamentoItem,
      qtd: this.qtd,
      valor_total: this.valorTotal,
      descricao_informada: this.descricaoInformada,
      data_hora: this.dataHora?.toJSONLocal() ?? null,
      id_servico: this.servico.id,
      servico: this.servico.toModel(),
      id_usuario: this.usuario.id,
      usuario: this.usuario.toModel(),
    };
  }

  public static fromModel(model: OsServicoModel): OsServicoEntity {
    return new OsServicoEntity(
      model.id_os_servico,
      model.id_os_equipamento_item,
      model.qtd,
      model.valor_total,
      model.descricao_informada,
      model.data_hora ? dateWithoutTimezone(model.data_hora) : null,
      ServicoEntity.fromModel(model.servico),
      UsuarioEntity.fromModel(model.usuario)
    );
  }
}
