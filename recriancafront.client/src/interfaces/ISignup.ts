export interface ISignup {
  Tipo: "Responsavel" | "Funcionario";
  Nome: string;
  Email: string;
  Senha: string;
  ConfirmarSenha: string;
  TelContato: string;
}
