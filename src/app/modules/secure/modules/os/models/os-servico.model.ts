import UsuarioModel from "./usuario.model";
import ServicoModel from "../../servico/models/servico.model";

export default interface OsServicoModel {
  id_os_servico: number | null;
  id_os_equipamento_item: number | null;
  id_servico: number;
  qtd: string;
  valor_total: number | null,
  descricao_informada: string | null,
  data_hora: string | null,
  servico: ServicoModel,
  id_usuario: number;
  usuario: UsuarioModel;
}
