-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 10, 2024 at 07:43 AM
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
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `shteti` enum('Shqiperi','Maqedoni','Kosove','') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `user_id`, `address`, `shteti`) VALUES
(14, 206, '123 TR', 'Shqiperi'),
(17, 1, 'Tirane 1001 Liqeni', 'Shqiperi');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `imgUrl` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `imgUrl`) VALUES
(1, 'Food', 'https://img2.10bestmedia.com/Images/Photos/406808/The-Fresh-Market_55_660x440.jpg'),
(2, 'Smartphones', 'https://th.bing.com/th/id/OIP._agMEL9UGb1_5mDjH5n7wQHaEK?rs=1&pid=ImgDetMain'),
(3, 'Tablets', 'data:image/jpeg;base64,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'),
(4, 'PC', 'https://m.media-amazon.com/images/I/81jhBeNlXcL.jpg'),
(5, 'XBOX', 'https://assets.xboxservices.com/assets/fc/28/fc283911-f016-42d5-8e51-0dfca7ab5ce1.jpg?n=Shop-Consoles_Content-Placement_Hub_294958693_788x444.jpg'),
(6, 'Keyboards', 'https://media.wired.com/photos/65b0438c22aa647640de5c75/master/pass/Mechanical-Keyboard-Guide-Gear-GettyImages-1313504623.jpg'),
(7, 'Chairs', 'https://i0.wp.com/www.kidzmotion.co.uk/wp-content/uploads/2023/11/IMG_2917-scaled.jpg?fit=1024%2C683&ssl=1'),
(8, 'Headphones', 'https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg'),
(19, 'Toys', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.1X9tRLg1b3T2FDL4tbv9UQHaEH%26pid%3DApi&f=1&ipt=cafe2c2d079969318250c93eda3084ecee11ba0308d0f6e488a40a5e37b07208&ipo=images');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `status` enum('Paid','Proccessing','Shipped','Delivered','Cancelled') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total`, `status`, `created_at`, `order_details`) VALUES
('0169eee2-dde4-44a7-ac8a-fa168f881dd9', 1, 470, 'Delivered', '2024-09-07 16:43:34', '[{\"id\":4,\"name\":\"OPPO Reno12 5G\",\"details\":\"New Unlocked Android Phone!\",\"category\":2,\"cost\":350,\"price\":470,\"img\":\"https:\\/\\/opsg-img-cdn-gl.heytapimg.com\\/epb\\/202406\\/26\\/IzcVfAu2kdJjoeYS.png\",\"isHighlighted\":1,\"stock\":0,\"created_at\":\"2024-09-01 13:51:43\",\"isPublished\":0,\"qty\":1}]'),
('128e2316-a528-43d4-a544-e5adfb79848f', 206, 9, 'Paid', '2024-09-09 20:48:41', '[{\"id\":52,\"name\":\"Hasbro Gaming Monopoly Deal Card Game\",\"details\":\"Hasbro Gaming Monopoly Deal Card Game, Quick-Playing Card Game for 2-5 Players, Game for Families and Kids, Ages 8 and Up.\\n\\n    New Monopoly Deal card game that is moving through Family Game Nights everywhere\\n    Collect 3 complete property sets but beware of the Debt Collectors, Forced Deals and Deal Breakers\\n    If you are looking for a fun family\\/friend game, this is it\\n    Now only plays up to five players which takes apprx 45 min to play w\\/5 people, apprx 35 min w\\/4, apprx 15-25 minutes w\\/3 people and apprx 5-15 minutes w\\/2 people\\n    Fun, fast dealing\\u2026every card counts\\n\",\"category\":19,\"cost\":6,\"price\":9,\"img\":\"https:\\/\\/m.media-amazon.com\\/images\\/I\\/81SQgE435+L._AC_SL1500_.jpg\",\"isHighlighted\":0,\"stock\":21,\"created_at\":\"2024-09-09 18:27:32\",\"isPublished\":0,\"category_name\":\"Toys\",\"qty\":1}]'),
('1c55896b-a72b-41f1-b0b4-813723bcb5b5', 1, 1980, 'Shipped', '2024-09-06 17:04:39', '[{\"id\":49,\"name\":\"arion11112e\",\"details\":\"Arion Kosturi\",\"category\":3,\"cost\":30,\"price\":100,\"img\":\"https:\\/\\/th.bing.com\\/th\\/id\\/OIP.vggFhcDaZAZ0BLI1MKgUzgHaD-?rs=1&pid=ImgDetMain\",\"isHighlighted\":0,\"stock\":null,\"created_at\":\"2024-09-02 13:51:25\",\"isPublished\":1,\"qty\":1},{\"id\":4,\"name\":\"OPPO Reno12 5G\",\"details\":\"New Unlocked Android Phone!\",\"category\":2,\"cost\":350,\"price\":470,\"img\":\"https:\\/\\/opsg-img-cdn-gl.heytapimg.com\\/epb\\/202406\\/26\\/IzcVfAu2kdJjoeYS.png\",\"isHighlighted\":1,\"stock\":0,\"created_at\":\"2024-09-01 13:51:43\",\"isPublished\":0,\"qty\":4}]'),
('2614b8d5-425e-4c74-bbe4-5165f3666cd6', 1, 100, 'Paid', '2024-09-06 14:34:28', '[{\"id\":49,\"name\":\"arion11112e\",\"details\":\"Arion Kosturi\",\"category\":3,\"cost\":30,\"price\":100,\"img\":\"https:\\/\\/th.bing.com\\/th\\/id\\/OIP.vggFhcDaZAZ0BLI1MKgUzgHaD-?rs=1&pid=ImgDetMain\",\"isHighlighted\":0,\"stock\":null,\"created_at\":\"2024-09-02 13:51:25\",\"isPublished\":1,\"qty\":1}]'),
('2722ca3e-918a-45ca-abd4-128cf84b509e', 206, 15, 'Paid', '2024-09-09 20:51:02', '[{\"id\":51,\"name\":\"Hot Wheels Toy Cars & Trucks 10-Pack\",\"details\":\"Hot Wheels Toy Cars & Trucks 10-Pack, Set of 10 1:64 Scale Vehicles, Includes Race Cars, Semi, Rescue or Construction Trucks (Styles May Vary).\\n+ It\'s an instant collection with a Hot Wheels 10-Car pack of vehicles.\\n+ Each vehicle in the pack is designed in 1:64 scale with authentic styling and eye-catching decos\",\"category\":19,\"cost\":11,\"price\":15,\"img\":\"https:\\/\\/m.media-amazon.com\\/images\\/I\\/717vmR2p1OL._AC_SL1500_.jpg\",\"isHighlighted\":0,\"stock\":9,\"created_at\":\"2024-09-09 18:25:58\",\"isPublished\":0,\"category_name\":\"Toys\",\"qty\":1}]'),
('41dc6864-5f04-41e7-a169-b0aaa9eb68e2', 1, 470, 'Delivered', '2024-09-06 19:21:14', '[{\"id\":4,\"name\":\"OPPO Reno12 5G\",\"details\":\"New Unlocked Android Phone!\",\"category\":2,\"cost\":350,\"price\":470,\"img\":\"https:\\/\\/opsg-img-cdn-gl.heytapimg.com\\/epb\\/202406\\/26\\/IzcVfAu2kdJjoeYS.png\",\"isHighlighted\":1,\"stock\":0,\"created_at\":\"2024-09-01 13:51:43\",\"isPublished\":0,\"qty\":1}]'),
('476cc35d-5dc5-4a69-ba09-879b280d0485', 1, 430, 'Paid', '2024-09-09 20:05:46', '[{\"id\":5,\"name\":\"Google Pixel 7 Pro - 5G Android Phone - Unlocked Smartphone with Telephoto , Wide Angle Lens, and 24-Hour Battery - 128GB - Snow\",\"details\":\"\",\"category\":2,\"cost\":300,\"price\":430,\"img\":\"https:\\/\\/m.media-amazon.com\\/images\\/I\\/61bFypVJVyL._AC_SL1500_.jpg\",\"isHighlighted\":1,\"stock\":30,\"created_at\":\"2024-09-01 13:51:43\",\"isPublished\":1,\"category_name\":\"Smartphones\",\"qty\":1}]'),
('5e59add2-bc6b-4570-bbc6-d7b238c97735', 1, 470, 'Paid', '2024-09-06 14:35:24', '[{\"id\":4,\"name\":\"OPPO Reno12 5G\",\"details\":\"New Unlocked Android Phone!\",\"category\":2,\"cost\":350,\"price\":470,\"img\":\"https:\\/\\/opsg-img-cdn-gl.heytapimg.com\\/epb\\/202406\\/26\\/IzcVfAu2kdJjoeYS.png\",\"isHighlighted\":1,\"stock\":0,\"created_at\":\"2024-09-01 13:51:43\",\"isPublished\":0,\"qty\":1}]'),
('9aad75a8-c590-4123-a317-4267e23e4136', 206, 2449, 'Shipped', '2024-09-08 15:29:51', '[{\"id\":4,\"name\":\"OPPO Reno12 5G\",\"details\":\"New Unlocked Android Phone!\",\"category\":2,\"cost\":350,\"price\":470,\"img\":\"https:\\/\\/opsg-img-cdn-gl.heytapimg.com\\/epb\\/202406\\/26\\/IzcVfAu2kdJjoeYS.png\",\"isHighlighted\":1,\"stock\":0,\"created_at\":\"2024-09-01 13:51:43\",\"isPublished\":1,\"category_name\":\"Smartphones\",\"qty\":1},{\"id\":5,\"name\":\"Google Pixel 7 Pro - 5G Android Phone - Unlocked Smartphone with Telephoto , Wide Angle Lens, and 24-Hour Battery - 128GB - Snow\",\"details\":\"\",\"category\":2,\"cost\":300,\"price\":430,\"img\":\"https:\\/\\/m.media-amazon.com\\/images\\/I\\/61bFypVJVyL._AC_SL1500_.jpg\",\"isHighlighted\":1,\"stock\":0,\"created_at\":\"2024-09-01 13:51:43\",\"isPublished\":1,\"category_name\":\"Smartphones\",\"qty\":1},{\"id\":8,\"name\":\"OnePlus 12R, 8GB RAM+128GB, Dual-Sim, 50MP Camera, 80W Fast Charging\",\"details\":\"\",\"category\":2,\"cost\":380,\"price\":449,\"img\":\"https:\\/\\/m.media-amazon.com\\/images\\/I\\/71xMs88FYbL._AC_SL1500_.jpg\",\"isHighlighted\":0,\"stock\":0,\"created_at\":\"2024-09-01 13:51:43\",\"isPublished\":0,\"category_name\":\"Smartphones\",\"qty\":1},{\"id\":9,\"name\":\"SAMSUNG Galaxy S24 Ultra 512GB\",\"details\":\"\",\"category\":2,\"cost\":900,\"price\":1100,\"img\":\"https:\\/\\/m.media-amazon.com\\/images\\/I\\/71WcjsOVOmL._AC_SL1500_.jpg\",\"isHighlighted\":0,\"stock\":0,\"created_at\":\"2024-09-01 13:51:43\",\"isPublished\":0,\"category_name\":\"Smartphones\",\"qty\":1}]'),
('b4744f60-8fc5-4cf6-9edf-4dc247a6b4a4', 1, 100, 'Paid', '2024-09-09 15:55:18', '[{\"id\":49,\"name\":\"arion11112e\",\"details\":\"Arion Kosturi\",\"category\":3,\"cost\":30,\"price\":100,\"img\":\"https:\\/\\/th.bing.com\\/th\\/id\\/OIP.vggFhcDaZAZ0BLI1MKgUzgHaD-?rs=1&pid=ImgDetMain\",\"isHighlighted\":0,\"stock\":30,\"created_at\":\"2024-09-02 13:51:25\",\"isPublished\":1,\"category_name\":\"Tablets\",\"qty\":1}]'),
('b6fc2185-ac86-46df-8566-637f109fa529', 1, 100, 'Paid', '2024-09-09 16:13:39', '[{\"id\":47,\"name\":\"test 123\",\"details\":\"test\",\"category\":null,\"cost\":100,\"price\":100,\"img\":\"https:\\/\\/th.bing.com\\/th\\/id\\/OIP.3MxqaJv2Z5QsG7wIXzizjAHaEo?w=295&h=180&c=7&r=0&o=5&pid=1.7\",\"isHighlighted\":1,\"stock\":3,\"created_at\":\"2024-09-02 13:47:53\",\"isPublished\":1,\"category_name\":null,\"qty\":1}]'),
('bd056369-a62d-4ef3-ac79-2daa3684959c', 1, 470, 'Shipped', '2024-09-07 16:44:23', '[{\"id\":4,\"name\":\"OPPO Reno12 5G\",\"details\":\"New Unlocked Android Phone!\",\"category\":2,\"cost\":350,\"price\":470,\"img\":\"https:\\/\\/opsg-img-cdn-gl.heytapimg.com\\/epb\\/202406\\/26\\/IzcVfAu2kdJjoeYS.png\",\"isHighlighted\":1,\"stock\":0,\"created_at\":\"2024-09-01 13:51:43\",\"isPublished\":0,\"qty\":1}]'),
('c8921b21-f66b-4d27-9a8d-bb62008b172b', 1, 689, 'Paid', '2024-09-06 15:14:42', '[{\"id\":49,\"name\":\"arion11112e\",\"details\":\"Arion Kosturi\",\"category\":3,\"cost\":30,\"price\":100,\"img\":\"https:\\/\\/th.bing.com\\/th\\/id\\/OIP.vggFhcDaZAZ0BLI1MKgUzgHaD-?rs=1&pid=ImgDetMain\",\"isHighlighted\":0,\"stock\":null,\"created_at\":\"2024-09-02 13:51:25\",\"isPublished\":1,\"qty\":1},{\"id\":6,\"name\":\"SAMSUNG Galaxy A15 5G, 128GB, US Version\",\"details\":\"\",\"category\":2,\"cost\":100,\"price\":199,\"img\":\"https:\\/\\/m.media-amazon.com\\/images\\/I\\/41vU1u8DZXL._AC_SL1000_.jpg\",\"isHighlighted\":0,\"stock\":0,\"created_at\":\"2024-09-01 13:51:43\",\"isPublished\":0,\"qty\":1},{\"id\":10,\"name\":\"Apple iPad (9th Generation): with A13 Bionic chip, 10.2-inch Retina Display, 256GB, Wi-Fi\",\"details\":\"\",\"category\":3,\"cost\":300,\"price\":390,\"img\":\"https:\\/\\/m.media-amazon.com\\/images\\/I\\/61NGnpjoRDL._AC_SL1500_.jpg\",\"isHighlighted\":0,\"stock\":0,\"created_at\":\"2024-09-01 13:51:43\",\"isPublished\":0,\"qty\":1}]'),
('fcfefdd0-4450-4525-b804-07d480b190ee', 206, 16, 'Paid', '2024-09-09 20:59:58', '[{\"id\":49,\"name\":\"Hasbro Gaming Jenga Wooden Blocks\",\"details\":\"Hasbro Gaming Jenga Wooden Blocks Stacking Tumbling Tower, Kids Game Ages 6 and Up\\n+ GREAT PARTY GAME: Liven up a party by bringing out the Jenga game; This classic block stacking game is simple, easy to learn, and makes a great birthday or holiday gift for adults and kids\\n+ GREAT PARTY GAME: Liven up a party by bringing out the Jenga game! This classic block stacking game is simple, easy to learn, and makes a great birthday or holiday gift for adults and kids\\n+ THE ORIGINAL WOOD BLOCK GAME: The Jenga game is the original wood block game that families have loved for generations\\n    Who will make the tower fall? Great for Family Game night\\n\",\"category\":19,\"cost\":10,\"price\":16,\"img\":\"https:\\/\\/m.media-amazon.com\\/images\\/I\\/815ZoU2clxL._AC_SL1500_.jpg\",\"isHighlighted\":0,\"stock\":15,\"created_at\":\"2024-09-02 13:51:25\",\"isPublished\":0,\"category_name\":\"Toys\",\"qty\":1}]');

-- --------------------------------------------------------

--
-- Table structure for table `order_line`
--

CREATE TABLE `order_line` (
  `id` int(11) NOT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `order_line`
--

INSERT INTO `order_line` (`id`, `order_id`, `product_id`, `qty`) VALUES
(27, '2614b8d5-425e-4c74-bbe4-5165f3666cd6', 49, 1),
(28, '5e59add2-bc6b-4570-bbc6-d7b238c97735', 4, 1),
(29, 'c8921b21-f66b-4d27-9a8d-bb62008b172b', 49, 1),
(30, 'c8921b21-f66b-4d27-9a8d-bb62008b172b', 6, 1),
(31, 'c8921b21-f66b-4d27-9a8d-bb62008b172b', 10, 1),
(32, '1c55896b-a72b-41f1-b0b4-813723bcb5b5', 49, 1),
(33, '1c55896b-a72b-41f1-b0b4-813723bcb5b5', 4, 4),
(36, '41dc6864-5f04-41e7-a169-b0aaa9eb68e2', 4, 1),
(37, '0169eee2-dde4-44a7-ac8a-fa168f881dd9', 4, 1),
(38, 'bd056369-a62d-4ef3-ac79-2daa3684959c', 4, 1),
(39, '9aad75a8-c590-4123-a317-4267e23e4136', 4, 1),
(40, '9aad75a8-c590-4123-a317-4267e23e4136', 5, 1),
(41, '9aad75a8-c590-4123-a317-4267e23e4136', 8, 1),
(42, '9aad75a8-c590-4123-a317-4267e23e4136', 9, 1),
(45, 'b4744f60-8fc5-4cf6-9edf-4dc247a6b4a4', 49, 1),
(46, 'b6fc2185-ac86-46df-8566-637f109fa529', 47, 1),
(47, '476cc35d-5dc5-4a69-ba09-879b280d0485', 5, 1),
(48, '128e2316-a528-43d4-a544-e5adfb79848f', 52, 1),
(49, '2722ca3e-918a-45ca-abd4-128cf84b509e', 51, 1),
(50, 'fcfefdd0-4450-4525-b804-07d480b190ee', 49, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `img` varchar(300) DEFAULT 'noimage.png',
  `isHighlighted` tinyint(1) DEFAULT 0,
  `stock` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `isPublished` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `details`, `category`, `cost`, `price`, `img`, `isHighlighted`, `stock`, `created_at`, `isPublished`) VALUES
(4, 'OPPO Reno12 5G', 'New Unlocked Android Phone!', 2, 350, 470, 'https://opsg-img-cdn-gl.heytapimg.com/epb/202406/26/IzcVfAu2kdJjoeYS.png', 1, 12, '2024-09-01 13:51:43', 1),
(5, 'Google Pixel 7 Pro - 5G Android Phone - Unlocked Smartphone with Telephoto , Wide Angle Lens, and 24-Hour Battery - 128GB - Snow', '', 2, 300, 430, 'https://m.media-amazon.com/images/I/61bFypVJVyL._AC_SL1500_.jpg', 1, 29, '2024-09-01 13:51:43', 1),
(6, 'SAMSUNG Galaxy A15 5G, 128GB, US Version', '', 2, 100, 199, 'https://m.media-amazon.com/images/I/41vU1u8DZXL._AC_SL1000_.jpg', 0, 6, '2024-09-01 13:51:43', 1),
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
(47, 'Mattel Games UNO Card Game', 'Mattel Games UNO Card Game for Family Night, \nTravel Game & Gift for Kids in a Collectible Storage Tin for 2-10 Players', 19, 7, 10, 'https://m.media-amazon.com/images/I/813J6ld2EJL._AC_SL1500_.jpg', 1, 5, '2024-09-02 13:47:53', 1),
(49, 'Hasbro Gaming Jenga Wooden Blocks', 'Hasbro Gaming Jenga Wooden Blocks Stacking Tumbling Tower, Kids Game Ages 6 and Up\n+ GREAT PARTY GAME: Liven up a party by bringing out the Jenga game; This classic block stacking game is simple, easy to learn, and makes a great birthday or holiday gift for adults and kids\n+ GREAT PARTY GAME: Liven up a party by bringing out the Jenga game! This classic block stacking game is simple, easy to learn, and makes a great birthday or holiday gift for adults and kids\n+ THE ORIGINAL WOOD BLOCK GAME: The Jenga game is the original wood block game that families have loved for generations\n    Who will make the tower fall? Great for Family Game night\n', 19, 10, 16, 'https://m.media-amazon.com/images/I/815ZoU2clxL._AC_SL1500_.jpg', 0, 14, '2024-09-02 13:51:25', 0),
(51, 'Hot Wheels Toy Cars & Trucks 10-Pack', 'Hot Wheels Toy Cars & Trucks 10-Pack, Set of 10 1:64 Scale Vehicles, Includes Race Cars, Semi, Rescue or Construction Trucks (Styles May Vary).\n+ It\'s an instant collection with a Hot Wheels 10-Car pack of vehicles.\n+ Each vehicle in the pack is designed in 1:64 scale with authentic styling and eye-catching decos', 19, 11, 15, 'https://m.media-amazon.com/images/I/717vmR2p1OL._AC_SL1500_.jpg', 0, 8, '2024-09-09 18:25:58', 0),
(52, 'Hasbro Gaming Monopoly Deal Card Game', 'Hasbro Gaming Monopoly Deal Card Game, Quick-Playing Card Game for 2-5 Players, Game for Families and Kids, Ages 8 and Up.\n\n    New Monopoly Deal card game that is moving through Family Game Nights everywhere\n    Collect 3 complete property sets but beware of the Debt Collectors, Forced Deals and Deal Breakers\n    If you are looking for a fun family/friend game, this is it\n    Now only plays up to five players which takes apprx 45 min to play w/5 people, apprx 35 min w/4, apprx 15-25 minutes w/3 people and apprx 5-15 minutes w/2 people\n    Fun, fast dealing…every card counts\n', 19, 6, 9, 'https://m.media-amazon.com/images/I/81SQgE435+L._AC_SL1500_.jpg', 0, 20, '2024-09-09 18:27:32', 0);

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
(2, 4, 2, 'Nice1!!!!', 4),
(7, 49, 1, 'Doesnt work!', 1),
(8, 49, 205, 'testing', 5),
(12, 49, 205, 'test', 4),
(14, 49, 205, 'kot fare', 4),
(15, 47, 1, 'test', 4),
(16, 8, 1, 'nice cellphone !', 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('admin','client') DEFAULT 'client'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `role`) VALUES
(1, 'arionkosturi@gmail.com', 'arionkosturi', '$2y$10$lHTYapSfulIX4Z9skg7wxe/ZQ096WTImg5HW/LGPzE0T0HwjAB34q', 'admin'),
(2, 'client@test.com', 'client1', '$2y$10$5ecTR3cQI2M9/t/Y6WzfWON.gl1oDuzfikqse8FRIK2Poxis1Edai', 'client'),
(101, 'johnsmith@gmail.com', 'johnsmith', '$2y$10$svCuzUiphr.e1SlzIGBwOu6Co9pRCaJ9k4Ta/hko7XckSHXhmiVPO', 'client'),
(103, 'john@john.com', 'john@john.com', '$2y$10$M2EdwjGCgU1kKP2PkFxbM.ds1yYQK7FBi6CKedgxsaiZMI6loAxQq', NULL),
(108, 'abc@b.com', 'a@b.com', '$2y$10$rfyivMFFviZZ8KH9X1rrCenuWULr5.lq.Ouqg4.3kyD6ewbCGG5Ee', 'client'),
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
(204, 'johnsmith333333@gmail.com', 'johnsmith333333@gmail.com', '$2y$10$zgTaL8J17Z4hGbuEmpOOsuu7Vc4NwiTzyK90RFgJZ7sK1HMi4USni', NULL),
(205, 'client1@gmail.com', 'client1', '$2y$10$V1SNJV9rXo7TRjllZJ78deKbAneiBHWuy6.v9ypMFTqkT6DdaKPVC', 'client'),
(206, 'client@gmail.com', 'client', '$2y$10$K25HtO/Kmg044jU5koy5rOkZXKuTNYTt6LupvOk2UzWeKUbLZM6NO', 'client');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_addresses_user_id` (`user_id`);

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
  ADD KEY `fk_product_category_id` (`category`);

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
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `order_line`
--
ALTER TABLE `order_line`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `reklama`
--
ALTER TABLE `reklama`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=207;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `fk_addresses_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `fk_product_category_id` FOREIGN KEY (`category`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
