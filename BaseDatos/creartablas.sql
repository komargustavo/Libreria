-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema libreriacyl
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema libreriacyl
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `libreriacyl` DEFAULT CHARACTER SET utf8 ;
USE `libreriacyl` ;

-- -----------------------------------------------------
-- Table `libreriacyl`.`precio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreriacyl`.`precio` (
  `idprecio` INT NOT NULL AUTO_INCREMENT,
  `importePrecio` DECIMAL(10,2) UNSIGNED ZEROFILL NOT NULL,
  PRIMARY KEY (`idprecio`))
ENGINE = InnoDB
AUTO_INCREMENT = 46981
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `libreriacyl`.`articulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreriacyl`.`articulos` (
  `idarticulos` INT NOT NULL AUTO_INCREMENT,
  `descripcionArticulos` VARCHAR(100) NOT NULL,
  `importePrecio` INT(10) UNSIGNED ZEROFILL NOT NULL,
  `precio_idprecio` INT NOT NULL,
  PRIMARY KEY (`idarticulos`),
  INDEX `fk_articulos_precio1_idx` (`precio_idprecio` ASC) VISIBLE,
  CONSTRAINT `fk_articulos_precio1`
    FOREIGN KEY (`precio_idprecio`)
    REFERENCES `libreriacyl`.`precio` (`idprecio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 46981
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `libreriacyl`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreriacyl`.`cliente` (
  `idcliente` INT NOT NULL AUTO_INCREMENT,
  `nombreCliente` VARCHAR(45) NULL DEFAULT NULL,
  `telefonoCliente` INT(10) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `mailCliente` VARCHAR(45) NULL DEFAULT NULL,
  `domicilioCliente` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idcliente`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `libreriacyl`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreriacyl`.`pedido` (
  `idpedido` INT NOT NULL AUTO_INCREMENT,
  `cliente_idcliente` INT NOT NULL,
  PRIMARY KEY (`idpedido`, `cliente_idcliente`),
  INDEX `fk_pedido_cliente1_idx` (`cliente_idcliente` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_cliente1`
    FOREIGN KEY (`cliente_idcliente`)
    REFERENCES `libreriacyl`.`cliente` (`idcliente`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `libreriacyl`.`articulos_has_pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `libreriacyl`.`articulos_has_pedido` (
  `articulos_idarticulos` INT NOT NULL,
  `pedido_idpedido` INT NOT NULL,
  `pedido_cliente_idcliente` INT NOT NULL,
  PRIMARY KEY (`articulos_idarticulos`, `pedido_idpedido`, `pedido_cliente_idcliente`),
  INDEX `fk_articulos_has_pedido_pedido1_idx` (`pedido_idpedido` ASC, `pedido_cliente_idcliente` ASC) VISIBLE,
  INDEX `fk_articulos_has_pedido_articulos1_idx` (`articulos_idarticulos` ASC) VISIBLE,
  CONSTRAINT `fk_articulos_has_pedido_articulos1`
    FOREIGN KEY (`articulos_idarticulos`)
    REFERENCES `libreriacyl`.`articulos` (`idarticulos`),
  CONSTRAINT `fk_articulos_has_pedido_pedido1`
    FOREIGN KEY (`pedido_idpedido` , `pedido_cliente_idcliente`)
    REFERENCES `libreriacyl`.`pedido` (`idpedido` , `cliente_idcliente`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
