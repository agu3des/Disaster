--view para conseguir visualizar dados básicos de uma doacao e um doador
create or replace view doacao_doador as
select  d.codDoacao,
        d.dataDoacao,
        dr.doadorCpf,
        dr.nome
from doacao d join doador dr on d.doadorCPF = dr.doadorCpf;
select * from doacao_doador;

--view os voluntarios que atuaram por meio de uma agencia em um desastre
create or replace view voluntario_desastre_agencia as 
select v.cpfVoluntario,
       v.nomeVoluntario,
       a.codDesastre,
       a.cnpjAgencia
from voluntario v 
    join voluntarioAgencia va
        on v.cpfVoluntario = va.cpfVoluntario
    join atuacao a
        on a.cnpjAgencia = va.cnpjAgencia;
select * from voluntario_desastre_agencia;


--function para contar quantos voluntarios participaram de um desastre
create or replace function contar_voluntario_desatre(codigo_desastre int)
returns int as $$
declare 
    count int :=0;
begin 
    select count(distinct v.cpfVoluntario)
    into count
    from voluntario v 
    join voluntarioAgencia va
        on v.cpfVoluntario = va.cpfVoluntario
    join atuacao a
        on a.cnpjAgencia = va.cnpjAgencia
    where a.codDesastre = codigo_desastre;

    return count;
end;
$$ LANGUAGE plpgsql;
select contar_voluntario_desatre(2);


--trigger para impedir a inserção de valores negativos no estoque 
create or replace function garantir_integridade_estoque()
returns trigger as $$
begin
    if new.qtdestoque < 0 then
        raise exception 'A doação com código % não pode ser inserida pois o valor de itens é inferior a zero!', new.codDoacao;
    end if;
    return new;
end;
$$ language plpgsql;
create trigger trg_garantir_integridade_estoque
    before insert or update on doacao
    for each row
    execute function garantir_integridade_estoque();
INSERT INTO Doacao (codDoacao, qtdEstoque, dataDoacao, localArmazenamento, codCateg, doadorCPF) VALUES
(6, -100, '2023-01-20', 'Depósito A', 1, '12345678901') --erro