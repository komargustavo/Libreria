-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: libreriacyl
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articulos`
--

DROP TABLE IF EXISTS `articulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulos` (
  `idarticulos` int NOT NULL AUTO_INCREMENT,
  `descripcionArticulos` varchar(45) NOT NULL,
  `precio_idprecio` int NOT NULL,
  PRIMARY KEY (`idarticulos`),
  KEY `fk_articulos_precio_idx` (`precio_idprecio`),
  CONSTRAINT `fk_articulos_precio` FOREIGN KEY (`precio_idprecio`) REFERENCES `precio` (`idprecio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulos`
--

LOCK TABLES `articulos` WRITE;
/*!40000 ALTER TABLE `articulos` DISABLE KEYS */;
/*!40000 ALTER TABLE `articulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articulos_has_pedido`
--

DROP TABLE IF EXISTS `articulos_has_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulos_has_pedido` (
  `articulos_idarticulos` int NOT NULL,
  `pedido_idpedido` int NOT NULL,
  `pedido_cliente_idcliente` int NOT NULL,
  PRIMARY KEY (`articulos_idarticulos`,`pedido_idpedido`,`pedido_cliente_idcliente`),
  KEY `fk_articulos_has_pedido_pedido1_idx` (`pedido_idpedido`,`pedido_cliente_idcliente`),
  KEY `fk_articulos_has_pedido_articulos1_idx` (`articulos_idarticulos`),
  CONSTRAINT `fk_articulos_has_pedido_articulos1` FOREIGN KEY (`articulos_idarticulos`) REFERENCES `articulos` (`idarticulos`),
  CONSTRAINT `fk_articulos_has_pedido_pedido1` FOREIGN KEY (`pedido_idpedido`, `pedido_cliente_idcliente`) REFERENCES `pedido` (`idpedido`, `cliente_idcliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulos_has_pedido`
--

LOCK TABLES `articulos_has_pedido` WRITE;
/*!40000 ALTER TABLE `articulos_has_pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `articulos_has_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `idcliente` int NOT NULL AUTO_INCREMENT,
  `nombreCliente` varchar(45) DEFAULT NULL,
  `telefonoCliente` varchar(11) DEFAULT NULL,
  `mailCliente` varchar(45) DEFAULT NULL,
  `domicilioCliente` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcliente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Gustavo ','3794863219','komargustavo@hotmail.com','Belgrano 1778'),(2,'Gustavo','3794863219','komargustavo@gmail.com','Belgrano 1778'),(3,'eeeeeeeeeeeeeeeeeeeee','3794863219','sssssssssssssssssss@ddddddddddd.com','eeeeeeeeeeeeeeeeeeeeeeeeee');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `idpedido` int NOT NULL AUTO_INCREMENT,
  `cliente_idcliente` int NOT NULL,
  PRIMARY KEY (`idpedido`,`cliente_idcliente`),
  KEY `fk_pedido_cliente1_idx` (`cliente_idcliente`),
  CONSTRAINT `fk_pedido_cliente1` FOREIGN KEY (`cliente_idcliente`) REFERENCES `cliente` (`idcliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `precio`
--

DROP TABLE IF EXISTS `precio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `precio` (
  `idprecio` int NOT NULL AUTO_INCREMENT,
  `importePrecio` decimal(10,2) unsigned zerofill NOT NULL,
  PRIMARY KEY (`idprecio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `precio`
--

LOCK TABLES `precio` WRITE;
/*!40000 ALTER TABLE `precio` DISABLE KEYS */;
/*!40000 ALTER TABLE `precio` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-12 10:15:00
