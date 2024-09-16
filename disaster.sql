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