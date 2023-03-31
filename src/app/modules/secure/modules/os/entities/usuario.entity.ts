import UsuarioModel from "../models/usuario.model";

export default class UsuarioEntity {
  constructor(
    public id: number,
    public nomeUsuario: string,
    public perfil: string,
    public nome: string,
    public loginHabilitado: boolean
  ) {
  }

  public get primeiroNome(): string {
    return this.nome.split(" ")[0];
  }

  public toModel(): UsuarioModel {
    return {
      id_usuario: this.id,
      login_usuario: this.nomeUsuario,
      perfil: this.perfil,
      nome: this.nome,
      login_habilitado: this.loginHabilitado,
    };
  }

  public static fromModel(model: UsuarioModel): UsuarioEntity {
    return new UsuarioEntity(
      model.id_usuario,
      model.login_usuario,
      model.perfil,
      model.nome,
      model.login_habilitado
    );
  }
}
