CREATE DATABASE IF NOT EXISTS point_of_sale;
USE point_of_sale;

CREATE TABLE user (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  lastName varchar(50) NOT NULL,
  motherLastName varchar(50) NOT NULL,
  gender ENUM('M','W') NOT NULL,
  age int NOT NULL,
  username varchar(50) NOT NULL,
  password varchar(150) NOT NULL,
  type ENUM('admin','employee') NOT NULL,
  statusUser ENUM('locked','unlocked') NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (username)
) ENGINE=InnoDB;

CREATE TABLE provider (
  id int NOT NULL AUTO_INCREMENT,
  company varchar(30) NOT NULL,
  name varchar(40) NOT NULL,
  lastName varchar(40) NOT NULL,
  motherLastName varchar(40) NOT NULL,
  PRIMARY KEY (Id)
) ENGINE=InnoDB;

CREATE TABLE article (
  id bigint NOT NULL,
  id_provider int NOT NULL,
  article varchar(100) NOT NULL,
  purchasePrice float NOT NULL,
  salesPrice float NOT NULL,
  amount int NOT NULL,
  dateofExpiry date DEFAULT NULL,
  statusArticle ENUM('locked','unlocked') NOT NULL,
  PRIMARY KEY (id),
  KEY id_provider (id_provider),
  CONSTRAINT provider_ibfk_1 FOREIGN KEY (id_provider) REFERENCES provider (id)
) ENGINE=InnoDB;

CREATE TABLE shopping (
  folio bigint NOT NULL AUTO_INCREMENT,
  id_article bigint NOT NULL,
  date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  amountShopping int NOT NULL,
  PRIMARY KEY (folio),
  KEY id_article (id_article),
  CONSTRAINT shopping_ibfk_2 FOREIGN KEY (id_article) REFERENCES article (id)
) ENGINE=InnoDB;

CREATE TABLE debtor (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  lastName varchar(50) NOT NULL,
  motherLastName varchar(50) NOT NULL,
  address varchar(80) NOT NULL,
  gender ENUM('M','W') NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE debts (
  id int NOT NULL AUTO_INCREMENT,
  id_debtor int NOT NULL,
  id_article bigint NOT NULL,
  id_user int NOT NULL,
  amount int NOT NULL,
  price float NOT NULL,
  total float NOT NULL,
  date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY id_debtor (id_debtor),
  KEY id_article (id_article),
  CONSTRAINT debts_ibfk_3 FOREIGN KEY (id_debtor) REFERENCES debtor (id),
  CONSTRAINT debts_ibfk_4 FOREIGN KEY (id_article) REFERENCES article (id)
) ENGINE=InnoDB;

CREATE TABLE ticketf (
  folio bigint NOT NULL AUTO_INCREMENT,
  date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_user int NOT NULL,
  total float NOT NULL,
  change_total float NOT NULL,
  PRIMARY KEY (folio),
  KEY id_user (id_user),
  CONSTRAINT ticketf_ibfk_5 FOREIGN KEY (id_user) REFERENCES user (id)
) ENGINE=InnoDB;

CREATE TABLE salesrecord (
  folio bigint NOT NULL,
  id_article bigint NOT NULL,
  salesPrice float NOT NULL,
  amount int NOT NULL,
  total float NOT NULL,
  KEY folio (folio),
  KEY id_article (id_article),
  CONSTRAINT salesrecord_ibfk_6 FOREIGN KEY (folio) REFERENCES ticketf (folio),
  CONSTRAINT salesrecord_ibfk_7 FOREIGN KEY (id_article) REFERENCES article (id)
) ENGINE=InnoDB;