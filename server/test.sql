-- Active: 1670902715759@@127.0.0.1@3306@todolist_eclipse

CREATE TABLE todos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  todo VARCHAR(240) NOT NULL,
  userId INT NOT NULL,
  status VARCHAR(10) DEFAULT 'ADDED',
  Foreign Key (userId) REFERENCES users(id)
  on delete cascade
  on update cascade
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userName VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(30) NOT NULL
);

drop table users;
drop table todos;

desc todos;
desc users;

select * from users;
