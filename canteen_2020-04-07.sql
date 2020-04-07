# ************************************************************
# Sequel Pro SQL dump
# Version 5438
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.25)
# Database: canteen
# Generation Time: 2020-04-07 15:01:10 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table admins
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admins`;

CREATE TABLE `admins` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admins_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`)
VALUES
	(1,'huangdj','244500972@qq.com','$2y$10$sg3JkQ/QLT5GqQNEyDp9E.6xMktBpMF7d5TpdALEaVs/XwqFQvJla',NULL,NULL,NULL);

/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table bags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bags`;

CREATE TABLE `bags` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `photo_id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `bags` WRITE;
/*!40000 ALTER TABLE `bags` DISABLE KEYS */;

INSERT INTO `bags` (`id`, `photo_id`, `name`, `code`, `price`, `created_at`, `updated_at`)
VALUES
	(1,1,'大号','123123',0.30,'2019-12-25 10:47:10','2019-12-25 10:47:10'),
	(2,1,'小号','123456',0.20,'2019-12-25 10:47:10','2019-12-25 11:42:02');

/*!40000 ALTER TABLE `bags` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table carts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `carts`;

CREATE TABLE `carts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL COMMENT '商品id',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `bag_id` int(11) DEFAULT NULL,
  `num` int(11) NOT NULL DEFAULT '1' COMMENT '数量',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;

INSERT INTO `carts` (`id`, `product_id`, `user_id`, `bag_id`, `num`, `created_at`, `updated_at`)
VALUES
	(1,3,5,NULL,2,'2019-12-31 08:24:29','2019-12-31 08:24:38'),
	(2,NULL,5,1,2,'2019-12-31 08:24:47','2019-12-31 08:25:08'),
	(3,NULL,5,2,1,'2019-12-31 08:25:27','2019-12-31 08:25:27');

/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table coupon_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `coupon_user`;

CREATE TABLE `coupon_user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `coupon_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table coupons
# ------------------------------------------------------------

DROP TABLE IF EXISTS `coupons`;

CREATE TABLE `coupons` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标题',
  `photo_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '图片',
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '优惠券类型，支持固定金额和百分比折扣',
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '折扣值，根据不同类型含义不同',
  `total` int(10) unsigned NOT NULL COMMENT '全站可兑换的数量',
  `used` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '当前已兑换的数量',
  `min_amount` decimal(10,2) NOT NULL COMMENT '使用该优惠券的最低订单金额',
  `enabled` tinyint(1) NOT NULL COMMENT '优惠券是否生效',
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '优惠描述',
  `started_at` datetime NOT NULL COMMENT '开始时间',
  `ended_at` datetime NOT NULL COMMENT '结束时间',
  `detail` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '使用说明',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;

INSERT INTO `coupons` (`id`, `title`, `photo_id`, `type`, `value`, `total`, `used`, `min_amount`, `enabled`, `description`, `started_at`, `ended_at`, `detail`, `created_at`, `updated_at`)
VALUES
	(1,'矿泉水优惠券','30','0','90%',100,0,30.00,1,'12家回到家熬枯受淡','2019-12-30 00:00:00','2019-12-31 00:00:00','爱的速递科技阿达拉时间段杀了肯德基案例','2019-12-30 18:09:21','2019-12-30 18:09:21'),
	(2,'小吃优惠券','31','0','80%',200,0,180.00,0,'卡视角打卡机的','2019-12-30 00:00:00','2020-01-01 00:00:00','阿阿斯顿结案率断开了','2019-12-30 18:14:27','2019-12-30 18:14:27'),
	(3,'黄鹤楼香烟优惠券','32','1','满200减10',100,0,190.00,1,'氨基酸打哈卡活动','2019-12-30 00:00:00','2020-01-02 00:00:00','阿萨德大空间的空间卡时间段','2019-12-30 18:35:03','2019-12-30 18:35:03');

/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table failed_jobs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `failed_jobs`;

CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;

INSERT INTO `migrations` (`id`, `migration`, `batch`)
VALUES
	(1,'2014_10_12_000000_create_users_table',1),
	(2,'2014_10_12_100000_create_password_resets_table',1),
	(3,'2019_08_19_000000_create_failed_jobs_table',1),
	(4,'2019_12_24_051536_create_admins_table',1),
	(5,'2019_12_24_091501_create_bags_table',2),
	(6,'2019_12_24_095046_create_photos_table',3),
	(8,'2019_12_27_073752_create_products_table',5),
	(9,'2019_12_27_133651_create_carts_table',6),
	(10,'2019_12_26_172126_create_coupons_table',7),
	(11,'2019_12_30_162318_create_coupon_user_table',8);

/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table password_resets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `password_resets`;

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;

INSERT INTO `photos` (`id`, `image`, `created_at`, `updated_at`)
VALUES
	(1,'https://image.holyzq.com/qVcjpuXgDkxewZVHx9HggUmnAorbG66DX64WfIzT.png','2019-12-24 18:02:33','2019-12-24 18:02:33'),
	(2,'https://image.holyzq.com/3AMZ1uD6MLYK8TQmIxo2FQ8zTC0gJhGIB0L1LrTX.png','2019-12-26 15:25:43','2019-12-26 15:25:43'),
	(3,'https://image.holyzq.com/JHW6UalAasaoLC8Frw8VYvLLnRlQIpuogxmrJwJ8.jpeg','2019-12-26 15:26:37','2019-12-26 15:26:37'),
	(4,'https://image.holyzq.com/d0plX0Joz4cmkJKzByEeASIYsylCBNbNBINT3Izl.jpeg','2019-12-26 15:31:35','2019-12-26 15:31:35'),
	(5,'https://image.holyzq.com/J0SsyWcPoqis4j51dsmG6FwQMCzuF4W8TbN5Dl13.png','2019-12-26 16:15:53','2019-12-26 16:15:53'),
	(6,'https://image.holyzq.com/OqZZEpRMMCkeYBQTyMhGcF44uChZ1ReVXjwIoR7n.png','2019-12-26 16:16:06','2019-12-26 16:16:06'),
	(7,'https://image.holyzq.com/v067F9ZNK99rasr4H0WPGMsApWxWETp73qSMEPre.png','2019-12-26 16:33:48','2019-12-26 16:33:48'),
	(8,'https://image.holyzq.com/oy2xLiwcJ2Cu9AkP5evrtUMt2vlqnfe8SBfAKKZd.png','2019-12-26 16:34:51','2019-12-26 16:34:51'),
	(9,'https://image.holyzq.com/MUdX8QW9qkqVDsO61wQg2jSrsYx7Qde9F7esUPIe.png','2019-12-26 16:35:56','2019-12-26 16:35:56'),
	(10,'https://image.holyzq.com/7qzLufUhZi2cULdkHsTwxA97jzhALS8WVxcMUapf.jpeg','2019-12-26 16:42:22','2019-12-26 16:42:22'),
	(11,'https://image.holyzq.com/B3GRhTH7AstHDKo2ylyqEMLbm21us82bWGR0BAcr.jpeg','2019-12-26 16:43:13','2019-12-26 16:43:13'),
	(12,'https://image.holyzq.com/E06CsZVaTbQK4BXn43I9VznRgXXyLlRxHXTsEjvK.jpeg','2019-12-26 16:43:22','2019-12-26 16:43:22'),
	(13,'https://image.holyzq.com/uUd1yAHmFNV9pYlgU8yRaj55zSK02HUqmU23A2Ug.png','2019-12-26 16:43:42','2019-12-26 16:43:42'),
	(14,'https://image.holyzq.com/mxpYLJ4qp2YiOyhnD0vjlNxdvqSZMKh5cF87vrHI.png','2019-12-26 17:13:47','2019-12-26 17:13:47'),
	(15,'https://image.holyzq.com/uhXYLHm8UWRfiL1ARa5I1yNIagLUsJMe8QZgefs1.png','2019-12-26 17:14:27','2019-12-26 17:14:27'),
	(16,'https://image.holyzq.com/hnYDhSnwU7bV8Y6rifMn3CsvTnEgvod6xU63qqkM.jpeg','2019-12-26 17:15:08','2019-12-26 17:15:08'),
	(17,'https://image.holyzq.com/uhXYLHm8UWRfiL1ARa5I1yNIagLUsJMe8QZgefs1.png','2019-12-26 17:15:58','2019-12-26 17:15:58'),
	(18,'https://image.holyzq.com/ZeQDXvFBnZbNU4KnYUDKiOL6kHkePZSSwqqP1afz.jpeg','2019-12-27 07:55:59','2019-12-27 07:55:59'),
	(19,'https://image.holyzq.com/IWvjzmCOqXY1xEcKWWWCt6xcjyxWsrHqnm9KVL2p.jpeg','2019-12-27 07:56:32','2019-12-27 07:56:32'),
	(20,'https://image.holyzq.com/uuDNAZ55y4NNqTeBTgM7KNgaqkPC8pi1ZAvj31OL.png','2019-12-27 07:59:15','2019-12-27 07:59:15'),
	(21,'https://image.holyzq.com/Xb2KiedCGDc9WtXvPpnepwpHApdnTXRUihvv8cL7.jpeg','2019-12-27 08:19:06','2019-12-27 08:19:06'),
	(22,'https://image.holyzq.com/S6yBYA8621HyHgmHlMT4DkVifEmE04tVQ06sbe9w.jpeg','2019-12-27 09:02:06','2019-12-27 09:02:06'),
	(23,'https://image.holyzq.com/OoxRhkmid6wVpat6WjVSPtCUMMmdUcvsN0VjnP3O.jpeg','2019-12-27 09:08:19','2019-12-27 09:08:19'),
	(24,'https://image.holyzq.com/1CvsgUzV3EzXobvZj8zLwvu3gnz8JmnjWdztOmpv.jpeg','2019-12-30 17:19:54','2019-12-30 17:19:54'),
	(25,'https://image.holyzq.com/3FK0cv9dlFdQa06VSlsNoiEJQC3smAhBXV4l6NU1.jpeg','2019-12-30 17:20:26','2019-12-30 17:20:26'),
	(26,'https://image.holyzq.com/Wxusg5GZ6pmopUue5NrkK38aecSPzsinGRmqeHPj.jpeg','2019-12-30 17:24:37','2019-12-30 17:24:37'),
	(27,'https://image.holyzq.com/9hT4wlNfVTI8pbL6O1TzMiPyNUXrFvoYr7dubwUc.jpeg','2019-12-30 17:46:43','2019-12-30 17:46:43'),
	(28,'https://image.holyzq.com/3HjN1LCFp4vp0n9CSTt7q4sLQxtzry2R2KsD80xA.jpeg','2019-12-30 17:50:51','2019-12-30 17:50:51'),
	(29,'https://image.holyzq.com/Pi0JdeSwSVuQBjFl9qnlqnNiwrHD4UZK3pa0lWnT.jpeg','2019-12-30 17:52:57','2019-12-30 17:52:57'),
	(30,'https://image.holyzq.com/zfcpoPIICM268DTsiKqFSjAxawzxFdu7KtupMHbC.jpeg','2019-12-30 18:08:59','2019-12-30 18:08:59'),
	(31,'https://image.holyzq.com/o5ACw9C07EUn4gsvmm8jOMXkKPd9vHMyaspd7lZh.jpeg','2019-12-30 18:10:12','2019-12-30 18:10:12'),
	(32,'https://image.holyzq.com/iMYuIz4ilSAX86FplKQTPpuFm97qeEb33LcxR5ox.jpeg','2019-12-30 18:33:50','2019-12-30 18:33:50');

/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '条形码',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '名称',
  `photo_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '缩略图',
  `price` decimal(10,2) NOT NULL COMMENT '单价',
  `stock` int(11) NOT NULL DEFAULT '-1' COMMENT '库存',
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '描述',
  `onsale` tinyint(1) DEFAULT '1' COMMENT '上架',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`id`, `code`, `name`, `photo_id`, `price`, `stock`, `body`, `onsale`, `created_at`, `updated_at`)
VALUES
	(1,'6666666','木糖醇口香糖','10',9.90,100,'木糖醇原产于芬兰，是从白桦树、橡树、玉米芯、甘蔗渣等植物原料中提取出来的一种天然甜味剂#在自然界中，木糖醇的分布范围很广，广泛存在于各种水果、蔬菜、谷类之中，但含量很低。',0,'2019-12-27 07:49:58','2019-12-27 13:02:26'),
	(2,'6951573151719','凤珠腾茶','20',230.00,100,'金祈牌凤珠藤茶(罐装)产品介绍、批发价格及其供应商 来凤凤雅藤茶生物有限公司的联系方式,更多藤茶,富硒藤茶,保健茶相关信息尽在食品商务网',1,'2019-12-27 08:00:05','2019-12-27 08:00:05'),
	(3,'6901028180573','黄鹤楼香烟(蓝楼)','21',19.00,100,'黄鹤楼品牌香烟得名于江南三大名楼之一的湖北省武汉市长江南岸蛇山峰岭之上的黄鹤楼。黄鹤楼品牌始创于20世纪30年代，是湖北省名优烟之一。1995年，黄鹤楼品牌全新上市，2004年推出黄鹤楼1916产品。',1,'2019-12-27 08:20:49','2019-12-27 13:31:07'),
	(4,'6957463653561','鑫之诺打火机','22',2.00,200,'厂价直销塑料打火机鑫之诺一次性打火机创意个性涂鸦防风打火机 长沙市雨花区鑫甫日用品商行',1,'2019-12-27 09:02:18','2019-12-27 09:13:15');

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `openid`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`)
VALUES
	(1,'hhhhhh','','','',NULL,NULL,NULL),
	(5,'oakvM4nWqkN3309IKbF5Pq5dcp-o','','','',NULL,'2019-12-30 11:41:32','2019-12-30 11:41:32');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
