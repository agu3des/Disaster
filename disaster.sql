--entidades:

CREATE TABLE Regiao 
( 
 codigoRegiao INT,  
 nomeRegiao varchar(20) NOT NULL,
 CONSTRAINT PK_codigoRegiao_regiao PRIMARY KEY (codigoRegiao)  
); 

CREATE TABLE Desastre_Natural 
( 
 codDesastre INT,
 dataDeOcorrencia date NOT NULL,  
 duracao INT,  
 intensidade INT,    
 qtdVitimas INT,
 CONSTRAINT PK_codDesastre_desastre PRIMARY KEY (codDesastre)  
); 

CREATE TABLE Testemunha 
( 
 testemunhaCpf char(11),
 nome varchar(100) NOT NULL,
 genero char(1),   
 dataDeNascimento date,  
 nacionalidade varchar(15),
 contato varchar(12) UNIQUE,
 CONSTRAINT PK_testemunhaCpf_testemunha PRIMARY KEY (testemunhaCpf)    
); 

CREATE TABLE Relato 
( 
 codigoRelato INT,  
 relato varchar(300) NOT NULL,  
 dataDeEmissao date NOT NULL,  
 codDesastre INT NOT NULL, --adicao de coluna relacionamento com desastre
 testemunha char(11) NOT NULL,
 CONSTRAINT PK_codigoRelato_relato PRIMARY KEY (codigoRelato),
 CONSTRAINT FK_codDesastre_relato FOREIGN KEY (codDesastre) REFERENCES
 Desastre_Natural(codDesastre),
 CONSTRAINT FK_testemunha_relato FOREIGN KEY (testemunha) REFERENCES
 Testemunha(testemunhaCpf)  
); 

CREATE TABLE Tipo 
( 
 codTipo INT,  
 descricao varchar(20) NOT NULL,
 CONSTRAINT PK_codTipo_tipo PRIMARY KEY (codTipo)  
); 

CREATE TABLE Abrigo 
( 
 cnpj char(14),  
 nome varchar(100) NOT NULL,  
 cep char(8) NOT NULL,
 numero int,
 rua varchar(20),
 bairro varchar(20),
 cidade varchar(20),
 estado varchar(20), 
 disponibilidade boolean NOT NULL,
 CONSTRAINT PK_cnpj_abrigo PRIMARY KEY (cnpj)  
); 

CREATE TABLE Vitima 
( 
 vitimaCpf char(11),
 nome varchar(100) NOT NULL,
 dataDeNascimento date,  
 genero char(1),     
 nacionalidade varchar(10),  
 condicaoMedica varchar(30),  
 cnpjAbrigo char(14),
 dataEntrada date,
 dataSaida date,
 contato varchar(12) unique,  
 CONSTRAINT PK_vitimaCpf_vitima PRIMARY KEY (vitimaCpf),
 CONSTRAINT FK_cnpjAbrigo_vitima FOREIGN KEY (cnpjAbrigo) REFERENCES abrigo(cnpj)
); 

CREATE TABLE Categoria 
( 
 codCateg INT,
 descricao varchar(30) NOT NULL,  
 valor numeric(20,2),  
 perecivel boolean NOT NULL,  
 validade date,  
 CONSTRAINT PK_codCateg_categoria PRIMARY KEY (codCateg)  
);

CREATE TABLE Doador 
( 
 doadorCpf char(11),  
 nome varchar(100) NOT NULL,
 CONSTRAINT PK_doadorCpf_doador PRIMARY KEY (doadorCpf) 
); 

CREATE TABLE Doacao 
( 
 codDoacao INT,
 qtdEstoque INT NOT NULL,  
 dataDoacao date NOT NULL,  
 localArmazenamento varchar(30),
 codCateg INT NOT NULL,
 doadorCPF char(11) NOT NULL,
 CONSTRAINT PK_codDoacao_doacao PRIMARY KEY (codDoacao),
 CONSTRAINT FK_codCateg_doacao FOREIGN KEY (codCateg) REFERENCES categoria(codCateg),
 CONSTRAINT FK_doadorCPF_doacao FOREIGN KEY (doadorCPF) REFERENCES Doador(doadorCPF)
); 

CREATE TABLE AgenciaDeResgate 
( 
 cnpj char(14), 
 nomeAgencia varchar(20) NOT NULL, 
 telefone varchar(20),    
 cep char(8) NOT NULL,
 numero INT,
 rua varchar(20),
 bairro varchar(20),
 cidade varchar(20),
 estado char(2),
 CONSTRAINT PK_cnpj_AgenciaDeResgate PRIMARY KEY (cnpj)
); 

CREATE TABLE Voluntario (
	cpfVoluntario char(11),
	nomeVoluntario varchar(100),
	CONSTRAINT PK_cpfVoluntario_Voluntario PRIMARY KEY (cpfVoluntario)
);

--relacionamentos:

CREATE TABLE ocorrencia --ocorre
( 
 codigoRegiao INT,  
 codDesastre INT,
 CONSTRAINT PK_codigoRegiao_codDesastre_ocorrencia PRIMARY KEY (codigoRegiao, codDesastre),
 CONSTRAINT FK_codigoRegiao_ocorrencia FOREIGN KEY (codigoRegiao) REFERENCES 
 Regiao(codigoRegiao),
 CONSTRAINT FK_codDesastre_ocorrencia FOREIGN KEY (codDesastre) REFERENCES 
 Desastre_Natural(codDesastre)  
); 

CREATE TABLE TipoDesastre --tem
( 
 codTipo INT,  
 codDesastre INT,
 CONSTRAINT PK_codTipo_codDesastre_TipoDesastre PRIMARY KEY (codTipo, codDesastre),
 CONSTRAINT FK_codTipo_TipoDesastre FOREIGN KEY (codTipo) REFERENCES Tipo(codTipo),
 CONSTRAINT FK_codDesastre_TipoDesastre FOREIGN KEY (codDesastre) REFERENCES 
 Desastre_Natural(codDesastre)  
); 

CREATE TABLE VitimaDesastre --causa
( 
 codDesastre INT,  
 vitimaCpf char(11), 
 CONSTRAINT PK_codDesastre_vitimaCpf_VitimaDesastre PRIMARY KEY (codDesastre, vitimaCpf),
 CONSTRAINT FK_codDesastre_VitimaDesastre FOREIGN KEY (codDesastre) REFERENCES 
 Desastre_Natural(codDesastre),
 CONSTRAINT FK_vitimaCpf_VitimaDesastre FOREIGN KEY (vitimaCpf) REFERENCES 
 Vitima(vitimaCpf) 
); 

CREATE TABLE DoacaoVitima --vitima recebe
(
  codDoacao INT,
  vitimaCpf CHAR(11),
  CONSTRAINT PK_codDoacao_vitimaCpf_DoacaoVitima PRIMARY KEY (codDoacao, vitimaCpf),
  CONSTRAINT FK_codDoacao_doacaoVitima FOREIGN KEY (codDoacao) REFERENCES 
  Doacao(codDoacao),
  CONSTRAINT FK_vitimaCpf_doacaoVitima FOREIGN KEY (vitimaCpf) REFERENCES 
  Vitima(vitimaCpf)
);

/* não tem mais
relacionamento 1:n, fica adição de coluna na tabela doacao
CREATE TABLE DoacaoDoador --doador faz doacao
( 
 codDoacao INT,  
 doadorCpf char(11),
 CONSTRAINT PK_codDoacao_doadorCpf_DoacaoDoador PRIMARY KEY (codDoacao, doadorCpf),
 CONSTRAINT FK_codDoacao_DoacaoDoador FOREIGN KEY (codDoacao) REFERENCES 
 Doacao(codDoacao),
 CONSTRAINT FK_doadorCpf_DoacaoDoador FOREIGN KEY (doadorCpf) REFERENCES 
 Doador(doadorCpf)  
); */

CREATE TABLE atuacao
(
 cnpjAgencia char(14),  
 codDesastre INT,
 dataDeAtuacao date NOT NULL,
 CONSTRAINT PK_cnpjAgencia_codDesastre_atuacao PRIMARY KEY (cnpjAgencia, codDesastre),
 CONSTRAINT FK_cnpjAgencia_atuacao FOREIGN KEY (cnpjAgencia) REFERENCES 
 AgenciaDeResgate(cnpj),
 CONSTRAINT FK_codDesastre_atuacao FOREIGN KEY (codDesastre) REFERENCES 
 Desastre_Natural(codDesastre)  
);

CREATE TABLE DoacaoAgencia --agencia recebe
(
  codDoacao INT,
  cnpjAgencia CHAR(14),
  CONSTRAINT PK_codDoacao_cnpjAgencia_DoacaoAgencia PRIMARY KEY (codDoacao, cnpjAgencia),
  CONSTRAINT FK_codDoacao_doacaoAgencia FOREIGN KEY (codDoacao) REFERENCES 
  Doacao(codDoacao),
  CONSTRAINT FK_cnpjAgencia_doacaoAgencia FOREIGN KEY (cnpjAgencia) REFERENCES 
  AgenciaDeResgate(cnpj)
); 

CREATE TABLE voluntarioAgencia (
  cnpjAgencia CHAR(14),
  CPFVoluntario CHAR(11),
  CONSTRAINT PK_cnpjAgencia_cpfVoluntario_voluntarioAgencia PRIMARY KEY 
  (cnpjAgencia, CPFVoluntario),
  CONSTRAINT FK_cnpjAgencia_voluntarioAgencia FOREIGN KEY (cnpjAgencia) REFERENCES 
  AgenciaDeResgate(cnpj),
  CONSTRAINT FK_CPFVoluntario_voluntarioAgencia FOREIGN KEY (CPFVoluntario) REFERENCES 
  Voluntario(CPFVoluntario)
);

CREATE TABLE voluntarioAbrigo (
  cnpjAbrigo CHAR(14),
  CPFVoluntario CHAR(11),
  CONSTRAINT PK_cnpjAbrigo_cpfVoluntario_voluntarioAbrigo PRIMARY KEY 
  (cnpjAbrigo, CPFVoluntario),
  CONSTRAINT FK_cnpjAbrigo_voluntarioAbrigo FOREIGN KEY (cnpjAbrigo) REFERENCES 
  Abrigo(cnpj),
  CONSTRAINT FK_CPFVoluntario_voluntarioAbrigo FOREIGN KEY (CPFVoluntario) REFERENCES 
  Voluntario(CPFVoluntario)
);
 
 /*
 não tem mais para cardinalidade: doacao (0,n) tem (1,1) categoria
 CREATE TABLE DoacaoCategoria --possui
( 
 codDoacao INT,  
 codCateg INT,
 CONSTRAINT PK_codDoacao_codCateg_DoacaoCategoria PRIMARY KEY (codDoacao, codCateg),
 CONSTRAINT FK_codDoacao_DoacaoCategoria FOREIGN KEY (codDoacao) REFERENCES 
 Doacao(codDoacao),
 CONSTRAINT FK_codCateg_DoacaoCategoria FOREIGN KEY (codCateg) REFERENCES 
 Categoria(codCateg)
);
*/

/*
não tem mais
CREATE TABLE IF NOT EXISTS contatoVitima
(
	vitimaCpf varchar(11) NOT NULL,
	telefone VARCHAR(12) NOT NULL,
	CONSTRAINT CHK_telefoneVitima CHECK(LENGTH(telefone) >= 12),
	CONSTRAINT PK_vitimaCpf_telefone_contatoVitima PRIMARY KEY (vitimaCpf, telefone),
	CONSTRAINT FK_vitimaCpf_contatoVitima FOREIGN KEY (vitimaCpf)
	REFERENCES vitima(vitimaCpf)
);

CREATE TABLE IF NOT EXISTS contatoTestemunha
(
	testemunhaCpf varchar(11) NOT NULL,
	telefone VARCHAR(12) NOT NULL,
	CONSTRAINT CHK_telefoneTestemunha CHECK(LENGTH(telefone) >= 12),
	CONSTRAINT PK_testemunhaCpf_telefone_contatoTestemunha 	PRIMARY KEY 
	(testemunhaCpf, telefone),
	CONSTRAINT FK_testemunhaCpf_contatoTestemunha FOREIGN KEY (testemunhaCpf)
	REFERENCES testemunha(testemunhaCpf)
);

CREATE TABLE AtuacaoAbrigo 
(
    cnpjAbrigo varchar(14),
    codDesastre INT,
    dataDeAtuacao date NOT NULL,
    CONSTRAINT PK_cnpjAbrigo_codDesastre_AtuacaoAbrigo PRIMARY KEY 
    (cnpjAbrigo, codDesastre),
    CONSTRAINT FK_cnpjAbrigo_AtuacaoAbrigo FOREIGN KEY (cnpjAbrigo) REFERENCES 
    Abrigo(cnpj),
    CONSTRAINT FK_codDesastre_AtuacaoAbrigo FOREIGN KEY (codDesastre) REFERENCES 
    DesastreNatural(codDesastre)
);
*/

/*
não tem mais
CREATE TABLE TestemunhaRelato --faz
(
 codRelato INT, 
 testemunhaCpf varchar(11),
 CONSTRAINT PK_codRelato_testemunhaCpf_TestemunhaRelato PRIMARY KEY 
 (codRelato, testemunhaCpf),
 CONSTRAINT FK_codRelato_TestemunhaRelato FOREIGN KEY (codRelato) REFERENCES 
 Relato(codRelato),
 CONSTRAINT FK_testemunhaCpf_TestemunhaRelato FOREIGN KEY (testemunhaCpf) REFERENCES
 testemunha(testemunhaCpf)    
); */

/*
não tem mais
CREATE TABLE DoacaoAbrigo --abrigo recebe
(
  codDoacao INT,
  cnpjAbrigo VARCHAR(14),
  CONSTRAINT PK_codDoacao_cnpjAbrigo_doacaoAbrigo PRIMARY KEY (codDoacao, cnpjAbrigo),
  CONSTRAINT FK_codDoacao_doacaoAbrigo FOREIGN KEY (codDoacao) REFERENCES 
  Doacao(codDoacao),
  CONSTRAINT FK_cnpjAbrigo_doacaoAbrigo FOREIGN KEY (cnpjAbrigo) REFERENCES 
  Abrigo(cnpj)
);
*/



INSERT INTO Regiao (codigoRegiao, nomeRegiao) VALUES
(1, 'Centro-Oeste'),
(2, 'Nordeste'),
(3, 'Norte'),
(4, 'Sudeste'),
(5, 'Sul');

INSERT INTO Desastre_Natural (codDesastre, dataDeOcorrencia, duracao, intensidade, qtdVitimas) VALUES
(1, '2023-01-15', 72, 5, 120),
(2, '2023-02-10', 48, 7, 80),
(3, '2023-03-25', 36, 4, 50),
(4, '2023-04-12', 60, 6, 90),
(5, '2023-05-05', 24, 8, 150);

INSERT INTO Testemunha (testemunhaCpf, nome, genero, dataDeNascimento, nacionalidade, contato) VALUES
('12345678901', 'Maria Silva', 'F', '1985-06-25', 'Brasileira', '11987654321'),
('10987654321', 'João Santos', 'M', '1978-11-15', 'Brasileiro', '11876543210'),
('23456789012', 'Ana Costa', 'F', '1990-02-20', 'Brasileira', '11765432109'),
('34567890123', 'Carlos Almeida', 'M', '1982-07-30', 'Brasileiro', '11654321098'),
('45678901234', 'Lucia Pereira', 'F', '1995-09-10', 'Brasileira', '11543210987');

INSERT INTO Relato (codigoRelato, relato, dataDeEmissao, codDesastre, testemunha) VALUES
(1, 'Muitas casas foram destruídas e pessoas estão desabrigadas.', '2023-01-16', 1, '12345678901'),
(2, 'Há necessidade urgente de assistência médica.', '2023-02-11', 2, '10987654321'),
(3, 'Há relatos de danos a infraestruturas importantes.', '2023-03-26', 3, '23456789012'),
(4, 'O número de vítimas está aumentando.', '2023-04-13', 4, '34567890123'),
(5, 'A situação é crítica e precisa de ajuda urgente.', '2023-05-06', 5, '45678901234');

INSERT INTO Tipo (codTipo, descricao) VALUES 
(1, 'Enxurrada'),
(2, 'Furacão'),
(3, 'Inundação'),
(4, 'Deslizamento Terra'),
(5, 'Incêndio Florestal');

INSERT INTO Abrigo (cnpj, nome, cep, numero, rua, bairro, cidade, estado, disponibilidade) VALUES
('12345678000195', 'Abrigo Centro', '01001000', 100, 'Rua A', 'Centro', 'São Paulo', 'SP', TRUE),
('23456789000196', 'Abrigo Norte', '02002000', 200, 'Rua B', 'Norte', 'Rio de Janeiro', 'RJ', TRUE),
('34567890000197', 'Abrigo Sul', '03003000', 300, 'Rua C', 'Sul', 'Porto Alegre', 'RS', TRUE),
('45678901000198', 'Abrigo Leste', '04004000', 400, 'Rua D', 'Leste', 'Fortaleza', 'CE', TRUE),
('56789012000199', 'Abrigo Oeste', '05005000', 500, 'Rua E', 'Oeste', 'Brasília', 'DF', TRUE);

INSERT INTO Vitima (vitimaCpf, nome, dataDeNascimento, genero, nacionalidade, condicaoMedica, cnpjAbrigo, dataEntrada, dataSaida, contato) VALUES
('67890123456', 'Pedro Oliveira', '1987-05-12', 'M', 'Brasileiro', 'Ferido', '12345678000195', '2023-01-16', NULL, '11912345678'),
('78901234567', 'Juliana Lima', '1990-08-23', 'F', 'Brasileira', 'Leve', '23456789000196', '2023-02-11', NULL, '11876543210'),
('89012345678', 'Marcelo Santos', '1985-12-30', 'M', 'Brasileiro', 'Grave', '34567890000197', '2023-03-26', NULL, '11765432109'),
('90123456789', 'Fernanda Souza', '1992-11-11', 'F', 'Brasileira', 'Leve', '45678901000198', '2023-04-13', NULL, '11654321098'),
('01234567890', 'Ricardo Almeida', '1980-07-22', 'M', 'Brasileiro', 'Ferido', '56789012000199', '2023-05-06', NULL, '11543210987');

INSERT INTO Categoria (codCateg, descricao, valor, perecivel, validade) VALUES
(1, 'Roupas', 200.00, FALSE, NULL),
(2, 'Alimentos', 150.00, TRUE, '2023-06-01'),
(3, 'Medicamentos', 300.00, TRUE, '2023-07-01'),
(4, 'Água', 100.00, FALSE, NULL),
(5, 'Móveis', 500.00, FALSE, NULL);

INSERT INTO Doador (doadorCpf, nome) VALUES
('12345678901', 'Carlos Martins'),
('23456789012', 'Patrícia Oliveira'),
('34567890123', 'Roberto Silva'),
('45678901234', 'Ana Paula Costa'),
('56789012345', 'Eduardo Santos');

INSERT INTO Doacao (codDoacao, qtdEstoque, dataDoacao, localArmazenamento, codCateg, doadorCPF) VALUES
(1, 100, '2023-01-20', 'Depósito A', 1, '12345678901'),
(2, 50, '2023-02-15', 'Depósito B', 2, '23456789012'),
(3, 75, '2023-03-10', 'Depósito C', 3, '34567890123'),
(4, 120, '2023-04-05', 'Depósito D', 4, '45678901234'),
(5, 80, '2023-05-01', 'Depósito E', 5, '56789012345');

INSERT INTO AgenciaDeResgate (cnpj, nomeAgencia, telefone, cep, numero, rua, bairro, cidade, estado) VALUES
('01234567000123', 'Agência Centro', '1122334455', '06060600', 10, 'Rua X', 'Centro', 'São Paulo', 'SP'),
('12345678000124', 'Agência Norte', '2233445566', '07070700', 20, 'Rua Y', 'Norte', 'Rio de Janeiro', 'RJ'),
('23456789000125', 'Agência Sul', '3344556677', '08080800', 30, 'Rua Z', 'Sul', 'Porto Alegre', 'RS'),
('34567890000126', 'Agência Leste', '4455667788', '09090900', 40, 'Rua W', 'Leste', 'Fortaleza', 'CE'),
('45678901000127', 'Agência Oeste', '5566778899', '10101010', 50, 'Rua V', 'Oeste', 'Brasília', 'DF');

INSERT INTO Voluntario (cpfVoluntario, nomeVoluntario) VALUES
('11122334455', 'Lucas Ferreira'),
('22233445566', 'Juliana Rocha'),
('33344556677', 'Marcos Lima'),
('44455667788', 'Fernanda Castro'),
('55566778899', 'Gabriel Pereira');

INSERT INTO voluntarioAbrigo (cnpjAbrigo, CPFVoluntario) VALUES
('12345678000195', '11122334455'),
('23456789000196', '22233445566'),
('34567890000197', '33344556677'),
('45678901000198', '44455667788'),
('56789012000199', '55566778899');

INSERT INTO voluntarioAgencia (cnpjAgencia, CPFVoluntario) VALUES
('01234567000123', '11122334455'),
('12345678000124', '22233445566'),
('23456789000125', '33344556677'),
('34567890000126', '44455667788'),
('45678901000127', '55566778899');

INSERT INTO ocorrencia (codigoRegiao, codDesastre) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);


INSERT INTO TipoDesastre (codTipo, codDesastre) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

INSERT INTO VitimaDesastre (codDesastre, vitimaCpf) VALUES
(1, '67890123456'),
(2, '78901234567'),
(3, '89012345678'),
(4, '90123456789'),
(5, '01234567890');

INSERT INTO DoacaoVitima (codDoacao, vitimaCpf) VALUES
(1, '67890123456'),
(2, '78901234567'),
(3, '89012345678'),
(4, '90123456789'),
(5, '01234567890');

INSERT INTO DoacaoAgencia (codDoacao, cnpjAgencia) VALUES
(1, '01234567000123'),
(2, '12345678000124'),
(3, '23456789000125'),
(4, '34567890000126'),
(5, '45678901000127');

INSERT INTO atuacao (cnpjAgencia, codDesastre, dataDeAtuacao) VALUES
('01234567000123', 1, '2024-08-01'),
('12345678000124', 2, '2024-08-05'),
('23456789000125', 3, '2024-08-10'),
('34567890000126', 4, '2024-08-15'),
('45678901000127', 5, '2024-08-20');

/*
INSERT INTO DoacaoDoador (codDoacao, doadorCpf) VALUES
(1, '12345678901'),
(2, '23456789012'),
(3, '34567890123'),
(4, '45678901234'),
(5, '56789012345');
*/