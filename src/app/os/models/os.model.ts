import { OsTipoAtendimentoAPI, OsTipoAtendimentoModel } from "./os-tipo-atendimento.model";
import { ClienteAPI, ClienteModel } from "./cliente.model";
import { UsuarioAPI, UsuarioModel } from "./usuario.model";
import { OsSituacaoAPI, OsSituacaoModel } from "./os-situacao.model";
import { OsEquipamentoItemAPI, OsEquipamentoItemModel } from "./os-equipamento-item.model";
import "../../shared/prototypes/date.prototype";
import { dateWithoutTimezone } from "../../shared/prototypes/date.prototype";

class OsModel {
  id: number | null;
  codigo: number | null;
  obs: string | null;
  inativo: boolean;

  tipoAtendimento: OsTipoAtendimentoModel | null;
  situacao: OsSituacaoModel | null;
  cliente: ClienteModel | null;
  equipamentosItens: OsEquipamentoItemModel[];

  dataHora: Date;
  dataHoraPrevisaoEntrega: Date | null;
  dataHoraEntrega: Date | null;
  dataHoraAprovacao: Date | null;
  dataHoraEncerramento: Date | null;

  nomeContato: string | null;
  foneContato: string | null;

  valorOutrasDespesas: number | null;
  valorTotal: number | null;

  usuarioAtendente: UsuarioModel;
  usuarioAprovacao: UsuarioModel | null;
  usuarioEncerramento: UsuarioModel | null;
  responsavel: UsuarioModel | null;

  constructor(
    id: number | null,
    codigo: number | null,
    obs: string | null,
    inativo: boolean,
    tipoAtendimento: OsTipoAtendimentoModel | null,
    situacao: OsSituacaoModel | null,
    cliente: ClienteModel | null,
    equipamentosItens: OsEquipamentoItemModel[],
    dataHora: Date,
    dataHoraPrevisaoEntrega: Date | null,
    dataHoraEntrega: Date | null,
    dataHoraAprovacao: Date | null,
    dataHoraEncerramento: Date | null,
    nomeContato: string | null,
    foneContato: string | null,
    valorOutrasDespesas: number | null,
    valorTotal: number | null,
    usuarioAtendente: UsuarioModel,
    usuarioAprovacao: UsuarioModel | null,
    usuarioEncerramento: UsuarioModel | null,
    responsavel: UsuarioModel | null
  ) {
    this.id = id;
    this.codigo = codigo;
    this.obs = obs;
    this.inativo = inativo;
    this.tipoAtendimento = tipoAtendimento;
    this.situacao = situacao;
    this.cliente = cliente;
    this.equipamentosItens = equipamentosItens;
    this.dataHora = dataHora;
    this.dataHoraPrevisaoEntrega = dataHoraPrevisaoEntrega;
    this.dataHoraEntrega = dataHoraEntrega;
    this.dataHoraAprovacao = dataHoraAprovacao;
    this.dataHoraEncerramento = dataHoraEncerramento;
    this.nomeContato = nomeContato;
    this.foneContato = foneContato;
    this.valorOutrasDespesas = valorOutrasDespesas;
    this.valorTotal = valorTotal;
    this.usuarioAtendente = usuarioAtendente;
    this.usuarioAprovacao = usuarioAprovacao;
    this.usuarioEncerramento = usuarioEncerramento;
    this.responsavel = responsavel;
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
