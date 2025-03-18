export class Desastre {


    id?: string;
    dataDeOcorrencia = '';
    duracaoDias?: number;
    intensidadeEscala?: number;
    qtdVitimas?: number;
    tipo = '';
    regiao = '';
    imagemUrl = '';


    constructor(id?: string, desastre: Desastre = {dataDeOcorrencia: '', tipo: '', regiao: '', imagemUrl: ''}) {
        this.id = id;
        this.dataDeOcorrencia = desastre.dataDeOcorrencia;
        this.duracaoDias = desastre.duracaoDias;
        this.intensidadeEscala = desastre.intensidadeEscala;
        this.qtdVitimas = desastre.qtdVitimas;
        this.tipo = desastre.tipo;
        this.regiao = desastre.regiao;
        this.imagemUrl = desastre.imagemUrl;
    }
        
}