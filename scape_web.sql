-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-05-2023 a las 22:21:00
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `scape_web`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chats`
--

CREATE TABLE `chats` (
  `id_user` bigint(20) NOT NULL,
  `id_partida` bigint(20) NOT NULL,
  `mensaje` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `chats`
--

INSERT INTO `chats` (`id_user`, `id_partida`, `mensaje`, `createdAt`, `updatedAt`) VALUES
(84, 14, 'wertewt', '2023-05-06 18:22:12', '2023-05-06 18:22:12'),
(84, 14, 'ajsfosjf', '2023-05-06 18:25:09', '2023-05-06 18:25:09'),
(84, 14, 'sadfsadf', '2023-05-06 18:39:52', '2023-05-06 18:39:52'),
(84, 14, 'asfasdf', '2023-05-06 18:42:38', '2023-05-06 18:42:38'),
(84, 14, 'asfsaf', '2023-05-06 18:47:25', '2023-05-06 18:47:25'),
(84, 14, 'asdfas', '2023-05-06 18:50:19', '2023-05-06 18:50:19'),
(84, 14, 'probando el chat', '2023-05-06 18:57:34', '2023-05-06 18:57:34'),
(84, 14, 'por fin va', '2023-05-06 18:57:38', '2023-05-06 18:57:38'),
(84, 14, 'asdfasdf', '2023-05-06 23:14:45', '2023-05-06 23:14:45'),
(70, 14, 'probando', '2023-05-06 23:15:07', '2023-05-06 23:15:07'),
(84, 14, 'no esta funcionando', '2023-05-06 23:15:20', '2023-05-06 23:15:20'),
(70, 14, 'nononoasdifaosf', '2023-05-06 23:15:25', '2023-05-06 23:15:25'),
(84, 14, 'sajfosajdfoa', '2023-05-06 23:24:15', '2023-05-06 23:24:15'),
(84, 14, 'aaaaaaaaaaa', '2023-05-06 23:52:02', '2023-05-06 23:52:02'),
(84, 14, 'ml', '2023-05-07 00:23:49', '2023-05-07 00:23:49'),
(70, 14, 'probando', '2023-05-07 10:17:39', '2023-05-07 10:17:39'),
(84, 18, 'sdfksf', '2023-05-07 10:35:33', '2023-05-07 10:35:33'),
(84, 14, 'hola', '2023-05-07 10:36:48', '2023-05-07 10:36:48'),
(70, 14, 'no conseguimos comunicarnos', '2023-05-07 10:37:02', '2023-05-07 10:37:02'),
(84, 14, 'probando', '2023-05-07 10:40:17', '2023-05-07 10:40:17'),
(70, 14, 'no hay comunicacion', '2023-05-07 10:40:37', '2023-05-07 10:40:37'),
(84, 14, 'pfffff', '2023-05-07 10:40:54', '2023-05-07 10:40:54'),
(84, 14, 'por favor funciona', '2023-05-07 10:56:23', '2023-05-07 10:56:23'),
(70, 14, 'por fin', '2023-05-07 10:56:32', '2023-05-07 10:56:32'),
(84, 14, 'ahora no me leo mis mensajes ', '2023-05-07 10:57:14', '2023-05-07 10:57:14'),
(70, 14, 'probando ', '2023-05-07 15:14:20', '2023-05-07 15:14:20'),
(84, 14, 'estoy hablanco con nene me llamo hanbei el niño prodigio', '2023-05-07 15:14:45', '2023-05-07 15:14:45'),
(71, 15, 'estoy con el niño prodigio ', '2023-05-07 15:17:58', '2023-05-07 15:17:58'),
(84, 15, 'soy hanbei el niño pillin, jiji ja', '2023-05-07 15:21:32', '2023-05-07 15:21:32'),
(71, 15, 'porque eres el niño pillin?', '2023-05-07 15:21:46', '2023-05-07 15:21:46'),
(84, 15, 'porque me se cambiar de salas ', '2023-05-07 15:21:54', '2023-05-07 15:21:54'),
(84, 14, 'kwperpw', '2023-05-09 17:44:16', '2023-05-09 17:44:16'),
(84, 14, 'tryteryer', '2023-05-09 18:37:38', '2023-05-09 18:37:38'),
(84, 14, 'dfgsdg', '2023-05-09 18:42:16', '2023-05-09 18:42:16'),
(71, 14, 'dgdsfg', '2023-05-09 18:42:22', '2023-05-09 18:42:22'),
(84, 14, 'probando', '2023-05-09 23:39:08', '2023-05-09 23:39:08'),
(84, 14, 'sdfasf', '2023-05-10 01:29:56', '2023-05-10 01:29:56'),
(84, 14, 'dgsdfg', '2023-05-10 09:07:16', '2023-05-10 09:07:16'),
(84, 14, 'sdfsf', '2023-05-10 09:07:52', '2023-05-10 09:07:52'),
(84, 14, 'gdfgsd', '2023-05-11 01:47:37', '2023-05-11 01:47:37'),
(84, 14, 'omomo', '2023-05-11 01:59:05', '2023-05-11 01:59:05'),
(84, 14, 'sdfasf', '2023-05-11 18:50:28', '2023-05-11 18:50:28'),
(84, 14, 'asdfosjdfosdf', '2023-05-11 18:52:18', '2023-05-11 18:52:18'),
(84, 39, 'oerjotwt', '2023-05-12 10:05:15', '2023-05-12 10:05:15'),
(83, 52, 'dgdsgsd', '2023-05-12 11:31:38', '2023-05-12 11:31:38'),
(83, 59, 'joj', '2023-05-12 17:05:50', '2023-05-12 17:05:50'),
(84, 59, 'probando', '2023-05-13 12:38:41', '2023-05-13 12:38:41'),
(83, 60, 'probando', '2023-05-15 16:20:48', '2023-05-15 16:20:48'),
(84, 60, 'te recibimos', '2023-05-15 16:21:03', '2023-05-15 16:21:03'),
(70, 60, 'que tal estais chicos?', '2023-05-15 16:21:11', '2023-05-15 16:21:11'),
(70, 60, 'sabeis alguna pregunta?', '2023-05-15 16:21:23', '2023-05-15 16:21:23'),
(84, 60, 'yo solo tiro al azar ', '2023-05-15 16:21:38', '2023-05-15 16:21:38'),
(83, 67, 'probando chat', '2023-05-17 08:08:01', '2023-05-17 08:08:01'),
(83, 67, 'probando chat', '2023-05-17 08:08:31', '2023-05-17 08:08:31'),
(83, 69, 'aaaaa', '2023-05-17 08:23:06', '2023-05-17 08:23:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enigmas`
--

CREATE TABLE `enigmas` (
  `id` int(11) NOT NULL,
  `pregunta` varchar(255) DEFAULT NULL,
  `resp_uno` varchar(255) DEFAULT NULL,
  `resp_dos` varchar(255) DEFAULT NULL,
  `resp_tres` varchar(255) DEFAULT NULL,
  `resp_correcta` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `enigmas`
--

INSERT INTO `enigmas` (`id`, `pregunta`, `resp_uno`, `resp_dos`, `resp_tres`, `resp_correcta`, `createdAt`, `updatedAt`) VALUES
(1, '¿Qué significa Sengoku?', 'luchar por el país', 'período Samurai', 'mundo flotante', 'luchar en todo el país', '2023-05-13 12:16:48', '1900-01-13 12:17:08'),
(2, '¿Cuál es el nombre del hermano mayor de Sanada Yukimura?', 'Sanada Makoto', 'Sanada Masayuki ', 'Sanada Masamune', 'Sanada Nobuyuki', '1900-01-13 12:17:00', '1900-01-13 12:17:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE `jugadores` (
  `id` bigint(20) NOT NULL,
  `ganadas` int(11) DEFAULT 0,
  `perdidas` int(11) DEFAULT 0,
  `partidas` int(11) DEFAULT 0,
  `llaves` int(11) DEFAULT 0,
  `activo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `jugadores`
--

INSERT INTO `jugadores` (`id`, `ganadas`, `perdidas`, `partidas`, `llaves`, `activo`) VALUES
(1, 0, 0, 0, 0, 0),
(2, 0, 0, 0, 0, 0),
(3, 0, 0, 0, 0, 0),
(4, 0, 0, 0, 0, 0),
(5, 0, 0, 0, 0, 0),
(6, 0, 0, 0, 0, 0),
(7, 0, 0, 0, 0, 0),
(8, 0, 0, 0, 0, 0),
(50, 0, 0, 0, 0, 0),
(51, 0, 0, 0, 0, 0),
(52, 0, 0, 0, 0, 0),
(54, 0, 0, 0, 0, 0),
(55, 0, 0, 0, 0, 0),
(56, 0, 0, 0, 0, 0),
(57, 0, 0, 0, 0, 0),
(69, 0, 0, 0, 0, 0),
(70, 1, 0, 1, 2, 0),
(71, 0, 0, 0, 0, 0),
(72, 0, 0, 0, 0, 0),
(73, 0, 0, 0, 0, 0),
(74, 0, 0, 0, 0, 0),
(75, 0, 0, 0, 0, 0),
(76, 0, 0, 0, 0, 0),
(77, 0, 0, 0, 0, 0),
(78, 0, 0, 0, 0, 0),
(79, 0, 0, 0, 0, 0),
(80, 0, 0, 0, 0, 0),
(81, 0, 0, 0, 0, 0),
(82, 0, 0, 0, 0, 0),
(83, 1, 0, 1, 2, 0),
(84, 1, 0, 1, 2, 0),
(85, 0, 0, 0, 0, 0),
(86, 0, 0, 0, 0, 0),
(87, 0, 0, 0, 0, 0),
(88, 0, 0, 0, 0, 0),
(89, 0, 0, 0, 0, 0),
(90, 0, 0, 0, 0, 0),
(91, 0, 0, 0, 0, 0),
(92, 0, 0, 0, 0, 0),
(93, 0, 0, 0, 0, 0),
(94, 0, 0, 0, 0, 0),
(95, 0, 0, 0, 0, 0),
(96, 0, 0, 0, 0, 0),
(97, 0, 0, 0, 0, 0),
(98, 0, 0, 0, 0, 0),
(99, 0, 0, 0, 0, 0),
(100, 0, 0, 0, 0, 0),
(101, 0, 0, 0, 0, 0),
(102, 0, 0, 0, 0, 0),
(103, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partidas`
--

CREATE TABLE `partidas` (
  `id` int(11) NOT NULL,
  `llaves` int(11) DEFAULT NULL,
  `anfitrion` int(11) DEFAULT NULL,
  `tiempo` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `resultado` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `partidas`
--

INSERT INTO `partidas` (`id`, `llaves`, `anfitrion`, `tiempo`, `estado`, `resultado`, `createdAt`, `updatedAt`) VALUES
(12, NULL, 83, NULL, 'disponible', NULL, '2023-04-24 02:45:45', '2023-04-24 02:45:45'),
(15, NULL, 84, NULL, 'disponible', NULL, '2023-04-28 18:54:21', '2023-04-28 18:54:21'),
(16, NULL, 84, NULL, 'disponible', NULL, '2023-04-30 01:06:28', '2023-04-30 01:06:28'),
(17, NULL, 84, NULL, 'disponible', NULL, '2023-05-03 16:46:38', '2023-05-03 16:46:38'),
(18, NULL, 83, NULL, 'disponible', NULL, '2023-05-04 08:29:18', '2023-05-04 08:29:18'),
(19, NULL, 84, NULL, 'disponible', NULL, '2023-05-04 08:32:48', '2023-05-04 08:32:48'),
(20, NULL, 83, NULL, 'disponible', NULL, '2023-05-04 21:24:10', '2023-05-04 21:24:10'),
(27, NULL, 84, NULL, 'disponible', NULL, '2023-05-12 02:40:08', '2023-05-12 02:40:08'),
(28, NULL, 84, NULL, 'disponible', NULL, '2023-05-12 02:44:42', '2023-05-12 02:44:42'),
(29, NULL, 84, NULL, 'disponible', NULL, '2023-05-12 02:45:59', '2023-05-12 02:45:59'),
(30, NULL, 84, NULL, 'disponible', NULL, '2023-05-12 02:47:46', '2023-05-12 02:47:46'),
(31, NULL, 84, NULL, 'disponible', NULL, '2023-05-12 02:49:00', '2023-05-12 02:49:00'),
(32, NULL, 84, NULL, 'disponible', NULL, '2023-05-12 02:51:42', '2023-05-12 02:51:42'),
(35, NULL, 84, NULL, 'disponible', NULL, '2023-05-12 03:27:26', '2023-05-12 03:27:26'),
(36, NULL, 84, NULL, 'disponible', NULL, '2023-05-12 03:34:33', '2023-05-12 03:34:33'),
(57, NULL, 84, NULL, 'disponible', NULL, '2023-05-12 11:48:33', '2023-05-12 11:48:33'),
(59, 1, 70, NULL, 'curso', NULL, '2023-05-12 17:04:38', '2023-05-15 16:09:37'),
(60, 10, 70, NULL, 'curso', NULL, '2023-05-15 16:16:51', '2023-05-15 18:56:17'),
(62, 2, 84, NULL, 'curso', NULL, '2023-05-15 19:10:56', '2023-05-15 19:36:46'),
(63, 6, 83, '0:51', 'terminada', 'ganada', '2023-05-16 06:27:34', '2023-05-16 06:29:02'),
(64, 6, 70, '1:14', 'terminada', 'ganada', '2023-05-16 07:35:04', '2023-05-16 07:46:17'),
(65, 6, 83, '1:14', 'terminada', 'ganada', '2023-05-16 07:56:27', '2023-05-16 07:58:15'),
(66, 6, 84, '1:14', 'terminada', 'ganada', '2023-05-16 15:26:11', '2023-05-16 15:28:17'),
(67, 6, 83, '1:51', 'terminada', 'ganada', '2023-05-17 08:06:59', '2023-05-17 08:10:05'),
(70, 5, 70, '1:51', 'terminada', 'ganada', '2023-05-17 10:26:46', '2023-05-17 10:29:49'),
(72, 5, 70, '2:28', 'terminada', 'ganada', '2023-05-17 10:57:50', '2023-05-17 11:39:57'),
(73, 6, 83, '1:14', 'terminada', 'ganada', '2023-05-17 12:11:16', '2023-05-17 12:13:53'),
(74, 6, 83, '1:14', 'terminada', 'ganada', '2023-05-17 16:30:47', '2023-05-17 16:32:24'),
(75, 6, 84, '1:14', 'terminada', 'ganada', '2023-05-17 16:40:26', '2023-05-17 16:44:37'),
(76, 6, 83, '1:14', 'terminada', 'ganada', '2023-05-17 17:16:24', '2023-05-17 17:18:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partidasjugadores`
--

CREATE TABLE `partidasjugadores` (
  `id_jugador` bigint(20) NOT NULL,
  `id_partida` bigint(20) NOT NULL,
  `llaves` int(11) DEFAULT 0,
  `fallos` int(11) NOT NULL DEFAULT 0,
  `activo` int(11) DEFAULT 1,
  `rol` varchar(255) DEFAULT 'marinero'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `partidasjugadores`
--

INSERT INTO `partidasjugadores` (`id_jugador`, `id_partida`, `llaves`, `fallos`, `activo`, `rol`) VALUES
(84, 12, 0, 0, 1, 'marinero'),
(83, 12, 0, 0, 1, 'marinero'),
(70, 12, 0, 0, 1, 'marinero'),
(84, 15, 0, 0, 1, 'marinero'),
(84, 16, 0, 0, 1, 'marinero'),
(71, 12, 0, 0, 1, 'marinero'),
(71, 15, 0, 0, 1, 'marinero'),
(73, 12, 0, 0, 1, 'marinero'),
(84, 17, 0, 0, 1, 'marinero'),
(83, 18, 0, 0, 1, 'marinero'),
(84, 19, 0, 0, 1, 'marinero'),
(84, 18, 0, 0, 1, 'marinero'),
(83, 20, 0, 0, 1, 'marinero'),
(83, 16, 0, 0, 1, 'marinero'),
(84, 14, 0, 0, 1, 'marinero'),
(84, 27, 0, 0, 1, 'marinero'),
(84, 28, 0, 0, 1, 'marinero'),
(84, 29, 0, 0, 1, 'marinero'),
(84, 30, 0, 0, 1, 'marinero'),
(84, 31, 0, 0, 1, 'marinero'),
(84, 32, 0, 0, 1, 'marinero'),
(70, 31, 0, 0, 1, 'marinero'),
(83, 28, 0, 0, 1, 'marinero'),
(84, 35, 0, 0, 1, 'marinero'),
(84, 36, 0, 0, 1, 'marinero'),
(70, 36, 0, 0, 1, 'marinero'),
(70, 18, 0, 0, 1, 'marinero'),
(84, 57, 0, 0, 1, 'marinero'),
(70, 57, 0, 0, 1, 'marinero'),
(70, 59, 0, 0, 1, 'marinero'),
(84, 59, 1, 4, 1, 'marinero'),
(83, 59, 0, 0, 1, 'marinero'),
(70, 60, 0, 7, 1, 'marinero'),
(83, 60, 5, 0, 1, 'marinero'),
(84, 62, 2, 1, 1, 'marinero'),
(70, 62, 5, 0, 1, 'marinero'),
(83, 62, 4, 0, 1, 'marinero'),
(83, 63, 2, 1, 1, 'marinero'),
(84, 63, 2, 1, 1, 'marinero'),
(70, 63, 2, 1, 1, 'marinero'),
(70, 64, 2, 0, 1, 'marinero'),
(83, 64, 2, 0, 1, 'marinero'),
(84, 64, 2, 0, 1, 'marinero'),
(83, 65, 2, 0, 1, 'marinero'),
(70, 65, 2, 0, 1, 'marinero'),
(84, 65, 2, 0, 1, 'marinero'),
(84, 66, 2, 0, 1, 'marinero'),
(83, 66, 2, 0, 1, 'marinero'),
(70, 66, 2, 0, 1, 'marinero'),
(83, 67, 3, 0, 1, 'marinero'),
(70, 67, 1, 2, 1, 'marinero'),
(84, 67, 2, 1, 1, 'marinero'),
(70, 70, 1, 2, 1, 'marinero'),
(84, 70, 1, 2, 1, 'marinero'),
(83, 70, 3, 0, 1, 'marinero'),
(70, 72, 1, 17, 1, 'marinero'),
(84, 72, 1, 4, 1, 'almirante'),
(83, 72, 3, 1, 1, 'marinero'),
(83, 73, 2, 0, 1, 'almirante'),
(70, 73, 2, 0, 1, 'marinero'),
(84, 73, 2, 0, 1, 'marinero'),
(83, 74, 2, 0, 1, 'almirante'),
(70, 74, 2, 0, 1, 'marinero'),
(84, 74, 2, 0, 1, 'marinero'),
(84, 75, 2, 0, 1, 'almirante'),
(83, 75, 2, 0, 1, 'marinero'),
(70, 75, 2, 0, 1, 'marinero'),
(83, 76, 2, 0, 1, 'almirante'),
(70, 76, 2, 0, 1, 'marinero'),
(84, 76, 2, 0, 1, 'marinero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `rol` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `rol`) VALUES
(1, 'jugador'),
(2, 'administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rolesasignados`
--

CREATE TABLE `rolesasignados` (
  `id_user` bigint(20) NOT NULL,
  `id_rol` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rolesasignados`
--

INSERT INTO `rolesasignados` (`id_user`, `id_rol`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(50, 1),
(51, 1),
(52, 1),
(54, 1),
(55, 1),
(56, 1),
(57, 1),
(69, 1),
(70, 1),
(71, 1),
(72, 1),
(73, 1),
(74, 1),
(75, 1),
(76, 1),
(77, 1),
(78, 1),
(79, 2),
(80, 1),
(81, 1),
(82, 2),
(83, 1),
(84, 1),
(85, 1),
(86, 1),
(87, 1),
(88, 1),
(89, 1),
(90, 1),
(91, 1),
(92, 1),
(93, 1),
(94, 1),
(95, 1),
(96, 1),
(97, 1),
(98, 1),
(99, 1),
(100, 1),
(101, 1),
(102, 1),
(103, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230331170645-create-jugador.js'),
('20230331172022-create-user.js'),
('20230331172528-create-roles.js'),
('20230331174116-create-roles-asignados.js'),
('20230423002530-create-partida.js'),
('20230423013328-create-partida-jugador.js'),
('20230506180532-create-chat.js'),
('20230508190136-create-enigma.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `cod_passwd` varchar(255) DEFAULT NULL,
  `conectado` int(1) NOT NULL DEFAULT 0,
  `verifiedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `email`, `password`, `avatar`, `cod_passwd`, `conectado`, `verifiedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Sanada Yukimura', 'Yukimura@example.com', '1234', NULL, '0', 0, NULL, '2023-04-04 19:44:41', '2023-04-04 19:44:41'),
(2, 'Date Masamune', 'Masamune@example.com', '1234', NULL, '0', 0, NULL, '2023-04-04 19:47:49', '2023-04-04 19:47:49'),
(3, 'No', 'No@example.com', '1234', NULL, '0', 0, NULL, '2023-04-04 19:51:03', '2023-04-04 19:51:03'),
(4, 'Oichi', 'Oichi@example.com', '1234', NULL, '0', 0, NULL, '2023-04-04 20:23:50', '2023-04-04 20:23:50'),
(5, 'Gracia', 'Gracia@example.com', '1234', NULL, '0', 0, NULL, '2023-04-04 20:28:01', '2023-04-04 20:28:01'),
(6, 'Okuni', 'Okuni@example.com', '1234', NULL, '0', 0, NULL, '2023-04-04 20:32:33', '2023-04-04 20:32:33'),
(7, 'hina', 'hina@example.com', '1234', NULL, '0', 0, NULL, '2023-04-04 20:33:49', '2023-04-04 20:33:49'),
(8, 'kunoichi', 'kunoichi@example.com', '1234', NULL, '0', 0, NULL, '2023-04-04 20:36:53', '2023-04-04 20:36:53'),
(50, 'email2', 'email2@gmail.com', '1', NULL, '0', 0, '2023-04-11 18:42:03', '2023-04-11 18:41:55', '2023-04-11 18:42:03'),
(51, 'probandoRegistro', 'probando@example.com', '1234', NULL, '0', 0, NULL, '2023-04-11 21:01:10', '2023-04-11 21:01:10'),
(52, 'prueba52', 'prueba@example.com', '123', NULL, '0', 0, NULL, '2023-04-12 06:34:21', '2023-04-12 06:34:21'),
(54, 'pruebas', 'maspruebas@example.com', '123', NULL, '0', 0, NULL, '2023-04-12 08:55:46', '2023-04-12 08:55:46'),
(55, 'miriam', 'xlmiru5lx@gmail.com', '1234', NULL, '0', 0, '2023-04-12 10:09:35', '2023-04-12 10:09:13', '2023-04-12 10:09:35'),
(56, 'probandoImagen', 'probandoimg@example.com', '1234', NULL, '0', 0, NULL, '2023-04-12 10:48:07', '2023-04-12 10:48:07'),
(57, 'pruebaimg', 'pimg@example.com', '1234', NULL, '0', 0, NULL, '2023-04-12 11:50:51', '2023-04-12 11:50:51'),
(69, 'ghfh', 'fhfh@sdofas.com', '1', NULL, '0', 0, NULL, '2023-04-12 16:35:08', '2023-04-12 16:35:08'),
(70, 'nene', 'nene@example.com', '1234', '6cc2bb07-1b07-42f7-9094-fd345bf697e7.jpg', '0', 1, '2023-04-12 19:13:57', '2023-04-12 17:02:22', '2023-05-17 17:16:14'),
(71, 'Mitsunari Ishida', 'xlmiru9lx@gmail.com', '1234', '08d1a2c7-3299-4547-b17d-1961fc7ebe77.jpg', '0', 0, '2023-04-12 19:09:15', '2023-04-12 17:15:17', '2023-05-11 18:52:36'),
(72, 'Aya', 'aya@gmail.com', '1234', '28499015-922d-47e0-8dbc-2ceac1b294be.jpg', '0', 0, NULL, '2023-04-12 17:17:49', '2023-04-12 17:17:49'),
(73, 'kotaro', 'kotaro@gmail.com', '1234', 'b4496133-72b7-444c-8327-fb3b0fa79cd4.jpg', '0', 1, '2023-04-30 21:47:44', '2023-04-12 17:35:28', '2023-04-30 19:48:12'),
(74, 'lady_kay', 'kay@example.com', '1234', 'c8a86f0f-b0d3-49f6-83f3-dec496c0a1bc.jpg', '0', 0, NULL, '2023-04-12 17:37:04', '2023-04-12 17:37:04'),
(75, 'keiji maeda', 'keiji@example.com', '1234', 'f27bdfb9-1396-499a-9918-868e63932e63.jpg', '0', 0, NULL, '2023-04-12 18:04:59', '2023-04-12 18:04:59'),
(76, 'takatora todo', 'todo@example.com', '1234', '8738d829-b9d5-46e6-97bc-7842c1f3a275.jpg', '0', 0, NULL, '2023-04-12 18:09:23', '2023-04-12 18:09:23'),
(77, 'hanzo hattori', 'hattori@example.com', '1234', '309c108e-f496-4309-ac21-fe2c4fb21e16.jpg', '0', 0, NULL, '2023-04-12 18:46:46', '2023-04-12 18:46:46'),
(78, 'ranmaru mori', 'ranmaru@example.com', '1234', 'f465cbae-f6f4-4a86-91c1-532042ecc990.jpg', '0', 0, NULL, '2023-04-12 18:49:46', '2023-04-12 18:49:46'),
(79, 'nobunaga oda', 'oda@gmail.com', '1234', '9529de6a-b3e6-4a3c-ae3e-2f4374c05d72.jpg', '0', 0, '2023-04-22 00:00:00', '2023-04-12 18:50:48', '2023-05-04 08:35:45'),
(80, 'lady hayakawa', 'hayakawa@example.com', '1234', '4e2bcfe2-667e-418b-a9b5-271a3c863941.jpg', '0', 0, NULL, '2023-04-12 18:54:25', '2023-04-12 18:54:25'),
(81, 'toshiie maeda', 'toshiie@example.com', '1234', 'f2cdb4b1-d51f-44da-bcfe-f332892abbf7.jpg', '0', 1, '2023-04-22 03:08:14', '2023-04-12 19:06:40', '2023-04-12 19:06:40'),
(82, 'motochika choskabe', 'xlmirulx@gmail.com', '1234', '0ad8e6c3-0b0a-420a-ac74-f917e1c11b7f.jpg', '0', 1, '2023-04-12 21:31:51', '2023-04-12 19:09:02', '2023-04-22 01:54:25'),
(83, 'naotora li', 'naotora@gmail.com', '1234', '4bbff59d-47df-4b05-8b42-059ef4f554c8.jpg', '0', 1, '2023-04-12 21:31:52', '2023-04-12 19:10:07', '2023-05-17 17:16:20'),
(84, 'hanbei takenaka', 'xlmiru95lx@gmail.com', '1234', '86a42037-633d-4af9-befb-f861702e7ce2.jpg', 'fiR5EYH', 1, '2023-04-12 20:47:19', '2023-04-12 20:47:00', '2023-05-17 17:16:04'),
(85, 'aaaa', 'gergeg@jojdo.vom', '1234', '5c791181-d91f-481c-b60e-1a30bee6236d.jpg', NULL, 0, NULL, '2023-04-30 21:34:05', '2023-04-30 21:34:05'),
(86, 'probando5', 'probando9@exmaple.com', '1234', '9c79ba3c-f284-4a5b-a981-fff75af51d69.jpg', NULL, 0, NULL, '2023-04-30 21:52:31', '2023-04-30 21:52:31'),
(87, 'inicio', 'popo@example.com', '1234', '946ca9c3-3276-4f7a-a53f-c4a6feaecdce.jpg', NULL, 0, NULL, '2023-04-30 21:56:02', '2023-04-30 21:56:02'),
(88, 'aaaaa', 'aaaaa@eeee.com', '1234', '547d46fc-33e5-4f04-a78f-e773bea043c0.jpg', NULL, 0, NULL, '2023-04-30 22:13:58', '2023-04-30 22:13:58'),
(89, 'iiii', 'iiii@sojdfosf.ew', '1234', '9abc899e-189b-49b6-9c5b-3ad397a7598f.jpg', NULL, 0, NULL, '2023-04-30 22:14:49', '2023-04-30 22:14:49'),
(90, 'mitsu mitusu', 'mitsu@ui.ui', '1234', '7f19a5bc-bca8-4569-b759-b9892cf54c7f.jpg', NULL, 0, NULL, '2023-04-30 22:18:06', '2023-04-30 22:18:06'),
(91, 'aaa', 'hola@example.com', '1234', '544bb35c-90b8-44ad-bb72-7a24477d5d6a.jpg', 'MRCbM9l', 0, NULL, '2023-04-30 22:21:56', '2023-05-03 09:42:58'),
(92, 'prueba7', 'prueba7@example.com', '1234', '23e3474f-2cf1-4427-98a9-079a3b2c93a1.jpg', NULL, 0, NULL, '2023-04-30 22:25:52', '2023-04-30 22:25:52'),
(93, 'prueba 8', 'ocho@example.com', '1234', 'd5ca8d09-93fc-46e2-a642-59f3b3753ae2.jpg', NULL, 0, NULL, '2023-04-30 22:28:54', '2023-04-30 22:28:54'),
(94, 'bbbbb', 'bbbb@example.com', '1234', '5b14c0eb-070d-43f5-b4cc-c422bad4e84a.jpg', NULL, 0, NULL, '2023-05-01 00:08:02', '2023-05-01 00:08:02'),
(95, 'pruebas90', 'prueba90@example.com', '1234', '6550ce6c-cab9-4350-9f2b-bf920ae9940b.jpg', NULL, 0, NULL, '2023-05-01 02:17:57', '2023-05-01 02:17:57'),
(96, 'pruebas80', 'prueba80@example.com', '1234', '790b29fe-2ed1-4a19-b8bb-7dd68e25f664.jpg', NULL, 0, NULL, '2023-05-01 02:18:16', '2023-05-01 02:18:16'),
(97, 'pruebas85', 'prueba85@example.com', '1234', '561759da-6be2-45e6-aeb3-57731a5575c8.jpg', NULL, 0, NULL, '2023-05-01 02:27:19', '2023-05-01 02:27:19'),
(98, 'prueba70', 'preubaer@example.com', '1234', '4afb6621-720c-4503-98f7-2b8987194fce.jpg', NULL, 0, NULL, '2023-05-01 02:28:46', '2023-05-01 02:28:46'),
(99, 'prueba60', 'preubae6r@example.com', '1234', '4fb526cb-653b-4a9d-adc2-6f222b6587b0.jpg', NULL, 0, NULL, '2023-05-01 02:36:47', '2023-05-01 02:36:47'),
(100, 'prueba78', 'preubaop@examle.com', '1234', '6d5b4a70-dfb5-43d6-b748-958ca72b0efb.jpg', NULL, 0, NULL, '2023-05-01 02:50:36', '2023-05-01 02:50:36'),
(101, 'prueba76', 'preuba76@exmape.com', '1234', 'd788a8ce-be3e-48a7-8bdb-d08cc7a8af97.jpg', NULL, 0, NULL, '2023-05-01 03:06:30', '2023-05-01 03:06:30'),
(102, 'preuba78', 'prueba78@exmaple.com', '1234', 'c65fa105-f95c-4280-a7ee-97c4b9c9f9cc.jpg', NULL, 0, NULL, '2023-05-01 03:20:43', '2023-05-01 03:20:43'),
(103, 'pruebas73', 'prueba73@exmaple.com', '1234', 'a3658ab4-f4e1-4f4f-844a-b3bbbaf616a3.jpg', NULL, 0, NULL, '2023-05-01 03:23:15', '2023-05-01 03:23:15');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `enigmas`
--
ALTER TABLE `enigmas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `partidas`
--
ALTER TABLE `partidas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `enigmas`
--
ALTER TABLE `enigmas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `partidas`
--
ALTER TABLE `partidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
