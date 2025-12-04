drop database if exists dbScamboo;
create database dbScamboo;
use dbScamboo;


CREATE TABLE Credencial (

	cre_codigo int primary key auto_increment,
    cre_email varchar(90),
    cre_Senha varchar(45),
    cre_dataCadastro date

);

CREATE TABLE Usuario (

	usu_codigo int primary key auto_increment,
    usu_fotoPerfil varchar(255),
    usu_nome varchar(45),
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

DELIMITER $$
CREATE PROCEDURE spInserirUsuario(
    pCre_Email VARCHAR(90),
    pCre_Senha VARCHAR(45),
    pUsu_FotoPerfil VARCHAR(255),
    pUsu_nome VARCHAR(45),
    pUsu_DataNascimento DATE,
    pUsu_Status BOOLEAN,
    pUsu_LinkPortifolio VARCHAR(90),
    pUsu_LinkLinkedin VARCHAR(90)
)
BEGIN
    -- primeiro insere-se as informações de credencial do usuario
	INSERT INTO Credencial(cre_email, cre_Senha, cre_dataCadastro)
	VALUES(pCre_Email, pCre_Senha, CURDATE());

    -- depois insere as informações referentes ao usuário
	INSERT INTO Usuario(usu_fotoPerfil, usu_Nome, usu_dataNascimento, usu_saldoMoeda, usu_status, usu_linkPortifolio, usu_linkLinkedin, cre_codigo)
	VALUES(pUsu_fotoPerfil, pUsu_nome, pUsu_dataNascimento, 30, pUsu_status, pUsu_linkPortifolio, pUsu_linkLinkedin, last_insert_id());
 
END $$
DELIMITER ;
 
CALL spInserirUsuario('carla@gmail.com','C@rl42025!','foto_carla.png','Carla Monteiro','1999-02-18',1,'https://portfolio-carla.com','https://linkedin.com/in/carla');
CALL spInserirUsuario('felipe@gmail.com','F3l1p3#Dev','foto_felipe.png','Felipe Rocha','2001-08-05',1,'https://portfolio-felipe.com','https://linkedin.com/in/felipe');
CALL spInserirUsuario('larissa@gmail.com','L4r1ss@2025','foto_larissa.png','Larissa Costa','1997-12-12',1,'https://portfolio-larissa.com','https://linkedin.com/in/larissa');
CALL spInserirUsuario('rafael@gmail.com','R4f4el@2025','foto_rafael.png','Rafael Souza','1998-11-11',1,'https://portfolio-rafael.com','https://linkedin.com/in/rafael');

-- inserts de serviços

INSERT INTO Servico(ser_nome, ser_descricao, ser_dataPedido, ser_dataExpiracao, ser_concluido, usu_codigo, cat_codigo) 
VALUES('Desenvolvimento de site institucional','Criação de site completo para empresa','2025-10-31','2025-12-03',0,1,3);

INSERT INTO Servico(ser_nome, ser_descricao, ser_dataPedido, ser_dataExpiracao, ser_concluido, usu_codigo, cat_codigo) 
VALUES('App mobile para delivery','Aplicativo Android e iOS para pedidos online','2025-10-31','2025-12-10',0,2,2);

INSERT INTO Servico(ser_nome, ser_descricao, ser_dataPedido, ser_dataExpiracao, ser_concluido, usu_codigo, cat_codigo) 
VALUES('Sistema de gerenciamento','Sistema web para gerenciar estoque e vendas','2025-10-31','2025-12-10',0,3,1);


-- RF003 - O sistema deve permitir que o usuário faça login utilizando e-mail e senha válidos 
DELIMITER $$
CREATE PROCEDURE spVerificarLogin(
IN pCre_Email VARCHAR(90),
IN pCre_Senha VARCHAR(45)
)
BEGIN
SELECT 
        Credencial.cre_codigo,
        Usuario.usu_codigo, 
        Usuario.usu_status
    FROM 
        Credencial INNER JOIN Usuario USING(cre_codigo)  
    WHERE 
        cre_email = pCre_Email AND cre_Senha = pCre_Senha; 
END $$
DELIMITER ;

/* RF004 – O sistema deve permitir que o usuário mantenha seu perfil de usuário */
DELIMITER $$
CREATE PROCEDURE spAtualizarPerfil(
    IN pusu_codigo INT,
    IN pusu_fotoPerfil VARCHAR(255),
    IN pusu_nome VARCHAR(45),
    IN pusu_dataNascimento DATE,
    IN pusu_linkPortifolio VARCHAR(255),
    IN pusu_linkLinkedin VARCHAR(255)
)
BEGIN
    UPDATE Usuario
    SET 
        usu_fotoPerfil = COALESCE(pusu_fotoPerfil, usu_fotoPerfil),
        usu_nome = COALESCE(pusu_nome, usu_nome),
        usu_dataNascimento = COALESCE(pusu_dataNascimento, usu_dataNascimento),
        usu_linkPortifolio = COALESCE(pusu_linkPortifolio, usu_linkPortifolio),
        usu_linkLinkedin = COALESCE(pusu_linkLinkedin, usu_linkLinkedin)
    WHERE usu_codigo = pusu_codigo;

END $$


DELIMITER ;

-- RF006 – O sistema deve permitir que o usuário busque por pedidos de serviços
DELIMITER $$
CREATE PROCEDURE spbuscarServicos(
IN pser_nome varchar(45)
)
BEGIN
	
    SELECT ser_nome, ser_descricao, ser_dataPedido, ser_concluido, cat_nome
    FROM Servico
	INNER JOIN Categoria USING(cat_codigo)
    WHERE ser_nome LIKE CONCAT('%', pser_nome, '%');

END $$
DELIMITER ;

-- RF007 – O sistema deve permitir que o usuário filtre pedidos por categoria
DELIMITER $$
CREATE PROCEDURE spbuscarServicosCategoria(
IN pcat_nome varchar(45)
)
BEGIN
	
    SELECT ser_nome, ser_descricao, ser_dataPedido, ser_concluido, cat_nome
    FROM Servico
	INNER JOIN Categoria USING(cat_codigo)
    WHERE cat_nome LIKE CONCAT('%', pcat_nome, '%');

END $$
DELIMITER ;

-- RF013 – O sistema deve permitir que o usuário visualize seu histórico de serviços
DELIMITER $$
CREATE PROCEDURE spvisualizarHistorico(
IN pusu_codigo int
)
BEGIN
	
    SELECT ser_nome, ser_descricao, ser_dataPedido, ser_concluido, cat_nome
    FROM Servico
	INNER JOIN Categoria USING(cat_codigo)
    WHERE usu_codigo = pusu_codigo;

END $$
DELIMITER ;


-- RF023 - O sistema deve permitir que o usuário receba moedas ao concluir um pedido de serviço como prestador 
-- RN015 - Criar um pedido de serviço consome exatamente 15 moedas 
DELIMITER $$
CREATE TRIGGER Tgr_Atualizar_SaldoMoeda
AFTER INSERT ON TransacoesMoeda
FOR EACH ROW
BEGIN
    -- Subtrai ou adiciona o valor da transação do/ao saldo do usuário correspondente
    IF NEW.trm_tipo = 1 THEN
        UPDATE Usuario
        SET usu_saldoMoeda = usu_saldoMoeda - 15
        WHERE usu_codigo = NEW.usu_codigo;
    ELSE 
        UPDATE Usuario
        SET usu_saldoMoeda = usu_saldoMoeda + 15
        WHERE usu_codigo = NEW.usu_codigo;
    END IF;
END $$
DELIMITER ;

-- RF025 - O sistema deve notificar o usuário sobre novas propostas 
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


DELIMITER $$
CREATE TRIGGER NotificarMensagem AFTER INSERT ON Mensagem
FOR EACH ROW
BEGIN

    INSERT INTO Notificacao (
        not_titulo, 
        not_mensagem, 
        not_foiLida, 
        not_data, 
        usu_codigo,      
        cha_codigo_ref  
    )
    VALUES (

        CONCAT('Nova Mensagem no Chat: ', NEW.cha_codigo), 
        CONCAT((SELECT usu_nome FROM Usuario WHERE usu_codigo = NEW.usu_codigo), ' enviou uma mensagem: ', NEW.men_textoMensagem), 
        0, -- Não Lida
        NOW(), 
        (
            SELECT uc.usu_codigo -- codigoo destinario
            FROM UsuarioChat uc
            WHERE uc.cha_codigo = NEW.cha_codigo
			AND uc.usu_codigo != NEW.usu_codigo -- é o unico usuario q n é o criador 
            LIMIT 1 -- Limita a 1, pois é um chat de 2 pessoas
        ),
        NEW.cha_codigo 
    );
    
END $$
DELIMITER ;

-- 
DELIMITER $$
CREATE TRIGGER tgr_verificarPalavraProibida
BEFORE INSERT ON Servico
FOR EACH ROW
BEGIN
    IF (
		-- conta se houve ocorrencias aonde houvessem nome/descrição de serviços
        SELECT COUNT(*)
        FROM PalavraProibida
        WHERE 
            LOWER(NEW.ser_nome) LIKE CONCAT('%', LOWER(pap_termo), '%') OR
            LOWER(NEW.ser_descricao) LIKE CONCAT('%', LOWER(pap_termo), '%')
    ) > 0 THEN	-- se houver, cancela a inserção e manda o erro
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O nome ou a descrição do serviço contém uma palavra proibida';
    END IF;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE spInserirPalavrasProibidas(
    ppap_termo varchar(45)
)
BEGIN
    INSERT INTO PalavraProibida(pap_termo)
    VALUES(ppap_termo);
END $$
DELIMITER ;

CALL spInserirPalavrasProibidas("spam");
CALL spInserirPalavrasProibidas("teste_ilegal");
CALL spInserirPalavrasProibidas("venda_proibida");
-- inserts de proposta
INSERT INTO Proposta(pro_descricao, pro_aceita, usu_codigo, ser_codigo) 
VALUES('Posso desenvolver o site institucional para você',0,2,1);

INSERT INTO Proposta(pro_descricao, pro_aceita, usu_codigo, ser_codigo) 
VALUES('Tenho experiência em apps mobile, posso criar o seu',0,3,2);

INSERT INTO Proposta(pro_descricao, pro_aceita, usu_codigo, ser_codigo) 
VALUES('Posso implementar o sistema de gerenciamento solicitado',0,1,3);

-- RF002 - Atualizar senha com código de recuperação
DELIMITER $$
CREATE PROCEDURE spRecuperarSenha(
    pCre_Email VARCHAR(90),
    pNovaSenha VARCHAR(45)
)
BEGIN
    UPDATE Credencial
    SET cre_Senha = pNovaSenha
    WHERE cre_email = pCre_Email;
END $$
DELIMITER ;

-- RF005 - Manter pedidos de serviço (CREATE)
-- TODO: if verificando se o usuario tem moeda pra isso, e tambem insert na tabela de transações pq ao criar gasta 15 moedas
DELIMITER $$
CREATE PROCEDURE spInserirServico(
    pSer_Nome VARCHAR(45),
    pSer_Descricao VARCHAR(255),
    pSer_DataExpiracao DATE,
    pUsu_Codigo INT,
    pCat_Codigo INT
)
BEGIN

    DECLARE v_saldo_atual INT;

    SELECT usu_saldoMoeda INTO v_saldo_atual
    FROM Usuario
    WHERE usu_codigo = pUsu_Codigo;

    IF v_saldo_atual < 15 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Saldo de moeda insuficiente para criar o serviço (Requer 15 moedas).';
    ELSE
  
        INSERT INTO Servico(ser_nome, ser_descricao, ser_dataPedido, ser_dataExpiracao, ser_concluido, usu_codigo, cat_codigo)
        VALUES(pSer_Nome, pSer_Descricao, CURDATE(), pSer_DataExpiracao, 0, pUsu_Codigo, pCat_Codigo);

        -- registra a transacao
        INSERT INTO TransacoesMoeda(trm_valor, trm_date, trm_tipo, usu_codigo, ser_codigo)
        VALUES(15, CURDATE(), 1, pUsu_Codigo, LAST_INSERT_ID());
        
    END IF;
END $$
DELIMITER ;

-- RF005 - Atualizar pedido de serviço
DELIMITER $$
CREATE PROCEDURE spAtualizarServico(
    pSer_Codigo INT,
    pSer_Nome VARCHAR(45),
    pSer_Descricao VARCHAR(255),
    pSer_DataExpiracao DATE,
    pCat_Codigo INT
)
BEGIN
    UPDATE Servico
    SET ser_nome = pSer_Nome,
        ser_descricao = pSer_Descricao,
        ser_dataExpiracao = pSer_DataExpiracao,
        cat_codigo = pCat_Codigo
    WHERE ser_codigo = pSer_Codigo;
END $$
DELIMITER ;

-- RF005 - Deletar pedido de serviço
DELIMITER $
CREATE PROCEDURE spDeletarServico(
    pSer_Codigo INT
)
BEGIN
    -- Deleta registros relacionados primeiro
    DELETE FROM NotificacaoProposta WHERE ser_codigo = pSer_Codigo;
    DELETE FROM TransacoesMoeda WHERE ser_codigo = pSer_Codigo;
    DELETE FROM Avaliacao WHERE ser_codigo = pSer_Codigo;
    DELETE FROM Proposta WHERE ser_codigo = pSer_Codigo;
    
    -- Agora pode deletar o serviço
    DELETE FROM Servico WHERE ser_codigo = pSer_Codigo;
END $
DELIMITER ;

-- RF008 - Visualizar histórico de mensagens
DELIMITER $$
CREATE PROCEDURE spVisualizarHistoricoMensagens(
    pCha_Codigo INT
)
BEGIN
    SELECT m.men_codigo, m.men_dataEnvio, m.men_textoMensagem, 
           u.usu_codigo, u.usu_Nome, u.usu_fotoPerfil, m.cha_codigo
    FROM Mensagem m
    INNER JOIN Usuario u ON m.usu_codigo = u.usu_codigo
    WHERE m.cha_codigo = pCha_Codigo
    ORDER BY m.men_dataEnvio ASC;
END $$
DELIMITER ;

-- RF009 - Manter mensagens no chat (CREATE)
DELIMITER $$

CREATE PROCEDURE spInserirMensagem(
    IN pMen_TextoMensagem VARCHAR(255),
    IN pCha_Codigo INT,
    IN pUsu_Codigo INT
)
BEGIN
    DECLARE v_men_codigo INT;

    INSERT INTO Mensagem (men_dataEnvio, men_textoMensagem, cha_codigo, usu_codigo)
    VALUES (NOW(), pMen_TextoMensagem, pCha_Codigo, pUsu_Codigo);


    SET v_men_codigo = LAST_INSERT_ID();

    SELECT m.men_codigo, m.men_textoMensagem, m.men_dataEnvio,
        m.cha_codigo, m.usu_codigo, u.usu_nome, u.usu_fotoPerfil
    FROM Mensagem m
    JOIN Usuario u USING(usu_codigo)
    WHERE m.men_codigo = v_men_codigo;

END $$

DELIMITER ;

-- RF009 - Atualizar mensagem
DELIMITER $$
CREATE PROCEDURE spAtualizarMensagem(
    pMen_Codigo INT,
    pMen_TextoMensagem VARCHAR(255)
)
BEGIN
    UPDATE Mensagem
    SET men_textoMensagem = pMen_TextoMensagem
    WHERE men_codigo = pMen_Codigo;
END $$
DELIMITER ;

-- RF009 - Deletar mensagem
DELIMITER $
CREATE PROCEDURE spDeletarMensagem(
    pMen_Codigo INT
)
BEGIN
    -- Deleta notificações relacionadas primeiro
    DELETE FROM NotificacaoMensagem WHERE men_codigo = pMen_Codigo;
    
    -- Agora pode deletar a mensagem
    DELETE FROM Mensagem WHERE men_codigo = pMen_Codigo;
END $
DELIMITER ;

-- RF010 - Manter avaliações de serviços (CREATE)
DELIMITER $$
CREATE PROCEDURE spInserirAvaliacao(
    pAva_Nota DOUBLE,
    pAva_Mensagem VARCHAR(255),
    pUsu_Codigo INT,
    pSer_Codigo INT
)
BEGIN
    INSERT INTO Avaliacao(ava_nota, ava_mensagem, usu_codigo, ser_codigo)
    VALUES(pAva_Nota, pAva_Mensagem, pUsu_Codigo, pSer_Codigo);
END $$
DELIMITER ;

-- RF010 - Atualizar avaliação
DELIMITER $$
CREATE PROCEDURE spAtualizarAvaliacao(
    pAva_Codigo INT,
    pAva_Nota DOUBLE,
    pAva_Mensagem VARCHAR(255)
)
BEGIN
    UPDATE Avaliacao
    SET ava_nota = pAva_Nota,
        ava_mensagem = pAva_Mensagem
    WHERE ava_codigo = pAva_Codigo;
END $$
DELIMITER ;

-- RF010 - Deletar avaliação
DELIMITER $
CREATE PROCEDURE spDeletarAvaliacao(
    pAva_Codigo INT
)
BEGIN

    DELETE FROM Avaliacao WHERE ava_codigo = pAva_Codigo;
END $
DELIMITER ;

-- RF011 - Consultar avaliações de outros usuários
DELIMITER $$
CREATE PROCEDURE spConsultarAvaliacoesUsuario(
    pUsu_Codigo INT
)
BEGIN
    SELECT a.ava_codigo, a.ava_nota, a.ava_mensagem, 
           s.ser_nome, s.ser_descricao,
           u.usu_Nome AS avaliador, u.usu_fotoPerfil
    FROM Avaliacao a
    INNER JOIN Servico s ON a.ser_codigo = s.ser_codigo
    INNER JOIN Usuario u ON a.usu_codigo = u.usu_codigo
    ORDER BY a.ava_codigo DESC;
END $$
DELIMITER ;

select * from Avaliacao
CALL spConsultarAvaliacoesUsuario(1)
-- RF020 - Usuários aceitem pedidos
DELIMITER $$
CREATE PROCEDURE spAceitarProposta(
    pPro_Codigo INT
)
BEGIN
    UPDATE Proposta
    SET pro_aceita = 1
    WHERE pro_codigo = pPro_Codigo;
END $$
DELIMITER ;

-- RF024 - Exibir saldo atual de moedas do usuário
DELIMITER $
CREATE PROCEDURE spExibirSaldoMoedas(
    pUsu_Codigo INT
)
BEGIN
    SELECT usu_codigo, usu_Nome, usu_saldoMoeda
    FROM Usuario
    WHERE usu_codigo = pUsu_Codigo;
END $
DELIMITER ;

-- VIEWS

-- Exibir todos os serviços
CREATE VIEW vwServicos AS 
SELECT ser_codigo, ser_nome, ser_descricao, ser_dataPedido, ser_dataExpiracao,cat_nome, usu_nome as 'Criador'
FROM Servico
INNER JOIN Categoria USING(cat_codigo)
INNER JOIN Usuario USING(usu_codigo);

-- Exibir serviços disponiveis
CREATE VIEW vwServicosDisponiveis AS 
SELECT ser_codigo, ser_nome, ser_descricao, ser_dataPedido,
	   ser_dataExpiracao,cat_nome, usu_nome as 'Criador'
FROM Servico
INNER JOIN Categoria USING(cat_codigo)
INNER JOIN Usuario USING(usu_codigo) 
WHERE ser_concluido = 0 AND ser_dataExpiracao >= CURDATE()
ORDER BY ser_dataExpiracao;

SELECT * FROM vwServicosDisponiveis;

-- Exibir Categorias
CREATE VIEW vwCategorias AS 
SELECT cat_codigo, cat_nome
FROM Categoria;

-- Exibir Habilidades
CREATE VIEW vwHabilidades AS 
SELECT hab_codigo, hab_nome
FROM Habilidade;


-- RF023 O sistema deve permitir que o usuário receba moedas ao concluir um pedido de serviço como prestador 
DELIMITER $$
CREATE PROCEDURE spConcluirServico(
    pSer_Codigo INT
)
BEGIN
    DECLARE v_usu_prestador_codigo INT;

    -- busca codigo do prestador
    SELECT usu_codigo INTO v_usu_prestador_codigo
    FROM Proposta
    WHERE ser_codigo = pSer_Codigo AND pro_aceita = 1
    LIMIT 1; -- Limita a 1 pois apenas uma proposta pode ser aceita

    -- Verifica se um prestador aceito foi encontrado
    IF v_usu_prestador_codigo IS NOT NULL THEN

        -- atualiza o status do serviço para CONCLUÍDO
        UPDATE Servico
        SET ser_concluido = 1
        WHERE ser_codigo = pSer_Codigo;


        INSERT INTO TransacoesMoeda(trm_valor, trm_date, trm_tipo, usu_codigo, ser_codigo)
        VALUES(15, CURDATE(), 0, v_usu_prestador_codigo, pSer_Codigo);
        
    ELSE
        -- Se não houver proposta aceita, o serviço não pode ser concluído e pago.
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Serviço não pode ser concluído: nenhuma proposta foi aceita para este pedido.';
    END IF;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE spInserirChat(
    IN pCha_Nome VARCHAR(255),
    IN pChar_Descricao VARCHAR(500),
    IN pUsu_Codigo_Criador INT
)
BEGIN

    DECLARE v_cha_codigo INT;

    INSERT INTO Chat (cha_nome, char_descricao)
    VALUES (pCha_Nome, pChar_Descricao);

    SET v_cha_codigo = LAST_INSERT_ID();

  
    INSERT INTO UsuarioChat (cha_codigo, usu_codigo)
    VALUES (v_cha_codigo, pUsu_Codigo_Criador);

  
    SELECT cha_codigo, cha_nome, char_descricao
    FROM Chat
    WHERE cha_codigo = v_cha_codigo;

END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE spAdicionarUsuarioChat(
    IN pCha_Codigo INT,
    IN pUsu_Codigo INT
)
BEGIN

    INSERT INTO UsuarioChat (cha_codigo, usu_codigo)
    VALUES (pCha_Codigo, pUsu_Codigo);
    
END $$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE spListarMembrosChat(
    IN pCha_Codigo INT
)
BEGIN

    SELECT u.usu_codigo, u.usu_nome, u.usu_fotoPerfil
    FROM Usuario u
    JOIN UsuarioChat uc USING(usu_codigo) 
    WHERE uc.cha_codigo = pCha_Codigo;
    
END $$

DELIMITER ;

DELIMITER $$
-- Procedure para listar todos os chats de um usuário.
CREATE PROCEDURE spListarChatsUsuario(
    IN pUsu_Codigo INT
)
BEGIN
    SELECT c.cha_codigo, c.cha_nome, c.char_descricao
    FROM Chat c
    INNER JOIN UsuarioChat uc USING(cha_codigo) 
    WHERE uc.usu_codigo = pUsu_Codigo
    ORDER BY c.cha_codigo DESC; 
    
END $$
