
export interface Registro {
  nombre: string;
  email: string;
  passwd: string;
  avatar:string;
}

export interface RespRegistro {
  success: boolean;
  msg: string;
}
