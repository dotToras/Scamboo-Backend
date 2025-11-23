drop database if exists dbScamboo;
create database dbScamboo;
use dbScamboo;


CREATE TABLE Credencial (

	cre_codigo int primary key auto_increment,
    cre_email varchar(90),
    cre_Senha varchar(45),
    cre_dataCadastro date,
    cre_tipo boolean

);

CREATE TABLE Usuario (

	usu_codigo int primary key auto_increment,
    usu_fotoPerfil varchar(90),
    usu_Nome varchar(45),
    usu_dataNascimento date,
    usu_saldoMoeda int,
    usu_status boolean,
    usu_linkPortifolio varchar(90),
    usu_linkLinkedin varchar(90),
    cre_codigo int,
    FOREIGN KEY(cre_codigo) REFERENCES Credencial(cre_codigo)

);

CREATE TABLE Categoria (

	cat_codigo int primary key auto_increment,
    cat_nome varchar(45)

);

CREATE TABLE Servico (

	ser_codigo int primary key auto_increment,
    ser_nome varchar(45),
    ser_descricao varchar(255),
    ser_dataPedido date,
    ser_dataExpiracao date,
    ser_concluido boolean,
    usu_codigo int,
    cat_codigo int,
    FOREIGN KEY(usu_codigo) REFERENCES Usuario(usu_codigo),
    FOREIGN KEY(cat_codigo) REFERENCES Categoria(cat_codigo)

);

CREATE TABLE Habilidade (

	hab_codigo int primary key auto_increment,
    hab_nome varchar(45)

);

CREATE TABLE UsuarioHabilidade (

	hab_codigo int,
    usu_codigo int,
	FOREIGN KEY(hab_codigo) REFERENCES Habilidade(hab_codigo),
    FOREIGN KEY(usu_codigo) REFERENCES Usuario(usu_codigo)
    
);

CREATE TABLE AreaInteresse ( 

	ari_codigo int primary key auto_increment,
    ari_nome varchar(45)

);

CREATE TABLE UsuarioArea (

	ari_codigo int,
    usu_codigo int,
	FOREIGN KEY(ari_codigo) REFERENCES AreaInteresse(ari_codigo),
    FOREIGN KEY(usu_codigo) REFERENCES Usuario(usu_codigo)
    
);

CREATE TABLE Chat (

	cha_codigo int primary key auto_increment,
    cha_nome varchar(45),
    char_descricao varchar(90)

);

CREATE TABLE UsuarioChat (

	cha_codigo int,
    usu_codigo int,
    FOREIGN KEY(cha_codigo) REFERENCES Chat(cha_codigo),
	FOREIGN KEY(usu_codigo) REFERENCES Usuario(usu_codigo)

);

CREATE TABLE Mensagem (

	men_codigo int primary key auto_increment,
    men_dataEnvio date,
    men_textoMensagem varchar(255),
    cha_codigo int,
    usu_codigo int,
    FOREIGN KEY(cha_codigo) REFERENCES Chat(cha_codigo),
	FOREIGN KEY(usu_codigo) REFERENCES Usuario(usu_codigo)

);

CREATE TABLE NotificacaoMensagem (

	nom_codigo int primary key auto_increment,
	nom_titulo varchar(45),
    nom_mensagem varchar(255),
    nom_foiLida boolean,
    nom_data date,
    usu_codigo int,
    men_codigo int,
    FOREIGN KEY(usu_codigo) REFERENCES Usuario(usu_codigo),
    FOREIGN KEY(men_codigo) REFERENCES Mensagem(men_codigo)
    
);

CREATE TABLE Proposta ( 

	pro_codigo int primary key auto_increment,
    pro_descricao varchar(255),
    pro_aceita boolean,
    usu_codigo int,
    ser_codigo int,
    FOREIGN KEY(usu_codigo) REFERENCES Usuario(usu_codigo),
    FOREIGN KEY(ser_codigo) REFERENCES Servico(ser_codigo)

);

CREATE TABLE NotificacaoProposta (

	nop_codigo int primary key auto_increment,
	nop_titulo varchar(90),
    nop_mensagem varchar(255),
    nop_foiLida boolean,
    nop_data date,
    usu_codigo int,
    ser_codigo int,
    FOREIGN KEY(usu_codigo) REFERENCES Usuario(usu_codigo),
    FOREIGN KEY(ser_codigo) REFERENCES Servico(ser_codigo)
    

);

CREATE TABLE TransacoesMoeda (

	trm_codigo int primary key auto_increment,
    trm_valor int,
    trm_date date,
    trm_tipo boolean,
    usu_codigo int,
    ser_codigo int,
    FOREIGN KEY(usu_codigo) REFERENCES Usuario(usu_codigo),
    FOREIGN KEY(ser_codigo) REFERENCES Servico(ser_codigo)

);

CREATE TABLE Avaliacao (

	ava_codigo int primary key auto_increment,
    ava_nota double,
    ava_mensagem varchar(255),
    usu_codigo int,
    ser_codigo int,
    FOREIGN KEY(usu_codigo) REFERENCES Usuario(usu_codigo),
    FOREIGN KEY(ser_codigo) REFERENCES Servico(ser_codigo)

);

CREATE TABLE PalavraProibida (

	pap_codigo int primary key auto_increment,
    pap_termo varchar(45)

);

CREATE TABLE Moderador (

	mod_codigo int primary key auto_increment,
    mod_nome varchar(45),
    mod_fotoPerfil varchar(255),
    cre_codigo int,
    FOREIGN KEY(cre_codigo) REFERENCES Credencial(cre_codigo)

);

CREATE TABLE Denuncia (

	den_codigo int primary key auto_increment,
    den_justificativa varchar(255),
    den_dataDenuncia date,
    den_status boolean,
    den_veredito varchar(45),
    mod_codigo int,
    usu_codigo int,
    ava_codigo int,
    FOREIGN KEY(mod_codigo) REFERENCES Moderador(mod_codigo),
    FOREIGN KEY(usu_codigo) REFERENCES Usuario(usu_codigo),
    FOREIGN KEY(ava_codigo) REFERENCES Avaliacao(ava_codigo)

);

-- Procedures básicas, para inserir o que já é predefinido(categoria, habilidades, areas de interesse, palavras banidas)
DELIMITER $$
CREATE PROCEDURE spInserirAreaInteresse(
    pari_nome varchar(45)
)
 
BEGIN
 
	INSERT INTO AreaInteresse( ari_nome)
	VALUES(pari_nome);
 
END $$
 
DELIMITER ;
 
-- a colocar mais
CALL spInserirAreaInteresse("TI e Programação");
CALL spInserirAreaInteresse("Design UI/UX");
CALL spInserirAreaInteresse("Design Gráfico");
CALL spInserirAreaInteresse("Marketing Digital");
CALL spInserirAreaInteresse("Edição de Vídeo");
 
DELIMITER $$
CREATE PROCEDURE spInserirHabilidades(
    phab_nome varchar(45)
)
 
BEGIN
 
	INSERT INTO Habilidade(hab_nome)
	VALUES(phab_nome);
 
END $$
 
DELIMITER ;
 
-- a colocar mais
CALL spInserirHabilidades("Lógica de Programação");
CALL spInserirHabilidades("BackEnd");
CALL spInserirHabilidades("FrontEnd");
CALL spInserirHabilidades("Fullstack");
CALL spInserirHabilidades("UI/UX Design");
CALL spInserirHabilidades("Marketing Digital");
 
DELIMITER $$
CREATE PROCEDURE spInserirCategoria(
    pcat_nome varchar(45)
)
 
BEGIN
 
	INSERT INTO Categoria(cat_nome)
	VALUES(pcat_nome);
 
END $$
 
DELIMITER ;
 
-- a fazer chamada
CALL spInserirCategoria("Desenvolvimento de Sistemas");
CALL spInserirCategoria("Desenvolvimento Mobile");
CALL spInserirCategoria("Desenvolvimento Web");
CALL spInserirCategoria("Design Gráfico");
CALL spInserirCategoria("Marketing Digital");
CALL spInserirCategoria("Suporte Técnico");
CALL spInserirCategoria("Consultoria");
CALL spInserirCategoria("Análise de Dados");
CALL spInserirCategoria("UX/UI");
/* VERIFICAR SE ARMAZENAREMOS NO BANCO OU PUXAREMOS DE UMA API EXTERNA -----

DELIMITER $$
CREATE PROCEDURE spInserirPalavrasProibidas(
    ppap_termo varchar(45)
)
 
BEGIN
 
	INSERT INTO PalavraProibida(pap_termo)
	VALUES(ppap_termo);
 
END $$
 
DELIMITER ;

*/


DELIMITER $$
CREATE PROCEDURE spInserirUsuario(
    pCre_Email VARCHAR(90),
    pCre_Senha VARCHAR(45),
    pCre_Tipo BOOLEAN,
    pUsu_FotoPerfil VARCHAR(90),
    pUsu_Nome VARCHAR(45),
    pUsu_DataNascimento DATE,
    pUsu_Status BOOLEAN,
    pUsu_LinkPortifolio VARCHAR(90),
    pUsu_LinkLinkedin VARCHAR(90)
)
 
BEGIN
    
    -- primeiro insere-se as informações de credencial do usuario
	INSERT INTO Credencial(cre_email, cre_Senha, cre_dataCadastro, cre_tipo)
	VALUES(pCre_Email, pCre_Senha, CURDATE(), pCre_Tipo);

    -- depois insere as informações referentes ao usuário
	INSERT INTO Usuario(usu_fotoPerfil, usu_Nome, usu_dataNascimento, usu_saldoMoeda, usu_status, usu_linkPortifolio, usu_linkLinkedin, cre_codigo)
	VALUES(pUsu_fotoPerfil, pUsu_Nome, pUsu_dataNascimento, 30, pUsu_status, pUsu_linkPortifolio, pUsu_linkLinkedin, last_insert_id());
 
END $$
DELIMITER ;
 
CALL spInserirUsuario('carla@gmail.com','C@rl42025!',1,'foto_carla.png','Carla Monteiro','1999-02-18',1,'https://portfolio-carla.com','https://linkedin.com/in/carla');
CALL spInserirUsuario('felipe@gmail.com','F3l1p3#Dev',0,'foto_felipe.png','Felipe Rocha','2001-08-05',1,'https://portfolio-felipe.com','https://linkedin.com/in/felipe');
CALL spInserirUsuario('larissa@gmail.com','L4r1ss@2025',1,'foto_larissa.png','Larissa Costa','1997-12-12',1,'https://portfolio-larissa.com','https://linkedin.com/in/larissa');

-- inserts de serviços
INSERT INTO Servico(ser_nome, ser_descricao, ser_dataPedido, ser_dataExpiracao, ser_concluido, usu_codigo, cat_codigo) 
VALUES('Desenvolvimento de site institucional','Criação de site completo para empresa','2025-10-31','2025-11-07',0,1,3);

INSERT INTO Servico(ser_nome, ser_descricao, ser_dataPedido, ser_dataExpiracao, ser_concluido, usu_codigo, cat_codigo) 
VALUES('App mobile para delivery','Aplicativo Android e iOS para pedidos online','2025-10-31','2025-11-10',0,2,2);

INSERT INTO Servico(ser_nome, ser_descricao, ser_dataPedido, ser_dataExpiracao, ser_concluido, usu_codigo, cat_codigo) 
VALUES('Sistema de gerenciamento','Sistema web para gerenciar estoque e vendas','2025-10-31','2025-11-12',0,3,1);

-- Trigger para atualizar o saldo de moeda 
DELIMITER $$
CREATE TRIGGER Tgr_Atualizar_SaldoMoeda
AFTER INSERT ON TransacoesMoeda
FOR EACH ROW
BEGIN
    -- Subtrai ou adiciona o valor da transação do/ao saldo do usuário correspondente
    IF NEW.trm_tipo = 1 THEN
        UPDATE Usuario
        SET usu_saldoMoeda = usu_saldoMoeda - NEW.trm_valor
        WHERE usu_codigo = NEW.usu_codigo;
    ELSE 
        UPDATE Usuario
        SET usu_saldoMoeda = usu_saldoMoeda + NEW.trm_valor
        WHERE usu_codigo = NEW.usu_codigo;
    END IF;
END $$

DELIMITER ;

-- Trigger para notificar o usuario assim que seu serviço receber uma proposta
DELIMITER $$
CREATE TRIGGER NotificarProposta AFTER INSERT ON Proposta
FOR EACH ROW
BEGIN

INSERT INTO NotificacaoProposta (nop_titulo, nop_mensagem, nop_foiLida, nop_data, usu_codigo, ser_codigo)
VALUES(
		CONCAT("Nova atualização:", (SELECT ser_nome FROM Servico WHERE ser_codigo = NEW.ser_codigo)), 
        CONCAT("O usuário: ", (SELECT usu_nome FROM Usuario WHERE usu_codigo = NEW.usu_codigo), " enviou uma Proposta para você"), 
        0, -- não aceito
        curdate(), 
		(SELECT usu_codigo FROM Servico WHERE ser_codigo = NEW.ser_codigo), -- código do dono do serviço
        new.ser_codigo
        );
        
END $$
DELIMITER ;

-- inserts de proposta
INSERT INTO Proposta(pro_descricao, pro_aceita, usu_codigo, ser_codigo) 
VALUES('Posso desenvolver o site institucional para você',0,2,1);

INSERT INTO Proposta(pro_descricao, pro_aceita, usu_codigo, ser_codigo) 
VALUES('Tenho experiência em apps mobile, posso criar o seu',0,3,2);

INSERT INTO Proposta(pro_descricao, pro_aceita, usu_codigo, ser_codigo) 
VALUES('Posso implementar o sistema de gerenciamento solicitado',0,1,3);

select * from NotificacaoProposta;

select * from usuario
inner join credencial using(cre_codigo) 
