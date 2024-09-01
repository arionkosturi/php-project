-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 01, 2024 at 03:55 PM
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
  `name` varchar(45) NOT NULL,
  `imgUrl` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `imgUrl`) VALUES
(1, 'Food', ''),
(2, 'Smartphones', 'https://th.bing.com/th/id/OIP._agMEL9UGb1_5mDjH5n7wQHaEK?rs=1&pid=ImgDetMain'),
(3, 'Tablets', ''),
(4, 'PC', ''),
(5, 'XBOX', ''),
(6, 'Keyboards', ''),
(7, 'Chairs', ''),
(8, 'Headphones', '');

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
  `details` text NOT NULL,
  `category_id` int(11) NOT NULL,
  `cost` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `img` varchar(300) DEFAULT 'noimage.png',
  `isHighlighted` tinyint(1) NOT NULL DEFAULT 0,
  `stock` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `isPublished` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `details`, `category_id`, `cost`, `price`, `img`, `isHighlighted`, `stock`, `created_at`, `isPublished`) VALUES
(4, 'OPPO Reno12 5G', 'New Unlocked Android Phone!', 2, 350, 470, 'https://opsg-img-cdn-gl.heytapimg.com/epb/202406/26/IzcVfAu2kdJjoeYS.png', 1, 0, '2024-09-01 13:51:43', 1),
(5, 'Google Pixel 7 Pro - 5G Android Phone - Unlocked Smartphone with Telephoto , Wide Angle Lens, and 24-Hour Battery - 128GB - Snow', '', 2, 300, 430, 'https://m.media-amazon.com/images/I/61bFypVJVyL._AC_SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(6, 'SAMSUNG Galaxy A15 5G, 128GB, US Version', '', 2, 100, 199, 'https://m.media-amazon.com/images/I/41vU1u8DZXL._AC_SL1000_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(7, 'Moto G Play 2023 3-Day Battery Unlocked Made for US 3/32GB 16MP Camera Navy Blue', '', 2, 60, 99, 'https://m.media-amazon.com/images/I/61K1Fz5LxvL._AC_SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(8, 'OnePlus 12R, 8GB RAM+128GB, Dual-Sim, 50MP Camera, 80W Fast Charging', '', 2, 380, 449, 'https://m.media-amazon.com/images/I/71xMs88FYbL._AC_SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(9, 'SAMSUNG Galaxy S24 Ultra 512GB', '', 2, 900, 1100, 'https://m.media-amazon.com/images/I/71WcjsOVOmL._AC_SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(10, 'Apple iPad (9th Generation): with A13 Bionic chip, 10.2-inch Retina Display, 256GB, Wi-Fi', '', 3, 300, 390, 'https://m.media-amazon.com/images/I/61NGnpjoRDL._AC_SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(11, 'SAMSUNG Galaxy Tab S6 Lite (2024) 10.4\" 64GB WiFi', '', 3, 100, 199, 'https://m.media-amazon.com/images/I/61QfSvAihfL._AC_SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(12, 'SAMSUNG Galaxy Tab A9+ Tablet 11” 64GB', '', 3, 130, 179, 'https://m.media-amazon.com/images/I/61d46oYQgdL._AC_SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(13, 'PXN V99 Force Feedback Gaming Steering Wheel Xbox PC,270/900 Degree Racing Wheel with 3-Pedals and Shifter Bundle for PC,PS4, Xbox One, Xbox Series X/S', '', 5, 180, 229, 'https://m.media-amazon.com/images/I/71QoGSGgEzL._SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(14, 'Xbox Series S 512GB SSD Console - Includes Xbox Wireless Controller', '', 5, 200, 299, 'https://m.media-amazon.com/images/I/61QKAlzPSfL._SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(15, 'Xbox Series X 1TB SSD Console', '', 5, 380, 439, 'https://m.media-amazon.com/images/I/51ojzJk77qL._SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(16, 'Thermaltake LCGS Quartz i460T R4 Gaming Desktop (Intel Core™ i5-13400F, ToughRam DDR4 3600Mhz 16GB RGB Memory, NVIDIA GeForce® RTX 4060 Ti, 1TB NVMe M.2, Windows 11) S2QT-B66R-46T-LCS', '', 4, 800, 899, 'https://m.media-amazon.com/images/I/81JtHUVy7+L._AC_SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(17, 'Skytech Gaming Shadow Gaming PC Desktop – AMD Ryzen 7 5700X 3.4 GHz, NVIDIA RTX 4060, 1TB NVME SSD, 16GB DDR4 RAM 3200, 600W Gold PSU, 11AC Wi-Fi, Windows', '', 4, 880, 999, 'https://m.media-amazon.com/images/I/614+Y-V33GL._AC_SL1000_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(18, 'Womier S-K80 75% Keyboard with Color Multimedia Display Mechanical Gaming Keyboard, Hot Swappable Keyboard, Gasket Mount RGB Custom', '', 6, 40, 69, 'https://m.media-amazon.com/images/I/71duf0rTDqL._AC_SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(19, 'Womier 60% Percent Keyboard, WK61 Mechanical RGB Wired Gaming Keyboard, Hot-Swappable Keyboard with Blue Sea PBT', '', 6, 20, 36, 'https://m.media-amazon.com/images/I/71mO+FpdiyL._AC_SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(20, 'Logitech G915 TKL Tenkeyless Lightspeed Wireless RGB Mechanical Gaming Keyboard', '', 6, 90, 119, 'https://m.media-amazon.com/images/I/61ZWM3EWg5L._AC_SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(21, 'ASUS ROG Azoth 75% Wireless DIY Custom Gaming Keyboard, OLED Display', '', 6, 210, 249, 'https://m.media-amazon.com/images/I/51tjkM3lkhL._AC_SL1080_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(22, 'GTPLAYER Gaming Chair, Computer Chair with Footrest and Lumbar Support', '', 7, 130, 180, 'https://m.media-amazon.com/images/I/71PyDU2N2QL._AC_SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(23, 'Dowinx Gaming Chair Fabric with Pocket Spring Cushion', '', 7, 130, 190, 'https://m.media-amazon.com/images/I/61t2bYdHrYL._AC_SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(24, 'GTRACING Gaming Chair with Footrest Speakers Video Game Chair Bluetooth Music', '', 7, 100, 129, 'https://m.media-amazon.com/images/I/71y9SgG-XaS._AC_SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(25, 'AutoFull Gaming Chair PC Chair with Ergonomics Lumbar Support, Racing Style PU Leather High Back Adjustable Swivel Task Chair with Footrest', '', 7, 199, 249, 'https://m.media-amazon.com/images/I/41DCsiTx+lL.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(26, 'The Crew Furniture Classic Video Rocker Floor Gaming Chair', '', 7, 20, 39, 'https://m.media-amazon.com/images/I/61xg0aPxgWL._AC_SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(27, 'JLab JBuds Lux ANC Wireless Headphones', '', 8, 30, 49, 'https://m.media-amazon.com/images/I/41UPaI9VqUL._AC_SL1000_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(28, 'JBL Tune 510BT', '', 8, 15, 29, 'https://m.media-amazon.com/images/I/51EUjPMn6UL._AC_SL1500_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(29, 'Soundcore Anker Life Q20 Hybrid Active Noise Cancelling', '', 8, 28, 49, 'https://m.media-amazon.com/images/I/61O7S27O+jL._AC_SL1468_.jpg', 0, 0, '2024-09-01 13:51:43', 0),
(30, 'Sony WH-1000XM5 The Best Wireless Noise Canceling Headphones with Auto Noise Canceling Optimizer', '', 8, 280, 329, 'https://m.media-amazon.com/images/I/61vJtKbAssL._AC_SL1500_.jpg', 1, 0, '2024-09-01 13:51:43', 1);

-- --------------------------------------------------------

--
-- Table structure for table `reklama`
--

CREATE TABLE `reklama` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `imgUrl` text NOT NULL,
  `partner` varchar(255) NOT NULL,
  `target` varchar(255) NOT NULL,
  `starts_at` datetime NOT NULL DEFAULT current_timestamp(),
  `ends_at` datetime NOT NULL DEFAULT current_timestamp(),
  `isPublished` tinyint(1) NOT NULL,
  `buttonMessage` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reklama`
--

INSERT INTO `reklama` (`id`, `title`, `imgUrl`, `partner`, `target`, `starts_at`, `ends_at`, `isPublished`, `buttonMessage`, `created_at`) VALUES
(1, 'Reklame Test', 'https://th.bing.com/th/id/OIP.B0wvP9Eyn3lJd8QENUQH3AHaFR?w=229&h=180&c=7&r=0&o=5&pid=1.7', 'Reklame Test', 'Reklame Test', '2024-09-01 00:00:00', '2024-09-04 00:00:00', 1, 'Reklame Test', '2024-09-01 15:29:32'),
(2, 'Reklame Test', 'https://th.bing.com/th/id/OIP.O3LiPodZtWoE0R71RNBqzAHaHo?rs=1&pid=ImgDetMain', 'Reklame Test', 'Reklame Test', '2024-09-01 00:00:00', '2024-09-02 00:00:00', 1, 'Reklame Test', '2024-09-01 15:29:32');

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
-- Indexes for table `reklama`
--
ALTER TABLE `reklama`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `reklama`
--
ALTER TABLE `reklama`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
