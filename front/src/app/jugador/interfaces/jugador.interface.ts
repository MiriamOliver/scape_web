export interface Jugador {
  nombre: string;
  avatar: string;
}

export interface Partida {
  id: number;
  anfitrion: string;
  jugadores: number;
  estado: string;
}

export interface InfoPartida {
  id: number;
  anfitrion: number;
  estado: string;
}

export interface RespPartida {
  msg: string;
}

export interface Enigma {
  id:number,
  pregunta:string,
  correcta:string,
  opciones: [],
}

export interface Juego {
  id: number;
  anfitrion: number;
  estado: string;
  llaves:number;
  tiempo:number;
  resultado:string;
}
