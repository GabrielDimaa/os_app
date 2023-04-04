import OsTipoAtendimentoModel from "./os-tipo-atendimento.model";
import OsSituacaoModel from "./os-situacao.model";
import UsuarioModel from "./usuario.model";
import OsEquipamentoItemModel from "./os-equipamento-item.model";
import ClienteModel from "../../cliente/models/cliente.model";

export default interface OsModel {
  id_os: number | null;
  os_codigo: number | null;
  obs: string | null;
  inativo: boolean;
  id_os_tipo_atendimento: number,
  tipo_atendimento: OsTipoAtendimentoModel;
  id_os_situacao: number,
  situacao: OsSituacaoModel;
  id_cliente: number,
  cliente: ClienteModel;
  equipamentos_itens: OsEquipamentoItemModel[];
  data_hora: string;
  data_hora_previsao_entrega: string | null;
  data_hora_entrega: string | null;
  data_hora_aprovacao: string | null;
  data_hora_encerramento: string | null;
  nome_contato: string | null;
  fone_contato: string | null;
  valor_outras_despesas: number | null;
  valor_total: number | null;
  id_usuario_atendente: number,
  usuario_atendente: UsuarioModel;
  id_usuario_aprovacao: number | null;
  usuario_aprovacao: UsuarioModel | null;
  id_usuario_encerramento: number | null;
  usuario_encerramento: UsuarioModel | null;
  id_usuario_responsavel: number | null;
  responsavel: UsuarioModel | null;
}
