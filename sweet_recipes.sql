-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 11-12-2024 a las 00:22:37
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sweet_recipes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `idcategoria` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`idcategoria`, `nombre`, `descripcion`, `id_user`) VALUES
(2, 'chocolate', 'undefined', 2),
(3, 'undefined', 'undefined', NULL),
(4, 'pasteles', 'horneables ', NULL),
(5, 'sabritas', 'bchjbwjbc', 6),
(6, 'vegana', 'ay amiga soy vegana', 4),
(7, 'dqdwq', 'defwew', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetas`
--

CREATE TABLE `recetas` (
  `idrecetas` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `titulo` varchar(70) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `instrucciones` text DEFAULT NULL,
  `ingredientes` varchar(100) NOT NULL,
  `tiempo_coccion` int(11) DEFAULT NULL,
  `id_categoria` int(11) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recetas`
--

INSERT INTO `recetas` (`idrecetas`, `id_user`, `titulo`, `descripcion`, `instrucciones`, `ingredientes`, `tiempo_coccion`, `id_categoria`, `imagen`) VALUES
(2, 2, 'pay de fresa', 'delicioso', 'primero debes de tener todos los ingrediantes', '', 10, 2, 'yUU1z3CVP9YRPz_KPzYhb_QM.jpeg'),
(3, 2, 'mnbm', 'bmnbmn', 'ghghkj', 'mnbmnb', 56, 2, 'sin imagen');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idusers` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idusers`, `name`, `username`, `password`, `email`, `role`) VALUES
(1, '', 'po', '$2a$10$EdZFnc4Cb.FvI5HWUKdVz.PSebE0JURVVB62.iknLGfM5GgVFjR6u', 'po', 'usuario'),
(2, 'chefsito', 'chef1', '$2a$10$.zcfp/UBujqK1zHwhiki0OtLM./JnwjkFINljwQdxDOQXrOPiFA3O', 'chef@gmail.com', 'usuario'),
(4, '', 'pi', '$2a$10$8kOlBcerGv1/P.hPRlBfrOnQ4V9c5s67sRrKkLAA0PuGw53sesgkW', '', 'Usuario'),
(6, 'alexa', 'alexa', '$2a$10$ukAsjcuxx3WCAByy.mpZYung5ZTbJu8mRgmgHVqZBGStVvcdWhKNa', 'a@gmail.com', 'Usuario'),
(7, 'jonathan', 'jonathan', '$2a$10$65rR8WhIjRHPPMXaJka35Ocq1hz4txkveSWIHSJDJVT2r6ICBIjry', 'jonathan@gmail.com', 'Usuario'),
(8, 'bidibiba', 'bidibiba', '$2a$10$bEHshLIRy59Mp9IG6fyJ8u6c7SToZQB0yPK1r.6ihkfHkwXdAcG8y', 'b@gmail.com', 'Usuario'),
(9, 'pipi', 'pipi', '$2a$10$tDKcev1gOmx.oNyEJWUAaOhmn2LVIMUqtl4iyXR6DPb5fP8kM8o7m', 'pipi@gmail.com', 'Usuario'),
(10, 'leslie', 'leslie', '$2a$10$gq7UK5MzrH98dKFnQaPWJOJ7AzTPFYZAsRheisLnxZuqF.WO1QFt6', 'les@gmail.com', 'Usuario');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`idcategoria`);

--
-- Indices de la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD PRIMARY KEY (`idrecetas`),
  ADD KEY `id_usuario` (`id_user`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idusers`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `idcategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `recetas`
--
ALTER TABLE `recetas`
  MODIFY `idrecetas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `idusers` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD CONSTRAINT `recetas_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`idusers`) ON DELETE CASCADE,
  ADD CONSTRAINT `recetas_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`idcategoria`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
