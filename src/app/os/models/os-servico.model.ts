import { UsuarioAPI, UsuarioModel } from "./usuario.model";
import { ServicoAPI, ServicoModel } from "./servico.model";
import { dateWithoutTimezone } from "../../shared/prototypes/date.prototype";

class OsServicoModel {
  constructor(
    public id: number | null,
    public idOsEquipamentoItem: number | null,
    public qtd: string,
    public valorTotal: number | null,
    public descricaoInformada: string | null,
    public dataHora: Date | null,
    public servico: ServicoModel,
    public usuario: UsuarioModel
  ) {}

  public toJson(): OsServicoAPI {
    return {
      id_os_servico: this.id,
      id_os_equipamento_item: this.idOsEquipamentoItem,
      qtd: this.qtd,
      valor_total: this.valorTotal,
      descricao_informada: this.descricaoInformada,
      data_hora: this.dataHora?.toJSONLocal() ?? null,
      id_servico: this.servico.id,
      servico: this.servico.toJson(),
      id_usuario: this.usuario.id,
      usuario: this.usuario.toJson(),
    };
  }

  public static fromJson(json: OsServicoAPI): OsServicoModel {
    return new OsServicoModel(
      json.id_os_servico,
      json.id_os_equipamento_item,
      json.qtd,
      json.valor_total,
      json.descricao_informada,
      json.data_hora ? dateWithoutTimezone(json.data_hora) : null,
      ServicoModel.fromJson(json.servico),
      UsuarioModel.fromJson(json.usuario)
    );
  }
}

interface OsServicoAPI {
  id_os_servico: number | null;
  id_os_equipamento_item: number | null;
  id_servico: number;
  qtd: string;
  valor_total: number | null,
  descricao_informada: string | null,
  data_hora: string | null,
  servico: ServicoAPI,
  id_usuario: number;
  usuario: UsuarioAPI;
}

export { OsServicoModel, OsServicoAPI };
