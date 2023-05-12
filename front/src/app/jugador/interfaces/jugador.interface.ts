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
