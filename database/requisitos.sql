/*
Encontrar Desastres com Quantidade de Vítimas maior que 20 e 
Data de Ocorrência entre janeiro e março de 2023 */ 
SELECT *
FROM Desastre_Natural
WHERE qtdVitimas > 20 
  AND dataDeOcorrencia BETWEEN '2023-01-01' AND '2023-03-31';

--Consultar Testemunhas e Seus Relatos Correspondentes
SELECT t.nome AS nome_testemunha, r.relato, r.dataDeEmissao
FROM Testemunha t
INNER JOIN Relato r ON t.testemunhaCpf = r.testemunha;

--Consultar Vítimas e Seus Abrigos Correspondentes
SELECT v.vitimaCpf, v.nome AS nome_vitima, a.nome AS nome_abrigo, a.cidade
FROM Vitima v
INNER JOIN Abrigo a ON v.cnpjAbrigo = a.cnpj;

--Consultar Relatos e Seus Desastres Correspondentes
SELECT r.codigoRelato, r.relato, r.dataDeEmissao, d.dataDeOcorrencia, d.intensidade, ti.descricao
FROM Relato r
INNER JOIN Desastre_Natural d ON r.codDesastre = d.codDesastre
join tipodesastre td on d.codDesastre = td.codDesastre
join tipo ti on ti.codtipo = td.codtipo;

/*Esta consulta usa FULL OUTER JOIN para listar todos os registros de vítimas 
e abrigos, mostrando todos os registros de ambas as tabelas. Se não houver 
correspondência, os campos relacionados serão NULL.
*/

SELECT v.vitimaCpf, v.nome AS nome_vitima, v.condicaoMedica, a.cnpj, a.nome AS nome_abrigo, a.cidade
FROM Vitima v
FULL OUTER JOIN Abrigo a ON v.cnpjAbrigo = a.cnpj;


--1. Consulta para Contar o Número de Vítimas por Abrigo
/*
Motivo do LEFT JOIN: Aqui, queremos listar todos os abrigos e contar o 
número de vítimas associadas a cada um. Usar LEFT JOIN assegura que mesmo 
os abrigos que não têm vítimas associadas (ou seja, vítimas com cnpj não 
correspondentes aos abrigos) sejam incluídos na contagem. Abrigos sem vítimas 
serão listados com um total de 0 vítimas.
*/
SELECT a.nome AS nome_abrigo, COUNT(v.vitimaCpf) AS total_vitimas
FROM Abrigo a
LEFT JOIN Vitima v ON a.cnpj = v.cnpjAbrigo
GROUP BY a.nome;

--2. Consulta para contar o número de desastres por região
SELECT r.nomeRegiao, COUNT(d.codDesastre) AS total_desastres
FROM Regiao r
LEFT JOIN ocorrencia o ON r.codigoRegiao = o.codigoRegiao
LEFT JOIN Desastre_Natural d ON o.codDesastre = d.codDesastre
GROUP BY r.nomeRegiao;

/*
Explicação
Regiao r: Seleciona a tabela Regiao e a apelida como r.
LEFT JOIN ocorrencia o ON r.codRegiao = o.codRegiao: Faz um LEFT JOIN entre Regiao 
e ocorrencia, garantindo que todas as regiões sejam incluídas, mesmo que não haja 
desastres registrados para algumas delas.
LEFT JOIN DesastreNatural d ON o.codDesastre = d.codDesastre: Faz um LEFT JOIN entre 
ocorrencia e DesastreNatural, garantindo que todos os desastres relacionados à 
ocorrência sejam considerados.
GROUP BY r.nomeRegiao: Agrupa os resultados pelo nome da região.
COUNT(d.codDesastre) AS total_desastres: Conta o número de desastres em cada região.
*/


/* Consulta para encontrar vítimas que têm registros tanto na tabela Vitima 
quanto na tabela DoacaoVitima */
SELECT v.vitimaCpf
FROM Vitima v
INTERSECT
SELECT dv.vitimaCpf
FROM DoacaoVitima dv;


/* Consulta para encontrar desastres naturais que tiveram a atuação de uma agência 
específica*/
SELECT d.codDesastre, d.dataDeOcorrencia, d.duracao, d.intensidade, d.qtdVitimas
FROM Desastre_Natural d
WHERE d.codDesastre IN (
    SELECT a.codDesastre
    FROM atuacao a
    WHERE a.cnpjAgencia = '01234567000123'
);

-- Consulta para encontrar desastre com o maior número de vítimas
SELECT d.codDesastre, d.dataDeOcorrencia, d.duracao, d.intensidade, d.qtdVitimas
FROM Desastre_Natural d
WHERE d.qtdVitimas = (
    SELECT MAX(dn.qtdVitimas)
    FROM Desastre_Natural dn
);


CREATE VIEW vw_CategoriaResumo AS
SELECT codCateg AS codCategoria, descricao, perecivel
FROM Categoria;

select * from vw_CategoriaResumo;


/*
Visão 1: Resumo Detalhado de Desastres Naturais
Objetivo: Fornecer um resumo detalhado de desastres naturais, incluindo informações 
sobre a região afetada, o tipo de desastre, a quantidade de vítimas e as categorias 
de doações associadas.

Justificativa Semântica: Essa visão permite um entendimento abrangente dos desastres 
naturais ocorridos, detalhando suas localizações, tipos, e impactos. Além disso, 
inclui informações sobre doações relacionadas, auxiliando na análise de resposta a 
emergências e planejamento futuro.
*/

CREATE VIEW ResumoDesastres AS
SELECT 
    D.codDesastre,
    D.dataDeOcorrencia,
    D.intensidade,
    D.qtdVitimas,
    R.nomeRegiao,
    T.descricao AS tipoDesastre,
    COALESCE(Ca.descricao, 'Não especificada') AS categoriaDoacao,
    COALESCE(SUM(DOA.qtdEstoque), 0) AS totalDoado
FROM 
    Desastre_Natural D
JOIN 
    ocorrencia O ON D.codDesastre = O.codDesastre
JOIN 
    Regiao R ON O.codigoRegiao = R.codigoRegiao
JOIN 
    TipoDesastre TD ON D.codDesastre = TD.codDesastre
JOIN 
    Tipo T ON TD.codTipo = T.codTipo
JOIN 
	vitimaDesastre vd on d.coddesastre = vd.coddesastre
join 
	doacaovitima dv on vd.vitimacpf = dv.vitimacpf
join
    Doacao DOA ON DOA.coddoacao = dv.coddoacao
join
    Categoria Ca ON DOA.codCateg = Ca.codCateg
GROUP BY 
    D.codDesastre, D.dataDeOcorrencia, D.intensidade, D.qtdVitimas, R.nomeRegiao, T.descricao, Ca.descricao;

select * from ResumoDesastres;


/*
Visão 2: Resumo de Vítimas e Abrigos
Objetivo: Fornecer um resumo das vítimas e dos abrigos que as receberam, incluindo 
a condição médica e as doações recebidas.

Justificativa Semântica: Esta visão oferece um panorama das vítimas acolhidas em 
abrigos, suas condições médicas e as doações recebidas pelos abrigos. Tal visão é 
fundamental para verificar o estado atual das vítimas, os recursos disponíveis e 
planejar melhor a distribuição de assistência.
*/
CREATE VIEW ResumoVitimasAbrigos AS
SELECT 
    V.vitimaCpf,
    V.nome AS nomeVitima,
    V.condicaoMedica,
    A.nome AS nomeAbrigo,
    A.cidade,
    A.estado,
    SUM(DOA.qtdEstoque) AS totalDoacoes,
    C.descricao AS categoriaDoacao
FROM 
    Vitima V
JOIN 
    Abrigo A ON V.cnpjAbrigo = A.cnpj
LEFT JOIN 
    DoacaoVitima DV ON V.vitimaCpf = DV.vitimaCpf
LEFT JOIN 
    Doacao DOA ON DV.codDoacao = DOA.codDoacao
LEFT JOIN 
    Categoria C ON DOA.codCateg = C.codCateg
GROUP BY 
    V.vitimaCpf, V.nome, V.condicaoMedica, A.nome, A.cidade, A.estado, C.descricao;

select * from ResumoVitimasAbrigos;


/*
1.
Realizar consultas que filtram ou ordenam com base no número de vítimas geram
informações muito relevantes
*/
CREATE INDEX idx_desastre_qtdVitimas ON Desastre_Natural(qtdVitimas);

/*
2.
Pode ser útil fazer consultas envolvendo a quantidade em estoque das doações
*/
CREATE INDEX idx_doacao_qtdEstoque ON Doacao(qtdEstoque);


/*
3.
Pode ser útil fazer consultas que filtram ou ordenam os desastres naturais pela 
data de ocorrência, como encontrar desastres ocorridos em um intervalo específico
*/
CREATE INDEX idx_desastre_dataDeOcorrencia ON Desastre_Natural(dataDeOcorrencia);


/* Reescrita da consulta para encontrar desastres naturais que tiveram a atuação de uma agência 
específica*/
SELECT DISTINCT d.codDesastre, d.dataDeOcorrencia, d.duracao, d.intensidade, d.qtdVitimas
FROM Desastre_Natural d 
INNER JOIN atuacao a ON d.codDesastre = a.codDesastre
WHERE a.cnpjAgencia = '01234567000123';
-- O join é mais otimizado em relação as subconsultas porque permitem que o banco de dados compare diretamente os dados de múltiplas tabelas 
-- de forma eficiente, utilizando índices e otimizando o plano de execução. Além disso, evitam execuções repetitivas como ocorre em subconsultas. 
-- Isso reduz o tempo de processamento e o uso de recursos.


/*Reescrita da consulta que usa FULL OUTER JOIN para listar todos os registros de vítimas 
e abrigos, mostrando todos os registros de ambas as tabelas. Se não houver 
correspondência, os campos relacionados serão NULL.
*/
-- Retorna todas as vítimas, mesmo que não tenham abrigo associado
SELECT v.vitimaCpf, v.nome AS nome_vitima, v.condicaoMedica, a.cnpj, a.nome AS nome_abrigo, a.cidade
FROM Vitima v
LEFT JOIN Abrigo a ON v.cnpjAbrigo = a.cnpj
-- O union faz a junção dos dois resultados garantindo que os valores com null permaneçam e elimina automaticamente duplicatas 
UNION
-- Retorna todos os abrigos, mesmo que não tenham vítimas associadas
SELECT v.vitimaCpf, v.nome AS nome_vitima, v.condicaoMedica, a.cnpj, a.nome AS nome_abrigo, a.cidade
FROM Vitima v
RIGHT JOIN Abrigo a ON v.cnpjAbrigo = a.cnpj;
-- Essa abordagem simula o comportamento do FULL OUTER JOIN de uma forma que pode ser mais eficiente em bancos de dados que não lidam bem com o FULL OUTER JOIN. 
-- O uso de LEFT JOIN + RIGHT JOIN com UNION garante que se obtenha todas as combinações de registros, assim como o FULL OUTER JOIN, mas com a flexibilidade de otimizar índices e controlar melhor o desempenho.


--A função retornará o desastre natural mais recente com base na data de ocorrência.
CREATE OR REPLACE FUNCTION desastre_mais_recente()
RETURNS varchar AS $$
DECLARE
    rec RECORD;
    msg varchar;
BEGIN
    -- Seleciona o desastre mais recente e armazena o resultado na variável de registro
    SELECT
        dn.codDesastre,
        dn.dataDeOcorrencia,
        dn.qtdVitimas
    INTO rec
    FROM Desastre_Natural dn
    WHERE dn.dataDeOcorrencia = (
        SELECT MAX(dn2.dataDeOcorrencia)
        FROM Desastre_Natural dn2
    );

    -- Formata a mensagem usando os dados do desastre mais recente
    msg := format(
        'O desastre mais recente é o de código %s, ocorrido em %s, com %s vítimas',
        rec.codDesastre,
        rec.dataDeOcorrencia::text,
        rec.qtdVitimas
    );

    RETURN msg;
END;
$$ LANGUAGE plpgsql;



-- Executando a função:
SELECT desastre_mais_recente();



--1. Esta função contará a quantidade de relatos associados a um desastre natural
--drop function contar_relatos_por_desastre(codigoDesastre INT);
CREATE OR REPLACE FUNCTION contar_relatos_por_desastre(codigoDesastre INT)
RETURNS INT AS $$
DECLARE
    contador INT := 0;
    c_desastre CURSOR FOR
        SELECT codigoRelato
        FROM Relato r
        WHERE r.codDesastre = codigoDesastre;
BEGIN
    for cur in c_desastre loop
        contador := contador + 1;
	end loop;
    RETURN contador;
END;
$$ LANGUAGE plpgsql;

select contar_relatos_por_desastre(1);

/*2. função recebe como parametro o codigo do desastre e mostra a quantidade de 
vitimas no banco de dados*/

--drop function contar_vitimas_por_desastre(INT);
CREATE OR REPLACE FUNCTION contar_vitimas_por_desastre(codigoDesastre INT)
RETURNS INT AS $$
DECLARE
    contador INT := 0;
    cur CURSOR FOR
        SELECT vitimaCpf
        FROM VitimaDesastre
        WHERE codDesastre = codigoDesastre;
    vitima RECORD;
BEGIN
    OPEN cur;
    LOOP
        FETCH cur INTO vitima;
        EXIT WHEN NOT FOUND;
        contador := contador + 1;
    END LOOP;
    CLOSE cur;
    RETURN contador;
END;
$$ LANGUAGE plpgsql;

SELECT contar_vitimas_por_desastre(5);

/*Esta procedure atualizará a quantidade de estoque de doações e 
irá lidar com exceções, como tentar atualizar um estoque que não existe.*/
CREATE OR REPLACE PROCEDURE atualizar_estoque_doacao(
    p_codDoacao INTEGER,
    p_nova_qtde INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Atualiza a quantidade de estoque
    UPDATE Doacao
    SET qtdEstoque = p_nova_qtde
    WHERE codDoacao = p_codDoacao;

    -- Verifica se a atualização foi bem-sucedida
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Doação com código % não encontrada.', p_codDoacao;
    END IF;

    -- Notificação de sucesso
    RAISE NOTICE 'Estoque da doação com código % atualizado para %.', p_codDoacao, p_nova_qtde;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Erro ao atualizar estoque: %', SQLERRM;
END;
$$;


/*
1.
Se um abrigo tiver mais de 10 vítimas associadas, a sua disponibilidade é 
automaticamente ajustada para FALSE, indicando que não há mais vagas disponíveis. 
Caso contrário, a disponibilidade é definida como TRUE.
*/
CREATE OR REPLACE FUNCTION atualizar_disponibilidade_abrigo() 
RETURNS TRIGGER AS $$
BEGIN
    -- Verifica o número de vítimas associadas ao abrigo
    DECLARE
        numero_vitimas INT;
    BEGIN
        -- Conta o número total de vítimas associadas ao abrigo
        SELECT COUNT(*) INTO numero_vitimas
        FROM Vitima
        WHERE cnpjAbrigo = NEW.cnpjAbrigo;

        -- Atualiza a disponibilidade com base no número de vítimas
        IF numero_vitimas > 10 THEN
            UPDATE Abrigo
            SET disponibilidade = FALSE
            WHERE cnpj = NEW.cnpjAbrigo;
        ELSE
            UPDATE Abrigo
            SET disponibilidade = TRUE
            WHERE cnpj = NEW.cnpjAbrigo;
        END IF;

        RETURN NEW;
    END;
END;
$$ LANGUAGE plpgsql;


-- Trigger para acionar a função após inserção ou exclusão de vítimas
CREATE TRIGGER trg_atualizar_disponibilidade_abrigo
AFTER INSERT OR DELETE ON Vitima
FOR EACH ROW
EXECUTE FUNCTION atualizar_disponibilidade_abrigo();


/*
2.
Objetivo: Impedir que um abrigo receba mais voluntários do que uma capacidade máxima 
predefinida.

Justificativa Semântica: Esse trigger garante que os abrigos mantenham um limite 
operacional de voluntários, evitando sobrecarga e garantindo que cada abrigo receba 
uma quantidade controlada de voluntários. É importante para manter a eficiência 
do gerenciamento de recursos humanos no abrigo.
*/
CREATE OR REPLACE FUNCTION verificar_capacidade_voluntarios()
RETURNS TRIGGER AS $$
DECLARE
    qtd_atual_voluntarios INT;
    capacidade_maxima INT := 20; -- Definindo capacidade máxima como 20 voluntários
BEGIN
    -- Contando a quantidade de voluntários associados ao abrigo
    SELECT COUNT(*)
    INTO qtd_atual_voluntarios
    FROM voluntarioAbrigo
    WHERE cnpjAbrigo = NEW.cnpjAbrigo;

    -- Verificando se a capacidade máxima foi atingida
    IF qtd_atual_voluntarios >= capacidade_maxima THEN
        RAISE EXCEPTION 'Abrigo com CNPJ % já atingiu a capacidade máxima de voluntários.', NEW.cnpjAbrigo;
    END IF;

    RETURN NEW; -- Permite a inserção caso a capacidade não tenha sido atingida
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_verificar_capacidade_voluntarios
BEFORE INSERT ON voluntarioAbrigo
FOR EACH ROW
EXECUTE FUNCTION verificar_capacidade_voluntarios();



/*
3.
Objetivo: Impedir que uma doação fique com valor igual a zero no estoque.

Justificativa Semântica: Esse trigger garante que as doações não possuam valor igual a zero. 
Estabelecendo dessa forma um valor mínimo de 10 itens, que ao ser atingido irá impedir que o usuário remova algum item até aumentar a quantidade existente.
De modo que as vítimas fiquem sem o acesso a um item de necessidade.
*/
CREATE OR REPLACE FUNCTION verificar_capacidade_estoque()
RETURNS TRIGGER AS $$
DECLARE
    qtd_atual_estoque INT;
    capacidade_minima INT := 10; -- Definindo capacidade mínima como 10 itens da doação
BEGIN
    -- Contando a quantidade total de itens na doação, excluindo a quantidade do item que está sendo removido
    SELECT qtdEstoque
    INTO qtd_atual_estoque
    FROM doacao
    WHERE codDoacao = OLD.codDoacao;
    
    -- Verificando se a capacidade mínima será atingida após a exclusão
    IF qtd_atual_estoque - OLD.quantidade < capacidade_minima THEN
        RAISE EXCEPTION 'A doação com código % não pode ser removida porque a quantidade ficaria abaixo da capacidade mínima.', OLD.codDoacao;
    END IF;

    RETURN OLD; -- Permite a remoção caso a capacidade mínima não tenha sido atingida
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_verificar_capacidade_estoque
BEFORE DELETE ON doacao
FOR EACH ROW
EXECUTE FUNCTION verificar_capacidade_estoque();


