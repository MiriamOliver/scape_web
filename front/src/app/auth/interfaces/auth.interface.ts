
export interface Registro {
  nombre: string;
  email: string;
  password: string;
  avatar: string;
}

export interface RespRegistro {
  success: boolean;
  msg: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Auth {
  success: boolean;
  msg: string;
  data: {
      id: number;
      nombre: string;
      token: string;
  }
}

export interface RecPasswd {
  email:string,
  password:string
}
