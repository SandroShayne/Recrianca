import { IUser } from "../interfaces/IUser";

export function isFuncionario(user: IUser | null): boolean {
  if (!user?.role) {
    return false;
  }

  return user.role === "Funcionario";
}
