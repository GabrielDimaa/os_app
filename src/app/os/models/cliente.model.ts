export default interface ClienteModel {
  id_cliente: number;
  nome: string;
  inativo: boolean;
  fone: string | null;
  razao_social: string | null;
  apelido: string | null;
}
