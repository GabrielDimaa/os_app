class LoginModel {
  public nomeUsuario: string;
  public senha: string;

  public constructor(nomeUsuario: string, senha: string) {
    this.nomeUsuario = nomeUsuario;
    this.senha = senha;
  }

  public toJson(): LoginAPI {
    return {
      login_usuario: this.nomeUsuario,
      senha: this.senha,
    };
  }

  public static fromJson(json: LoginAPI): LoginModel {
    return new LoginModel(json.login_usuario, json.senha);
  }
}


interface LoginAPI {
  login_usuario: string;
  senha: string;
}

export { LoginModel, LoginAPI }
