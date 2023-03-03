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
    public usuario: UsuarioModel | null
  ) {}

  public static fromJson(json: OsServicoAPI): OsServicoModel {
    return new OsServicoModel(
      json.id_os_servico,
      json.id_os_equipamento_item,
      json.qtd,
      json.valor_total,
      json.descricao_informada,
      json.data_hora ? dateWithoutTimezone(json.data_hora) : null,
      ServicoModel.fromJson(json.servico),
      json.usuario != null ? UsuarioModel.fromJson(json.usuario) : null
    );
  }
}

interface OsServicoAPI {
  id_os_servico: number | null;
  id_os_equipamento_item: number | null;
  qtd: string;
  valor_total: number | null,
  descricao_informada: string | null,
  data_hora: string | null,
  servico: ServicoAPI,
  usuario: UsuarioAPI | null;
}

export { OsServicoModel, OsServicoAPI };
