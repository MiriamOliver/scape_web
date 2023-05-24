export interface Administrador {
  nombre: string;
  avatar: string;
}

export interface Enigma {
  id:number,
  creador:string,
  pregunta:string,
  correcta:string,
  opciones:any,
}

export interface Partida {
  id : number,
  creador:string,
  resultado: string,
  llaves : number,
  tiempo : number,
  jugadores : [],
}

export interface Perfil {
  id:number,
  nombre:string,
  avatar:string,
  email:string,
  rol:string,
  activo:any;
}
