import LoginModel from "../models/login.model";

export default class LoginEntity {
  public constructor(
    public nomeUsuario: string,
    public senha: string
  ) {
  }

  public toModel(): LoginModel {
    return {
      login_usuario: this.nomeUsuario,
      senha: this.senha,
    };
  }

  public static fromModel(model: LoginModel): LoginEntity {
    return new LoginEntity(model.login_usuario, model.senha);
  }
}
