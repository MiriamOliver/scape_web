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
