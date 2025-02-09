export class Desastre {

    constructor(public id?: string,
                public dataDeOcorrencia?: string,
                public duracaoDias?: number,
                public intensidadeEscala?: number,
                public qtdVitimas?: number,
                public tipo?: string,
                public regiao?: string,
                public imagemUrl?: string
                ) {
    }
}