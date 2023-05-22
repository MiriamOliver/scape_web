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
  resultado: string,
  llaves : number,
  tiempo : number,
  jugadores : [],
}
