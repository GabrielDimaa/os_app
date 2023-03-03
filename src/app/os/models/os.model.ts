import { OsTipoAtendimentoAPI, OsTipoAtendimentoModel } from "./os-tipo-atendimento.model";
import { ClienteAPI, ClienteModel } from "./cliente.model";
import { UsuarioAPI, UsuarioModel } from "./usuario.model";
import { OsSituacaoAPI, OsSituacaoModel } from "./os-situacao.model";
import { OsEquipamentoItemAPI, OsEquipamentoItemModel } from "./os-equipamento-item.model";
import "../../shared/prototypes/date.prototype";
import { dateWithoutTimezone } from "../../shared/prototypes/date.prototype";

class OsModel {
  constructor(
  public id: number | null,
  public codigo: number | null,
  public obs: string | null,
  public inativo: boolean,
  public tipoAtendimento: OsTipoAtendimentoModel | null,
  public situacao: OsSituacaoModel | null,
  public cliente: ClienteModel | null,
  public equipamentosItens: OsEquipamentoItemModel[],
  public dataHora: Date,
  public dataHoraPrevisaoEntrega: Date | null,
  public dataHoraEntrega: Date | null,
  public dataHoraAprovacao: Date | null,
  public dataHoraEncerramento: Date | null,
  public nomeContato: string | null,
  public foneContato: string | null,
  public valorOutrasDespesas: number | null,
  public valorTotal: number | null,
  public usuarioAtendente: UsuarioModel,
  public usuarioAprovacao: UsuarioModel | null,
  public usuarioEncerramento: UsuarioModel | null,
  public responsavel: UsuarioModel | null,
  ) {}

  public get temServico(): boolean {
    return this.equipamentosItens.some(e => e.servicos.length > 0);
  }

  public get temProduto(): boolean {
    return this.equipamentosItens.some(e => e.produtos.length > 0);
  }

  public static novo(usuarioAtendente: UsuarioModel): OsModel {
    return new OsModel(
      null,
      null,
      null,
      false,
      null,
      null,
      null,
      [],
      new Date(),
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      usuarioAtendente,
      null,
      null,
      null
    );
  }

  public static fromJson(json: OsAPI): OsModel {
    return new OsModel(
      json.id_os,
      json.os_codigo,
      json.obs,
      json.inativo,
      OsTipoAtendimentoModel.fromJson(json.tipo_atendimento),
      OsSituacaoModel.fromJson(json.situacao),
      ClienteModel.fromJson(json.cliente),
      json.equipamentos_itens.map(it => OsEquipamentoItemModel.fromJson(it)) ?? [],
      dateWithoutTimezone(json.data_hora),
      json.data_hora_previsao_entrega ? dateWithoutTimezone(json.data_hora_previsao_entrega) : null,
      json.data_hora_entrega ? dateWithoutTimezone(json.data_hora_entrega) : null,
      json.data_hora_aprovacao ? dateWithoutTimezone(json.data_hora_aprovacao) : null,
      json.data_hora_encerramento ? dateWithoutTimezone(json.data_hora_encerramento) : null,
      json.nome_contato,
      json.fone_contato,
      json.valor_outras_despesas,
      json.valor_total,
      UsuarioModel.fromJson(json.usuario_atendente),
      json.usuario_aprovacao ? UsuarioModel.fromJson(json.usuario_aprovacao) : null,
      json.usuario_encerramento ? UsuarioModel.fromJson(json.usuario_encerramento) : null,
      json.responsavel ? UsuarioModel.fromJson(json.responsavel) : null
    );
  }
}

interface OsAPI {
  id_os: number;
  os_codigo: number;
  obs: string | null;
  inativo: boolean;

  tipo_atendimento: OsTipoAtendimentoAPI;
  situacao: OsSituacaoAPI;
  cliente: ClienteAPI;
  equipamentos_itens: OsEquipamentoItemAPI[];

  data_hora: string;
  data_hora_previsao_entrega: string | null;
  data_hora_entrega: string | null;
  data_hora_aprovacao: string | null;
  data_hora_encerramento: string | null;

  nome_contato: string | null;
  fone_contato: string | null;

  valor_outras_despesas: number | null;
  valor_total: number | null;

  usuario_atendente: UsuarioAPI;
  usuario_aprovacao: UsuarioAPI | null;
  usuario_encerramento: UsuarioAPI | null;
  responsavel: UsuarioAPI | null;
}

export { OsModel, OsAPI };
