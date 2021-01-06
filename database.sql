drop database crud;

create database crud;

use crud;

create table users (
	id int auto_increment primary key,
    name varchar(255) not null,
    location varchar(255) not null,
    phone varchar(11) not null,
    gender varchar(11) not null,
    position varchar(255) not null
);