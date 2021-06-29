create database aulaFront;

use aulaFront;

create table contatos(
id int not  null auto_increment primary key,
nome varchar(30) not null,
email varchar(30),
cidade varchar(30),
estado varchar(2)
);

insert into contatos (nome, email, cidade, estado) 
	values ('Fernando', 'fernando@gmail.com', 'Alimininio', 'SP');
    
insert into contatos (nome, email, cidade, estado) 
	values ('Leonid', 'leonid@gmail.com', 'Jandira', 'SP');

insert into contatos (nome, email, cidade, estado) 
	values ('Ana', 'ana@yahoo.com.br', 'Barueri', 'SP');
    
select * from contatos;
    
    