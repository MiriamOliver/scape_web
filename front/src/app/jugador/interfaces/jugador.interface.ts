export interface Jugador {
  nombre: string;
  avatar: string;
}

export interface Partida {
  id: number;
  anfitrion: string;
  participantes: number;
  estado: string;
}
