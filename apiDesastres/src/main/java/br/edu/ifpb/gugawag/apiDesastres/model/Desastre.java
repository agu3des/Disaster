package br.edu.ifpb.gugawag.apiDesastres.model;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "t_desastre")
public class Desastre {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String dataDeOcorrencia;
    private Integer duracaoDias;
    private Integer intensidadeEscala;
    private Integer qtdVitimas;
    private String tipo;

    @ElementCollection 
    private List<String> regiao;

    private String imagemUrl;

    public Long getId() {
        return id;
    }

    public String getDataDeOcorrencia() {
        return dataDeOcorrencia;
    }

    public void setDataDeOcorrencia(String data) {
        this.dataDeOcorrencia = data;
    }

    public Integer getDuracaoDias() {
        return duracaoDias;
    }

    public void setDuracaoDias(Integer duracaoDias) {
        this.duracaoDias = duracaoDias;
    }

    public Integer getIntensidadeEscala() {
        return intensidadeEscala;
    }

    public void setIntensidadeEscala(Integer intensidadeEscala) {
        this.intensidadeEscala = intensidadeEscala;
    }

    public Integer getQtdVitimas() {
        return qtdVitimas;
    }

    public void setQtdVitimas(Integer qtdVitimas) {
        this.qtdVitimas = qtdVitimas;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public List<String> getRegiao() {
        return regiao;
    }

    public void setRegiao(List<String> regiao) {
        this.regiao = regiao;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }

    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }
}
