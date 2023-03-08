class UsuarioModel {
  constructor(
    public id: number,
    public nomeUsuario: string,
    public perfil: string,
    public nome: string,
    public loginHabilitado: boolean
  ) {}

  public toJson(): UsuarioAPI {
    return {
      id_usuario: this.id,
      login_usuario: this.nomeUsuario,
      perfil: this.perfil,
      nome: this.nome,
      login_habilitado: this.loginHabilitado,
    };
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
