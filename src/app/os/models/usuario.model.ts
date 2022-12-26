class UsuarioModel {
  id: number;
  nomeUsuario: string;
  perfil: string;
  nome: string;
  loginHabilitado: boolean;

  constructor(id: number, nomeUsuario: string, perfil: string, nome: string, loginHabilitado: boolean) {
    this.id = id;
    this.nomeUsuario = nomeUsuario;
    this.perfil = perfil;
    this.nome = nome;
    this.loginHabilitado = loginHabilitado;
  }

  public static fromJson(json: UsuarioAPI): UsuarioModel {
    return new UsuarioModel(
      json.id_usuario,
      json.login_usuario,
      json.perfil,
      json.nome,
      json.login_habilitado
    );
  }
}

interface UsuarioAPI {
  id_usuario: number;
  login_usuario: string;
  perfil: string;
  nome: string;
  login_habilitado: boolean;
}

export { UsuarioModel, UsuarioAPI };
