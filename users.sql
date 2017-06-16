CREATE DATABASE IF NOT EXISTS baseajax;

USE baseajax;

CREATE TABLE users (
  id INT(6) NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(60) NOT NULL,
  lastname VARCHAR(60) NOT NULL,
  date_naiss DATETIME NOT NULL,
  poste ENUM('cto','ceo','sio') NOT NULL,
  date_create DATETIME NOT NULL, 
  PRIMARY KEY (id)
) ENGINE=InnoDB ;
