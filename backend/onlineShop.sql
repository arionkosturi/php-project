-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 31, 2024 at 11:07 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `onlineShop`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Food'),
(2, 'Smartphones');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `status` enum('paid','proccessing','shipped','delivered','cancelled') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total`, `status`) VALUES
(1, 2, 100, 'paid'),
(2, 2, 30, 'paid');

-- --------------------------------------------------------

--
-- Table structure for table `order_line`
--

CREATE TABLE `order_line` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `order_line`
--

INSERT INTO `order_line` (`id`, `order_id`, `product_id`, `qty`) VALUES
(4, 1, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `cost` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `img` varchar(300) DEFAULT 'noimage.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category_id`, `cost`, `price`, `img`) VALUES
(4, 'OPPO Reno12 5G', 1, 350, 470, 'https://opsg-img-cdn-gl.heytapimg.com/epb/202406/26/IzcVfAu2kdJjoeYS.png'),
(5, 'Google Pixel 7 Pro - 5G Android Phone - Unlocked Smartphone with Telephoto , Wide Angle Lens, and 24-Hour Battery - 128GB - Snow', 2, 300, 430, 'https://m.media-amazon.com/images/I/61bFypVJVyL._AC_SL1500_.jpg'),
(6, 'SAMSUNG Galaxy A15 5G, 128GB, US Version', 2, 100, 199, 'https://m.media-amazon.com/images/I/41vU1u8DZXL._AC_SL1000_.jpg'),
(7, 'Moto G Play 2023 3-Day Battery Unlocked Made for US 3/32GB 16MP Camera Navy Blue', 2, 60, 99, 'https://m.media-amazon.com/images/I/61K1Fz5LxvL._AC_SL1500_.jpg'),
(8, 'OnePlus 12R, 8GB RAM+128GB, Dual-Sim, 50MP Camera, 80W Fast Charging', 2, 380, 449, 'https://m.media-amazon.com/images/I/71xMs88FYbL._AC_SL1500_.jpg'),
(9, 'SAMSUNG Galaxy S24 Ultra 512GB', 2, 900, 1100, 'https://m.media-amazon.com/images/I/71WcjsOVOmL._AC_SL1500_.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content` varchar(45) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `product_id`, `user_id`, `content`, `rating`) VALUES
(2, 4, 2, 'Nice1!!!!', 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('admin','client') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `role`) VALUES
(1, 'arionkosturi@gmail.com', 'arionkosturi', '$2y$10$lHTYapSfulIX4Z9skg7wxe/ZQ096WTImg5HW/LGPzE0T0HwjAB34q', 'admin'),
(2, 'client@test.com', 'client1', '$2y$10$aVpNgkAMwRAyZFpKTyHw6erM1MpmRX2yMOQNgVq4DTRqFOiqmbn/u', 'client'),
(94, 'clientqw12132@test.com', 'client', '$2y$10$r3WMiwWN9SPE1tXPazl8W.jnRiJrklrcFMpSZJaRzN0KyemEC.t5.', NULL),
(97, 'client132@test.com', 'client', '$2y$10$eevqx5veSY.mIRwLqHiqLOboPErsDD3aryB8x4OrJAb7AvEBTJXI2', NULL),
(101, 'johnsmith@gmail.com', 'johnsmith', '$2y$10$svCuzUiphr.e1SlzIGBwOu6Co9pRCaJ9k4Ta/hko7XckSHXhmiVPO', NULL),
(103, 'john@john.com', 'john@john.com', '$2y$10$M2EdwjGCgU1kKP2PkFxbM.ds1yYQK7FBi6CKedgxsaiZMI6loAxQq', NULL),
(105, 'a@b.com', 'abc', '$2y$10$LSj.CrS.gG5iDuzmwYW1eeKS8EMzcaHyTOLZsNbXral5g8SvK4UVq', NULL),
(108, 'abc@b.com', 'a@b.com', '$2y$10$rfyivMFFviZZ8KH9X1rrCenuWULr5.lq.Ouqg4.3kyD6ewbCGG5Ee', NULL),
(111, 'a11@b.com', 'a@b.com', '$2y$10$KgU/8SBY9qD9Gl0lr8aDWuwJJ8.AXE3Bgshu560x7T6BFX/tVIHcm', NULL),
(120, 'client1312@test.com', 'client', '$2y$10$oof58eYS3rCAHsZe1C1zX.V2VtU9xzapN0Eqie2EVgeAugUxImtti', NULL),
(129, 'client131112@test.com', 'client', '$2y$10$NYODyfyEgzjr8AwoxD.yYeUr3AWDTagbc6dfuDDVb2uQXRmXZYsQy', NULL),
(133, 'client13111212@test.com', 'client', '$2y$10$XLUFLThkPHiXSSr1rXRTGeqAP1HlvLkp15l4BCAemTdwQxYVTo.Tm', NULL),
(137, 'client131111212@test.com', 'client', '$2y$10$v08zImi9pqyHAAS0Tg9lmemY7bOe98TjaricyxzcmuyQiqPBQTzvu', NULL),
(138, 'client1311111dd1d1212@test.com', 'client', '$2y$10$.a4hIh9sj1YeWgptiOIFiecRrceieKV3doKFViwUhJVuxBAgk/nui', NULL),
(140, 'client1311111ddq1d1212@test.com', 'client', '$2y$10$J5o7abam5uQuOB99CPDdj.ogYWko7g7vD2Tx7firXwpf9UwmymoKa', NULL),
(143, 'client131111QDddq1d1212@test.com', 'client', '$2y$10$e0TS8Sa3bSw8PgnWiwBvA.WnKxI1Ik6gXObFhktefV5UiBwwa.PEK', NULL),
(146, 'client1311111QDddq1d1212@test.com', 'client', '$2y$10$6AkSJsqg4lA7hh2tk2fB5u3C92QMeJuKNT5lFs6tUWSTC/dYepbYa', NULL),
(152, 'client13111111QDddq1d1212@test.com', 'client', '$2y$10$eIVH3SySiZ1PdUnXVyTXF.A.lL2VGY6SLBv9TrAFJwXBmrDx4Nwxa', NULL),
(170, 'client13111dq1d1212@test.com', 'client', '$2y$10$N66bP.AXNKomnJq40SvqWuc4J6h1u3sDUeRhL4XH/Ks8pWYT1hdCy', NULL),
(178, 'johnsmith99@gmail.com', 'johnsmith', '$2y$10$8IGz5/cFLha6dkz5AXc8TuOkdwLUnPdZo.TBbaHDwWfo./UBIzsi6', NULL),
(187, 'johnsmith', 'johnsmith', '$2y$10$LNOrZed0o4C4qpGwhfIFauLE5qyBFMG2DOvHlE2uP4.YyhQyhbT6a', NULL),
(189, 'johnsmith2@gmail.comm', 'johnsmith', '$2y$10$EQWjf3wp7xyhecAw.OGIIOOhNmFxdzYY7jtW8RXJhzgzE66/GynM2', NULL),
(194, 'johnsmith2@gmail.com', 'johnsmith@gmail.com', '$2y$10$xka9FCIUUirEgIwM0rDuyOQGLrNAZjuHNWDcUsjgM0ZykD70A1hgC', NULL),
(195, 'johnsmith33@gmail.com', 'johnsmith@gmail.com', '$2y$10$A7F0HntR5jEME3SCmzJvreoD1n3L0/6p0buNkOaa7pA5nKywUTfQa', NULL),
(204, 'johnsmith333333@gmail.com', 'johnsmith333333@gmail.com', '$2y$10$zgTaL8J17Z4hGbuEmpOOsuu7Vc4NwiTzyK90RFgJZ7sK1HMi4USni', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_user_id` (`user_id`);

--
-- Indexes for table `order_line`
--
ALTER TABLE `order_line`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_line_order_id` (`order_id`),
  ADD KEY `fk_order_line_product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_category_id` (`category_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reviews_user_id` (`user_id`),
  ADD KEY `fk_reviews_product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order_line`
--
ALTER TABLE `order_line`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_order_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_line`
--
ALTER TABLE `order_line`
  ADD CONSTRAINT `fk_order_line_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_line_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_product_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_reviews_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_reviews_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
